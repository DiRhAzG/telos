import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";

let imgToFind;

export async function loadHealthBarImage() {
    // Health Bar Border
    imgToFind = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAYIAAAAaCAYAAAC6uFsTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFzSURBVHhe7d2/ahRBGADwbzfxiKKNkF6IxKitj6For/gKeYIIFjbBIgg+gnZikReQVL6BBguxErTIBS6Xf7czzsUNkWCtR+b3Y2d3mK+ZhZn9ll12pwmYIa+f3slN20bOObpJF3Pzc9F1KUpLdClHlFgJxuqbzzM7dl89uZ2b0t/0R39Pyjmrb7fNPwAAAAAAAAAAAAAAAP6p5uXju3k0OorxziTWt776wAWgAveXruaV5euxeG0Q7d74MH7+OIyd0V4fBuCi+3aU48P2MIb7KdqDSYphO4nvu+M+DMBFN0o5biwOInVd3wIAAAAAAAAAAAAAANTALyWYKc8ereS2X7M4pRTTlX5PB+lJvWmiLeX5+08zO3bXHt46W6C49LVskVO/hnE5i9JS9jlebH4x/wCA/88dCdXafbeQrwx+1y89ODAXqFbbH6E6p0lg6nhz4exxDlRGIqBKf7vwf9y4LBlQJYmAKk1f4J4v927KA9Qo4heAim/wafTYZAAAAABJRU5ErkJggg=='
    );
}

export function getHealth(img) {
    try {
        // Get starting pixel for Health image, to be used to grab the health
        let healthBarPosition = ImageReader.getPosition(img, imgToFind, 159, 2, 68, 14);

        if (healthBarPosition != undefined) {
            let buffer = img.toData(healthBarPosition.x, healthBarPosition.y, healthBarPosition.w, healthBarPosition.h);

            ImageReader.outputImage(buffer);
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