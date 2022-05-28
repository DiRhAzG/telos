import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";

let imgToFind;

export async function loadPhaseImage() {
    // Top left corner of Phase box
    imgToFind = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABXUExURcCOSbiGQ7uJRbaDQLyMSKdzKpxsIZpmG5VjG5tpHFw9EQgODVtHIBctKxksKhklIxAfHh00MiQ5NiM8OiMwLSM0MSIpJSItKRwwLiMhHSIlISMdGSQaFWpnjWYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABZSURBVBhXLYnbDoAgDMUOqAheUJAxx/z/7xQT+9ImBYwdjB2tNZicm31wzntMy/qDsO0xxqODM+WrUGWuuDNlJu6NRIWYWZr0/KZKUyQuUpvqIyjdTR5RfQEPTwaezFSClgAAAABJRU5ErkJggg=='
    );
}

export function getPhase(img) {
    try {
        // Get starting pixel for Phase image, to be used to grab the phase number
        let phasePosition = ImageReader.getPosition(img, imgToFind, 52, 11, 8, 8);

        if (phasePosition != undefined) {
            let buffer = img.toData(phasePosition.x, phasePosition.y, phasePosition.w, phasePosition.h);

            // ImageReader.outputImage(buffer);
            let phase = ImageReader.readNumbers(buffer, "");

            return Number(phase);
        }
        
        // throw 'Phase not found.'
    }
    catch (ex) {
        console.log(ex);
        return undefined;
    }

}