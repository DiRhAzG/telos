import { ImageDetect } from "@alt1/base";
import { ImageDataSet } from "@alt1/base/dist/imagedetect";

let imgPhaseEnrageNumbers;
let imgHealthNumbers;
let imgStreakNumbers;
let phaseEnrageNumbers = new ImageDataSet();
let healthNumbers = new ImageDataSet();
let streakNumbers = new ImageDataSet();

/* Load the images that will be used to search the screen */
export async function loadImages() {
    // The numbers used for Phase and Enrage. If Jagex changes the font, then this needs to be updated.
    imgPhaseEnrageNumbers = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAADwAAAAICAMAAACSyWz7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADnUExURcXCweLg4DMpJXx2c9PR0F5XU3x1c8bCwW1mY/Hw75mUkn92dMbBwf///6ejoayrq1BIRImEgtDPz0lIR5ybm2xqal5WU97e3kZBPoqEgqqko769vUtJSPDw752cm8C/vn58e9LQ0Dc1NUE4NLaysVNOTb++vWZhX6Ogn8TBwO/v7zItLExFQU1KScLAv317e8PAwM3NzbSxsPDv73p0cjMoJVtUUXFubc7NzVlTUO7u7oiDgVpYWM7OzW1rat3d3YN/fnt6ecC+vr28vFBHROHg32hiYJSRj8TAwEpDQUU/Pd7d3QAAAKageGkAAABNdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////8A02oRgAAAAAlwSFlzAAAOwgAADsIBFShKgAAAASBJREFUKFNdUGlXwkAQG3QErLTgBVbAqxWtByqKIIpHxTv///eYFD+Z9ya7OzvJy67BrAQsLPoSUK64ia0KwXhYNgvYclvhsVYLAdc8ucKBiLs6Gqtr6wA1G5toAq0tduPtNu/lUi2Y6LTR5VKH9DsobOiHXYqJeE+8fwAk6WHvT5yKhOiokB0jI5/AJNSEdUiMc4oktliNs/M+ue1VhBeXzjxIpLwa0Ouam/C/OLoBhrejMSPEuKOYmBTJWqz4HggGD9NH4CkLKNYbVIU4KpOI5xd089zlD0bUvQy0OmvCAnKY3qOSOFBcIR2JO68YArMS9KlMV9b6xpqbvrM37dOsYd3xB8I8txk887lJ8xMzN/8Cerle5t/q/mTcR5wBfgEWnmQmvRstLAAAAABJRU5ErkJggg=='
    );
    
    // Split the numbers into a dataset with each individual number
    phaseEnrageNumbers = ImageDataSet.fromFilmStrip(imgPhaseEnrageNumbers, 6);

    // The numbers used for Health.
    imgHealthNumbers = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAFoAAAAMCAMAAADVoVraAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACcUExURe3ast/MqNC/nt/NqHBnVe7asr6uj6+hhK+ihZ+TeM69m5CEbN7Mp8++nN/NqYB2YJ6Sd8+/nVBLPb6vj+vXsM69nO3ZsezYsc27moB1YHJpV5+Sd828ms68m8y7mUA7MM+9nH90X8++nY+Da62fgjAsJEI9Ml9YSH5zXsy8mtvJpa6ggzIuJqCTdz86L9DAnn92YHBnVtC/nQAAADUbNEgAAAA0dFJOU////////////////////////////////////////////////////////////////////wBLVyJlAAAACXBIWXMAAA7CAAAOwgEVKEqAAAABOUlEQVQ4T42TB1PDMAyFzRAjtGXUJMxSNqVAAf3//4bGi+KS3MF3Fz156Fn2tYkLusEG9D9syje0P/EW8zY8yUVmeAd5cVzHLlTZ2xeqg2Kjlo/GMuEWZXQibxOS3QUTqKFL0bgV0GFYH1m03AlHKB9XGnvTAZ24TqwFmoa11WXLnV7t+NSE+qa+d9QumIphqn241pKCYxoX5Qyq5vn8AqOOqvGafCmhFmu3oyuLlq/TdXkN5XrG9Y3oHEtx2VvPpndSdh9dP2gsHySgGZIRlHNmetTE7wrsHHlih544Nc+WvVjU8Jt6IUE8cg6jBZN2zflVI97MfyHeqZHyUqV50zhoXbw2kHK5r0DvGnFXK260D5CG/f6kqMLZdlr+8IEi/6H2eQqq1UplboPgU76Y6p75C7r8RmIw/wDV2r7vDkndRgAAAABJRU5ErkJggg=='
    );
    
    // Split the numbers into a dataset with each individual number
    healthNumbers = ImageDataSet.fromFilmStrip(imgHealthNumbers, 9);

    // The numbers used for Streak.
    imgStreakNumbers = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAG4AAAANCAMAAAB/5as9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURf///wAAAFXC034AAAACdFJOU/8A5bcwSgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAPtJREFUOE99UwsOw1AI6rv/pSfgB1+bsUQQ0W5N9pzzBI7QgqYaqhlUaLmlyYCbLp/4kFhtv4qw5DWLJrmgRKvsVZbBpjGdq1lO7KXABLKiUNcPUr02++bYYdHt0ZKCBVY2yKRRojpzQ64TAZOCelbNMhD073E9m4MQ7MLrF2MaGDuKJCuoYpuIdUGadXwpr0CKoP4SYD1+hkaBWSfUsdqEMttycyyqLJ4F3f2i8QvsYykhM13T4C8CEKjVa9oHC2bc8rpQvAiArL/5NfWTVgk9Q/JVO6gLfgfSX6nek0smWiVeLrgCE4TyjhJlooRJDYoTH+5oS/Z+z8/5Aae0BB5ynSvRAAAAAElFTkSuQmCC'
    );
    
    // Split the numbers into a dataset with each individual number
    streakNumbers = ImageDataSet.fromFilmStrip(imgStreakNumbers, 11);
}

/*
    Find the position on the screen with the provided image, and returns object with the starting pixel.
    The x and y here are to shift the starting pixel. The w and h are used to determine the area from
    the starting pixel that will be grabbed.
*/
export function getPosition(img, imgToFind, xOffset, yOffset, w, h) {

    let foundImage = ImageDetect.findSubimage(img, imgToFind);

    if (foundImage.length > 0) {
        return {
            x: foundImage[0].x + xOffset, // The first possible start position of the first digit
            y: foundImage[0].y + yOffset,
            w: w,
            h: h
        }
    }

};

/* Write the image to console, for debugging purposes */
export function outputImage(buffer) {
    // create off-screen canvas element
    let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = buffer.width;
    canvas.height = buffer.height;

    // create imageData object
    let idata = ctx.createImageData(buffer.width, buffer.height);

    // set our buffer as source
    idata.data.set(buffer.data);

    // update canvas with new data
    ctx.putImageData(idata, 0, 0);
    let dataUri = canvas.toDataURL(); // produces a PNG file

    console.log(dataUri);
    // console.log(buffer.data.toString());
}

/* Read the numbers in an image */
export function readNumbers(buffer, type = "") {
    let str = "";
    let numberMatch = [];
    let numbersList;
    let foundPixel = false;

    if (type == "") {
        numbersList = phaseEnrageNumbers;
    } else if (type == "Health") {
        numbersList = healthNumbers;
    } else if (type == "Streak") {
        numbersList = streakNumbers;
    }

    // Loop through each number in our list
    for (let a = 0; a < numbersList.buffers.length; a++) {

        // Load the current number's buffer
        let numBuffer = numbersList.buffers[a];
        let match = false;
        // outputImage(numBuffer);

        for (let nbh = 0; nbh < numBuffer.height; nbh++) {

            // Loop through the current number's width, which will be the row of the pixel
            for (let nbw = 0; nbw < numBuffer.width; nbw++) {

                // The current pixel we're looking at will be "4 * w + 4 * numBuffer.width * h". This is because each pixel consists of 4 digits (rgba values).
                // "4 * numBuffer.width" will give you the total number of digits used for pixels on each column. Multiplying it by h will give you how many rows
                // have already been checked. Adding "4 * w" will give you the current column on the current row. We are testing from top to bottom, then left to right.
                // console.log(numBuffer.data[4 * w + 4 * numBuffer.width * h]);

                let i = 4 * nbw + 4 * numBuffer.width * nbh;

                // Find first non-transparent pixel for this number
                if (numBuffer.data[i + 3] == 0) continue;

                foundPixel = true;

                for (let bh = 0; bh < buffer.height; bh++) {
                    for (let bw = 0; bw < buffer.width; bw++) {
                        let bi = 4 * bw + 4 * buffer.width * bh;
                        
                        // We found the first non-transparent pixel for the number. Now find the first match for that pixel in the image
                        if (checkPixelMatch(buffer, numBuffer, bi, i)) {
                            // console.log(bi + ' ' + i);
                            // console.log(bw + ' ' + nbw);
                            // console.log(bh + ' ' + nbh);

                            // Found a match for the first pixel. Now determine if the rest also match
                            match = checkMatch(buffer, numBuffer, bw, bh, nbw, nbh)
                            
                            // Not a match, so continue to the next match attempt
                            if (!match) continue;

                            // All pixels in number match, so add it to our number array
                            numberMatch.push({ position: bw, num: a });
                        }
                    }
                    
                    if (match) break;
                }

                break;
            }

            // If we already found all matches for the number, or we found the first non-transparent pixel and there were no matches,
            // then this number doesn't exist in the image.
            if (match || foundPixel) break;
        }
        
        foundPixel = false;
        match = false;
    }

    if (numberMatch.length > 0) {
        numberMatch.sort((a, b) => a.position - b.position);
        
        // All number images must be in this format, 0123456789
        numberMatch.forEach(match => {
            str += "0123456789"[match.num];
        })
    }

    return str;
}

/* Check if two pixels match, within reasonable bounds */
export function checkPixelMatch(buffer, numBuffer, bi, i) {
    let variance = 15;

    if (
        buffer.data[bi] > numBuffer.data[i] - variance && buffer.data[bi] < numBuffer.data[i] + variance
        && buffer.data[bi + 1] > numBuffer.data[i + 1] - variance && buffer.data[bi + 1] < numBuffer.data[i + 1] + variance
        && buffer.data[bi + 2] > numBuffer.data[i + 2] - variance && buffer.data[bi + 2] < numBuffer.data[i + 2] + variance
    ) {
        return true;
    }
    else {
        return false;
    }
}

/* Check if there's a match between all pixels on a Number */
function checkMatch(buffer, numBuffer, bw, bh, nbw, nbh) {

    let w = bw - nbw;
    let dw = nbw;

    // We already know the row the first non-transparent pixel is, so start there
    for (let h = nbh; h < numBuffer.height; h++) {

        // We know the width of the first non-transparent pixel, so start there, but reset to 0 for the next pixel
        for (dw; dw < numBuffer.width; dw++) {
            let i = 4 * dw + 4 * numBuffer.width * h;
            let bi = 4 * bw + 4 * buffer.width * bh; // Start with the row where a match was found

            // Ignore transparent pixels
            if (numBuffer.data[i + 3] == 0) {
                bw++;
                
                continue;
            }

            // Pixel matched
            if (checkPixelMatch(buffer, numBuffer, bi, i)) {
                
                // Check next pixel
                bw++;
            }
            else {
                // console.log(`${buffer.data[bi]}, ${buffer.data[bi + 1]}, ${buffer.data[bi + 2]}`);
                // console.log(`${numBuffer.data[i]}, ${numBuffer.data[i + 1]}, ${numBuffer.data[i + 2]}`);

                // showPixel(buffer, bi);
                // showPixel(numBuffer, i);

                return false;
            }
        }
        
        dw = 0;
        bh++;
        bw = w;
    }

    return true;
}

/* Show the pixel being compared on the actual image, for easier debugging */
function showPixel(buffer, i) {
    let newBuffer = structuredClone(buffer);

    newBuffer.data[i] = 255;
    newBuffer.data[i + 1] = 0;
    newBuffer.data[i + 2] = 0;
    newBuffer.data[i + 3] = 255;

    outputImage(newBuffer);
}