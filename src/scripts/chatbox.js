import { mixColor } from "@alt1/base";
import ChatBoxReader from "@alt1/chatbox";

let oldLines = [];

const createNewReader = () => {
    const reader = new ChatBoxReader()

    reader.readargs = {
        colors: [
            mixColor(132,212,119), // Telos name green
            mixColor(195,16,16), // Tendril damage red
            mixColor(45, 186, 21), // Completion time green
            mixColor(45, 184, 20), // Completion time green
            mixColor(44, 179, 21), // Completion time green
            mixColor(159, 255, 159), // Clan chat green
            mixColor(255, 82, 86),
            mixColor(225, 35, 35),
            mixColor(153, 255, 153),
            mixColor(155, 48, 255),
            mixColor(255, 0, 255), //
            mixColor(0, 255, 255), //
            mixColor(255, 0, 0), // Red
            mixColor(255, 255, 255), // White
            mixColor(127, 169, 255) // Clock blue
        ]
    }

    return reader
}

const reader = createNewReader();

export function findChatBox (img) {
    let found = reader.find(img);

    if (found != null) {
        console.log("Found chatbox.");
        return true;
    }
    else {
        return false;
    }
};

export function readChatBox (img) {
    let lines = reader.read(img);
    let newLines = [];

    lines?.forEach(line => {
        if (oldLines.indexOf(line.text) == -1) {
            oldLines.push(line.text);
            newLines.push(line.text);
        }
    });

    if (oldLines.length > 30) {
        oldLines.splice(0, oldLines.length - 30);
    }

    return newLines;
}
