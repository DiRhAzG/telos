import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";

let imgToFind;

export async function loadEnrageImage() {
    // Top left corner of Enrage box
    imgToFind = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAMAAAC38k/IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABIUExURcGPS7aDQbmGQryMSLuJRaVyKZVjGpppHZxtIZRdHGA5GToVIUAXJTUVHnZFJUodK0IbJTsbIlEdLjIbHUUcKCsbGSQZFSgYFvLUyvYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABdSURBVBhXHYlRFsQgCAOjbqVd2woieP+bLuu8fGQSIKWcc8klfQqOSlQrnfU6Cce33e3P0x7Q2wOWLszgMbYos4D77FMkTLdMUdOIgeOO5haEiIq6reULEvs+3O0HXnQG3Uv9iPYAAAAASUVORK5CYII='
    );
}

export function getEnrage(img) {
    try {
        // Get starting pixel for Enrage image, to be used to grab the enrage
        let enragePosition = ImageReader.getPosition(img, imgToFind, 41, 11, 36, 8);

        if (enragePosition != undefined) {
            let buffer = img.toData(enragePosition.x, enragePosition.y, enragePosition.w, enragePosition.h);

            // ImageReader.outputImage(buffer);
            let enrage = ImageReader.readNumbers(buffer, "");
    
            return Number(enrage);
        }
        
        // throw 'Enrage not found.'
    }
    catch (ex) {
        console.log(ex);
        return undefined;
    }

}