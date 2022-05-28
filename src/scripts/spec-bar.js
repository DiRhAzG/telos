import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";

let imgToFind;
let specBarWidth = 160;

export async function loadSpecBarImage() {
    // Special Attack Bar Border
    imgToFind = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAKgAAAALCAYAAADrw8b0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKXSURBVFhH7Vkxi9VAEJ4ku9m8e4eC1RVicyByiiAi14i9WJ6dHlY2Klief8HOUrjqSv/GlZaCYiNYW3ndJbvZON/sbi45sFNeiv14j0xm55t5O7tsePkKijh69cw8KL+dD30fPQFaV2Rt8BVVRRiHD4A/jbeupyvrLfG3bUvGmNFO8N6zX9MwEPWcp+J84Dr2b2+t2D/wvaW6rsXuui4yp9yBuQNzC+qY63ls3TQyjpxaa7GRB0A8vuB6H+yiCNyiLGllauHBr5QS2zk3cutaiY2aCR2Pq0qRqfUYCy5s8IE510tN+FC3Zp6O8fCjD3/jOudlrqjfcY8b/r1K+maFV/IcYGPOQOoT4DgeMcjbct0197jE3Lmv6JP0gW3UA6bc/7G2qIW4imtP9xl8mAfyVmZFT96fjvtyxMnLuxcrkJGxQUz3Yhmv9PnnWbQyMjaLL7/mT3H69OZ+Pj0zFoXjF7dlT8oJevrjNy4ZGYvB97QlT94+yqdnxuKwf+fG8OFwL+zN14938ybNWBTeHYQ/SvKI378eXiFkZCwFe9cunZn5FM1YCo6e3hv34via6eGtnWhlZGwWN68G8QOYvbH/eLg7bDdNvCNRLaZv/KEoGBVUJKhKCb21ZP3FATyNAT/xoBRAfRi5wyAKiotc/Jh6wvXMs8w3Wom61HadqD8AlIneMjeqIFBIdMVjfIVCAjWj57zgQjWZcb0XlaWP3Irj1YSLMeSHUiTqTlHyJ7TK873jb5puxX6FvBwDuD4013BNcKUm5wQuc8EDHzGoh7qonxSqGZfvbe8pUmWumHPiWuYil+E+QVmarQ96POHWPIa0aX2gUGm2Da831J4Z9x+vLeKgxJ23nfCgIqX82G/wPz/+GiZNRH8AiBfBXcKGUQ0AAAAASUVORK5CYII='
    );
}

export function getSpecPercent(img) {
    try {
        // Get starting pixel for Spec Bar image, to be used to grab the spec percent
        let specBarPosition = ImageReader.getPosition(img, imgToFind, 4, 2, specBarWidth, 1);

        if (specBarPosition != undefined) {
            let buffer = img.toData(specBarPosition.x, specBarPosition.y, specBarPosition.w, specBarPosition.h);

            // ImageReader.outputImage(buffer);
            let specPercent = calculateSpecPercent(buffer);

            return Number(specPercent);
        }
        
        // throw 'Special Attack Bar not found.'
    }
    catch (ex) {
        console.log(ex);
        return undefined;
    }

}

function calculateSpecPercent(buffer) {

    let specPercent = 0;
    let emptyPixel = { data: [13, 18, 18] } // This is the color of an uncharged spec bar

    for (let x = 0; x < buffer.width; x++) {
        let dx = 4 * x;

        if (ImageReader.checkPixelMatch(buffer, emptyPixel, dx, 0)) {
            specPercent = (x / specBarWidth) * 100;

            break;
        } else if (x == specBarWidth - 1) {
            specPercent = 100;
        }
    }

    return Math.round(specPercent);
}