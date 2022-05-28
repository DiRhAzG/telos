import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";

let imgToFind;

export async function loadHealthBarImage() {
    // Health Bar Border
    imgToFind = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAYIAAAADCAYAAACeYQhAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABzSURBVFhH7ck9CoMwAAbQzwxOdhHcBUEKvUpv4I3EQ4m3cBInQQdTiGkT8tPFU4TvrS8buldUykKfDv20ZCAiouS9myI+2xLVI4e4tMGxG5zqupuIiFK32ohxlpDfAPFzAVI4bB99NxERpU6FiLrKEbzHH9JKKqz67upwAAAAAElFTkSuQmCC'
    );
}

export function getHealth(img) {
    try {
        // Get starting pixel for Health image, to be used to grab the health
        let healthBarPosition = ImageReader.getPosition(img, imgToFind, 159, -7, 68, 14);

        if (healthBarPosition != undefined) {
            let buffer = img.toData(healthBarPosition.x, healthBarPosition.y, healthBarPosition.w, healthBarPosition.h);

            // ImageReader.outputImage(buffer);
            let health = ImageReader.readNumbers(buffer, "Health");

            return Number(health);
        }
        
        // throw 'Health Bar not found.'
    }
    catch (ex) {
        console.log(ex);
        return undefined;
    }

}