import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";

let imgToFind;

export async function loadStreakImage() {
    // Streak text
    imgToFind = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAEQAAAAJCAMAAAC8C3oyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADVUExURY2tuyA3QQofKUFaZoWks67Q4HeVo1dyfkxmcmyJl5i4yBkhJQkbJAIGCAcVGwAAAAIICi43PAMKDhccHpe0wgURFqLC0QYTGQQMEDZOWhgfIio/Sj1NVQcXHpi4xwEEBQ0QEkphbDNLVzRKVBUrNZe2xHaSnitCTgkdJmB4g11weQcXH0ZTWnSLlTtITmF7hyk+R4KhrwUOE4yquDE/RhAbIYCZpAgZITpFS6PD0qPE1A0SFGyHlIWksoKcqKPE0wECA42suneUoUZUW0pibQMICwMICuHnWwcAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE8SURBVChTXVHZVsJADB0CobS0RPZFEcWliLihouICbvz/J3mTDnJO+5BJcpdmMs4ViFyRSlwiTVFYJMdcJrYv0IIr1uNQQS2MCKVmUTUOwqRGLHtI0cliWEmk3iBptkSkHVVFOl1AKHpEfeauEU2pJoP9qA2AhaKBmVgsH4A2JCocjnzPHXkI4HGnqU1TjnnsIuYT5eVMTs/OU+X/m6ScTLYm3LiYxrRVXgommV3hj3kTmlzzDQ5vgmXcgoADVXAnKc9BzJR2nfj+AUnehKjWetxNIov6kx4imSU/K9GUmUn6AsOcSRGrX75OdtcpgJRB6XIkMlvUvFJ34gC8TemdP+wF2cf+Co+6hsmnmijp69ugiMKfNVr865W6E0rg3pvTRjaUYFrxcbgWwQNRnCAYqdE1aEQ97ROImZLoD1BUH3jNlIZWAAAAAElFTkSuQmCC'
    );
}

export function getStreak(img) {
    try {
        // Get starting pixel for Streak image, to be used to grab the Streak
        let streakPosition = ImageReader.getPosition(img, imgToFind, 0, 16, 68, 14);

        if (streakPosition != undefined) {
            let buffer = img.toData(streakPosition.x, streakPosition.y, streakPosition.w, streakPosition.h);

            // ImageReader.outputImage(buffer);
            let streak = ImageReader.readNumbers(buffer, "Streak");

            return Number(streak);
        }
        
        // throw 'Streak not found.'
    }
    catch (ex) {
        console.log(ex);
        return undefined;
    }

}