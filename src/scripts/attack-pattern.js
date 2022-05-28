import { ImageDetect } from "@alt1/base";
import { reset } from './script';
import structuredClone from '@ungap/structured-clone';

let phase1 = [
    { id: 0, name: "Tendrils", chat: "Telos: Your anima will return to the source!", test: "p1t" },
    { id: 1, name: "Uppercut", chat: "Telos: Gielinor, give me strength!", test: "p1uc" },
    { id: 2, name: "Hold Still", chat: "Telos: Hold still, invader.", test: "p1hs" }
]

let phase2All = [
    { id: 0, name: "Tendrils", chat: "Telos: Your anima will return to the source!", prev: [ "Hold Still" ], test: "p2t" },
    { id: 1, name: "Magic Onslaught", chat: "Shit game doesn't have chat for this.", prev: [ "Tendrils" ], test: "p2mo" },
    { id: 2, name: "Hold Still", chat: "Telos: Hold still, invader.", prev: [ "Uppercut" ], test: "p2hs" },
    { id: 3, name: "Virus", chat: "Shit game doesn't have chat for this.", prev: [], test: "p2v" },
    { id: 4, name: "Uppercut", chat: "Telos: Gielinor, give me strength!", prev: [], test: "p2uc" }
]

let phase2;

let phase3All = [
    { id: 0, name: "Uppercut", chat: "Telos: Gielinor, give me strength!", prev: [ "Hold Still", "Virus", "Uppercut" ], test: "p3uc" },
    { id: 1, name: "Hold Still", chat: "Telos: Hold still, invader.", prev: [ "Tendrils" ], test: "p3hs" },
    { id: 2, name: "Virus", chat: "Shit game doesn't have chat for this.", prev: [ "Magic Onslaught" ], test: "p3v" }
]

let phase3;

let phase4 = [
    { id: 0, name: "Uppercut", chat: "Telos: Gielinor, give me strength!", prev: [ "Uppercut" ], test: "p4uc" },
    { id: 1, name: "Anima", chat: "Telos: Let the anima consume you!", prev: [ "Hold Still" ], test: "p4a" },
    { id: 2, name: "Hold Still", chat: "Telos: Hold still, invader.", prev: [ "Virus" ], test: "p4hs" }
]

let phase5 = [
    { id: 0, name: "Minions", chat: "Kill the anima-golems at the correct font to charge it!", prev: [ "Uppercut", "Anima", "Hold Still" ], test: "p5m" },
    { id: 1, name: "Virus", chat: "Shit game doesn't have chat for this.", prev: [], test: "p5v" },
    { id: 2, name: "Instant Kill", chat: "Telos is charging a", prev: [], test: "p5ik" }
]

let phasedAttack = "N/A";
let currentAttack = "N/A";
let nextAttack = "Tendrils";
let smpNextAttack = "N/A";
let prevSpecPercent = 100;
let prevPhase = 1;
let imgBlackVirus;
let imgRedVirus;
let imgGreenVirus;

let oldLines = [];

export async function resetAttacks() {
    phasedAttack = "N/A";
    currentAttack = "N/A";
    nextAttack = "Tendrils";
    smpNextAttack = "N/A";
    prevSpecPercent = 100;
    prevPhase = 1;
}

export async function loadVirusImages() {
    // Black Virus debuff image
    imgBlackVirus = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAABsAAAAQCAMAAADQzfSkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABvUExURcwAABQXHxYaLRgjLhktPRUtMAsrKQcZMxk/QDM+NkxCNxhAMSY9S2heN6iVfsW5oa6whWRkXNfRwt3kyvDo14t1YPbs6d7Vq4yLhK6yn7zRvS8uMA8ODO7rxTAiLyMlLwAAAUhXW2NwbuW4oDhARLd+NTUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADmSURBVChTfdBrV4MwDAbglZBZiDYrvYxaJkz9/7/RpN3x8sUcygk8vCVw+reMGWDUQkTQpT0Mxoj9CJ7Pem6XMDyptd6K4DRPJNxuwNDteURCfHHMfPHyTFM12dJKanK8aLGbOkK30ZJSiDGGsFymHnwYYlLKUnG5pjaQ5uR90jeLMUvw6n7vKebWEkRlseP+JWI6CmHyrznInDEv/k9OsK5LCaEda0X6NiEJ1q2WW3nbqoxC9mE47kSz38yRcjrM4e9E1vY5BwCExPvm+Z39Buw01/+ZFMD8wSX6w8fCt5nsp93h9AWRkg/Ns1rCAQAAAABJRU5ErkJggg=='
    );

    // Red Virus debuff image
    imgRedVirus = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAABsAAAAQCAMAAADQzfSkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABgUExURcwAACwCEj8HJU4IJ2ALKm8MLoMOKJwIKbQIJoITOn8tQWheN66whcW5ob3UoZByNN7Vq93kyu7rxYt1YPDo146IWKiVfndHO4tbXbGTV9UZIkEWKA8CECwLJ/bs6W0hLwRhClMAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADjSURBVChTfZHbdoQgDEVHrtGBaQC1VGn7/3/ZkzjtmqeeJ1mbncRw+zeTMdY558Mz3ntnrTETmLFWQYwUiSjGCO4AhTkPBEJxXmbFYRYIZp1IROGe8uOR3vSS1FXm5XJIzAXhFCCGcDFUVFSq5oIQwdAOXZqgFamFt2scZTLJphqQiJj4j+E77bleRfOeIz09QUTbO6+Vmeta+osno5D/KLnUBK3uXn7R+1/voHaOM3H+HOeG02u/Y7kPM9pXG2Zqy6EimGwzxpan0XPnPibeZW/q4RHQ8Zs51z56xQ4W3am7/QDHLA9TNky/BQAAAABJRU5ErkJggg=='
    );

    // Green Virus debuff image
    imgGreenVirus = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAABsAAAAQCAMAAADQzfSkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABdUExURcwAABItBhZBCCVGCzBWDkBlCjBoDkp2DEtgN2dxOqiVfq6yn8W5oWRkXFmEDNfRwt3kyvDo14t1YPbs6Y6IWIyLhLzRvTRKCjM+NmheNygkDwAAAR1eDu7rxa6whZQcnpQAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADkSURBVChTfdDRcoQgDAXQRUJACAKi7Vbb/v9n7g3Otvu0GWdUDjcYb2/LTJZQzjkmYtxQRHYyMJBzXleYnwa1E0zJea8SQkDUj51kYQTAK9Mck0jMmsWCu8z5xXOIUrQkBkUEnznvQLW1VmtJgTV3GXbxqtR7b63IhjP9X45pWGtdg5G0kRoPi7vUUgFVYhrGsHEcr/NHryLSeslRWw1Dbzx9biXVqlfZdYYX85TvxqaSrLlv18T/Fr7Mca59Ow+TZ7csmBhGjKIViZyyZHPIzvoz9Du/1TiIpJbP/PMrJXjN8e0BhOoNbYHRmMcAAAAASUVORK5CYII='
    );
}

export function setAttacks(enrage) {
    // No virus on P2/P3 if enrage is less than 50
    if (enrage < 50) {
        phase2 = structuredClone(phase2All.filter(a => a.name != "Virus"));
        phase3 = structuredClone(phase3All.filter(a => a.name != "Virus"));

        // Magic Onslaught leads to Uppercut if under 50 enrage
        phase3[0].prev.push("Magic Onslaught");
    } else {
        phase2 = structuredClone(phase2All);
        phase3 = structuredClone(phase3All);
    }
}

export function determineNextAttack(z, chatLines, img) {
    let lines = filterLines(chatLines);

    // Phase changed. Check phase change attacks.
    if (prevPhase != z.currentPhase) {
        if (checkPhaseAttacks(z.currentPhase, z.phaseHealth)) {
            prevPhase = z.currentPhase;
            return { currentAttack, nextAttack };
        };
    }

    if (!checkSpecialAttacks(z.currentPhase, z.currentSpecPercent, img)) {
        if (lines?.length > 0) {
            for (let l = 0; l < lines.length; l++) {
                let line = lines[l];
                
                if (line != "") {
                    if (line.includes("session against: Telos")) {
                        reset();
                    } else if (line.includes("SO. MUCH. POWER!") || line.toLowerCase().includes("zhi: smp")) {
                        handleSmp();
                    } else {
                        checkChatAttacks(z.currentPhase, line);
                    }
            
                    console.log(line + " - " + currentAttack);
                }

            }
        }
    }

    prevSpecPercent = z.currentSpecPercent;
    prevPhase = z.currentPhase;

    if (phasedAttack != currentAttack && currentAttack != "So Much Power") {
        phasedAttack = currentAttack;
    }

    return { currentAttack, nextAttack };
}

/* Only separated so that it can be used during debug */
export function handleSmp() {
    currentAttack = "So Much Power";
    nextAttack = smpNextAttack;
}

/* Check the attacks that aren't based on chat */
function checkSpecialAttacks(phase, specPercent, img) {
    if ((phase == 1 || phase == 4) && specPercent == 100 && nextAttack != "So Much Power") {
        smpNextAttack = nextAttack;
        nextAttack = "So Much Power";
        
        return true;
    } else if (nextAttack == "So Much Power" && specPercent != 100) {
        nextAttack = smpNextAttack;
        smpNextAttack = "N/A";

        return true;
    } else if (phase == 2) {
        if (nextAttack == "Magic Onslaught" && specPercent < prevSpecPercent) {
            // If next attack is Magic Onslaught and spec percent is going down, assume that Magic Onslaught has begun
            currentAttack = "Magic Onslaught";
            nextAttack = "Hold Still";

            return true;
        } else if (nextAttack == "Virus") {
            // Try to find Virus debuff image
            let blackVirus = ImageDetect.findSubimage(img, imgBlackVirus);
            
            // If Virus debuff is found, then Virus has begun
            if (blackVirus.length > 0) {
                currentAttack = "Virus";
                nextAttack = "Uppercut";

                return true;
            }
        }
    } else if (phase == 3) {
        if (nextAttack == "Virus") {
            // Try to find Virus debuff image
            let redVirus = ImageDetect.findSubimage(img, imgRedVirus);
            
            // If Virus debuff is found, then Virus has begun
            if (redVirus.length > 0) {
                currentAttack = "Virus";
                nextAttack = "Uppercut";

                return true;
            }
        }
    } else if (phase == 5) {
        if (nextAttack == "Virus") {
            // Try to find Virus debuff image
            let greenVirus = ImageDetect.findSubimage(img, imgGreenVirus);
            let redVirus = ImageDetect.findSubimage(img, imgRedVirus);
            let blackVirus = ImageDetect.findSubimage(img, imgBlackVirus);
            
            // If Virus debuff is found, then Virus has begun
            if (greenVirus.length > 0 || redVirus.length > 0 || blackVirus.length > 0) {
                currentAttack = "Virus";
                nextAttack = "Instant Kill";

                return true;
            }
        }
    }

    return false;
}

/* Determine current/next attack based on Telos chat */
function checkChatAttacks(phase, line) {
    let foundAttack;
    let phaseAttacks;

    switch (phase) {
        case 1:
            phaseAttacks = phase1;
            break;
        case 2:
            phaseAttacks = phase2;
            break;
        case 3:
            phaseAttacks = phase3;
            break;
        case 4:
            phaseAttacks = phase4;
            break; 
        default:
            break;
    }

    foundAttack = phaseAttacks.find(a => line.includes(a.chat));

    if (line.includes("Zhi")) {
        foundAttack = phaseAttacks.find(a => line.toLowerCase().includes(a.test));
    }

    if (foundAttack) {
        let foundIndex = phaseAttacks.indexOf(foundAttack);
        currentAttack = foundAttack.name;

        nextAttack = phaseAttacks[(foundIndex + 1) % phaseAttacks.length].name;
    }
}

/* Determine the next attack on phase switch */
function checkPhaseAttacks(phase) {
    let foundAttack;
    let phaseAttacks;

    switch (phase) {
        case 2:
            phaseAttacks = phase2;
            break;
        case 3:
            phaseAttacks = phase3;
            break;
        case 4:
            phaseAttacks = phase4;
            break; 
        default:
            return false;
    }

    foundAttack = phaseAttacks.find(a => a.prev.includes(phasedAttack));

    if (foundAttack) {
        nextAttack = foundAttack.name;
    }

    prevSpecPercent = 0;

    return true;
}

function filterLines(lines) {
    let newLines = [];

    lines?.forEach(line => {
        if (oldLines.indexOf(line) == -1) {
            oldLines.push(line);
            newLines.push(line);
        }
    });

    if (oldLines.length > 30) {
        oldLines.splice(0, oldLines.length - 30);
    }

    return newLines;
}