import * as a1lib from "@alt1/base";
import * as ChatBox from "./chatbox.js";
import * as ImageReader from "./image-reader.js";
import * as Interface from "./interface.js";
import * as atk from "./attack-pattern";
import { loadPhaseImage, getPhase } from "./phase.js";
import { loadEnrageImage, getEnrage } from "./enrage.js";
import { loadSpecBarImage, getSpecPercent } from "./spec-bar";
import { loadHealthBarImage, getHealth } from "./health-bar";

let z = {
    currentPhase: 1,
    currentEnrage: -1,
    currentSpecPercent: 0,
    currentHealth: 0,
    startingHealth: 0,
    phaseHealth: [],
    p4Health: [],
    warning: ""
}

let foundChat = false;
let element;
let chatLines;
let attack = { currentAttack: 'N/A', nextAttack: 'Tendrils' };

let attackImages = [
    { name: "Tendrils", image: "./src/images/tsunami.png" },
    { name: "Uppercut", image: "./src/images/surge.png" },
    { name: "Hold Still", image: "./src/images/freedom_anticipate.png" },
    { name: "Magic Onslaught", image: "./src/images/deflect_magic.png" },
    { name: "Black Virus", image: "./src/images/black_stream.png" },
    { name: "Green Virus", image: "./src/images/green_stream.png" },
    { name: "Red Virus", image: "./src/images/red_stream.png" },
    { name: "Virus", image: "./src/images/blue_stream.png" },
    { name: "Anima", image: "./src/images/debilitate.png" },
    { name: "Minions", image: "./src/images/minions.png" },
    { name: "Instant Kill", image: "./src/images/immortality.png" },
    { name: "So Much Power", image: "./src/images/smp.png" }
]

/* Main function to run everything else */
export async function start(img, e) {
    try {
        reset();
        element = e;
        await loadImages();
        
        // Main timer that will repeatedly call the functions
        setInterval(() => {
            img = a1lib.captureHoldFullRs();

            if (!foundChat) {
                findChatBox(img);
            } else {
                readChatBox(img);
            }

            checkPhase(img);
            
            if (z.currentEnrage < 0) {
                checkEnrage(img);
            }

            checkSpecPercent(img);
            checkHealth(img);

            getNextAttack(img);
            updateInterface();
        }, 200)
    } catch (ex) {
        console.log(ex);
    }
};

export function updateInterface() {
    element.phase.innerHTML = z.currentPhase.toString();
    element.enrage.innerHTML = z.currentEnrage.toString() + '%';
    element.special.innerHTML = z.currentSpecPercent.toString() + '%';

    if (z.phaseHealth.length > 0) {
        if (z.currentPhase == 4 && z.p4Health.length > 0) {
            let nextFont = Math.max(...z.p4Health.filter(h => h < z.currentHealth || h == 0));
            element.health.innerHTML = numberWithCommas(nextFont);
        } else {
            if (z.phaseHealth[z.currentPhase]) {
                element.health.innerHTML = numberWithCommas(z.phaseHealth[z.currentPhase]);
            } else {
                console.log(z.phaseHealth);
                console.log(z.currentPhase);
            }
        }
    }

    element.currentAttack.innerHTML = attack.currentAttack;
    element.nextAttack.innerHTML = attack.nextAttack;

    let suggestionImg = attackImages.find(i => i.name == attack.nextAttack).image;

    if (suggestionImg) {
        element.suggestion.src = suggestionImg;
    } else {
        element.suggestion.src = "./src/images/telos.png";
    }

    if (z.currentPhase == 4) {
        element.nextPhase.innerHTML = "Next Font:"
    } else {
        element.nextPhase.innerHTML = "Next Phase:"
    }

    element.warning.innerHTML = z.warning;
}

/* Used for testing, using pasted screenshots */
export async function test(img, e) {
    try {
        // reset();
        element = e;
        await loadImages();

        findChatBox(img);
        readChatBox(img);
        checkPhase(img);
        checkEnrage(img);
        checkSpecPercent(img);
        checkHealth(img);
        getNextAttack(img);
        updateInterface();
    } catch (ex) {
        console.log(ex);
    }
}

export function setTelosTab() {
	return Interface.setTelosTab();
};

export function setSettingsTab() {
	return Interface.setSettingsTab();
};

export let reset = () => {
    z.currentPhase = 1;
    z.currentEnrage = -1;
    z.currentSpecPercent = 0;
    z.currentHealth = 0;
    z.startingHealth = 0;
    z.phaseHealth = [];
    z.p4Health = [];
    z.warning = "";

    attack = { currentAttack: 'N/A', nextAttack: 'Tendrils' };
    atk.setAttacks(z.currentEnrage);
    atk.resetAttacks();
};

/* Load the images that will be used to read the screen */
let loadImages = async () => {
    await ImageReader.loadImages();
    await loadPhaseImage();
    await loadEnrageImage();
    await loadSpecBarImage();
    await loadHealthBarImage();
    await atk.loadVirusImages();
};

/* Get the current Phase */
let checkPhase = (img) => {
    let phase = getPhase(img);

    setPhase(phase);
    
    // console.log("Phase: " + z.currentPhase.toString());
};

/* Set the current Phase */
let setPhase = (phase) => {
    if (phase != undefined && phase > 0) {
        if (phase < z.currentPhase) {
            if (!(z.phaseHealth.length > 0 && z.currentHealth <= z.phaseHealth[z.currentPhase])) {
                z.currentPhase = phase;
            }
        } else {
            z.currentPhase = phase;
        }
    }
};

/* Get the current Enrage. Only needed once per kill. */
let checkEnrage = (img) => {
    let enrage = getEnrage(img);
    setEnrage(enrage);
    
    // console.log("Enrage: " + z.currentEnrage.toString());
};

let setEnrage = (enrage) => {
    if (enrage != undefined && enrage >= 0) {
        z.currentEnrage = enrage;
        atk.setAttacks(z.currentEnrage);
        calculateHealth();
    }
};

/* Get the current Special Attack Bar percent */
let checkSpecPercent = (img) => {
    let specPercent = getSpecPercent(img);
    setSpecPercent(specPercent);
    
    // console.log("Spec Percent: " + z.currentSpecPercent.toString());
};

/* Set the current Special Attack Bar percent */
let setSpecPercent = (specPercent) => {
    if (specPercent != undefined && specPercent >= 0) {
        z.currentSpecPercent = specPercent;

        if (z.currentSpecPercent > 90 && (z.currentPhase == 1 || z.currentPhase == 4)) {
            z.warning = "Special Attack is over 90 percent!";
        } else {
            z.warning = "";
        }
    }
};

/* Get the current Health */
let checkHealth = (img) => {
    let health = getHealth(img);
    setHealth(health);
    
    console.log("Health: " + z.currentHealth.toString());
};

/* Set the current Health */
let setHealth = (health) => {

    if (health != undefined && health >= 0) {
        z.currentHealth = health;

        // Move to next phase if phase health is reached. This allows for faster displaying of next attack.
        if (z.phaseHealth.length > 0 && z.currentHealth <= z.phaseHealth[z.currentPhase]) {
            if (!(z.currentEnrage < 100 && z.currentPhase == 4) && z.currentPhase < 5) {
                z.currentPhase++;
                console.log("Health: " + z.currentHealth.toString());
            }
        }
    }

};

/* Calculate starting Health based on Enrage */
let calculateHealth = () => {
    let baseHealth = 400000;
    let p5BaseHealth = 100000;
    let enrageHealth;
    let p5EnrageHealth; // 500 per enrage
    let p4Health;

    z.phaseHealth = [];
    z.p4Health = [];

    enrageHealth = 1000 * z.currentEnrage;

    if (enrageHealth > 200000) {
        enrageHealth = 200000;
    }

    z.startingHealth = baseHealth + enrageHealth;

    z.phaseHealth.push(z.startingHealth);
    z.phaseHealth.push(z.startingHealth * 0.75);
    z.phaseHealth.push(z.startingHealth * 0.50);

    p4Health = z.startingHealth * 0.25;
    z.phaseHealth.push(p4Health);
    z.phaseHealth.push(0);

    if (z.currentEnrage >= 100) {
        p5EnrageHealth = (z.currentEnrage - 100) * 500;

        if (p5EnrageHealth > 100000) {
            p5EnrageHealth = 100000;
        }

        z.phaseHealth.push(p5BaseHealth + p5EnrageHealth);
    }

    z.p4Health.push(p4Health * 0.75);
    z.p4Health.push(p4Health * 0.50);
    z.p4Health.push(p4Health * 0.25);
    z.p4Health.push(0);

    // console.log(z.phaseHealth);
    // console.log(z.p4Health);
}

/* Find the Chat Box */
let findChatBox = (img) => {
    foundChat = ChatBox.findChatBox(img);

    if (foundChat) {
        if (!window.alt1) {
            readChatBox(img);
        }
    }
};

/* Read the Chat Box */
let readChatBox = (img) => {
	chatLines = ChatBox.readChatBox(img);

	if (chatLines?.length > 0) {
        debug();
		// console.log(chatLines);
        getNextAttack(img);
        updateInterface();
	}
};

let getNextAttack = (img) => {
    attack = atk.determineNextAttack(z, chatLines, img);
}

let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let debug = () => {
    for (let l = 0; l < chatLines.length; l++) {
        let line = chatLines[l].toLowerCase();

        if (line.includes("zhi")) {
            if (line.includes("enrage")) {
                setEnrage(Number(line.slice(10).replace(/\D/g, "")));
            } else if (line.includes("phase")) {
                setPhase(Number(line.slice(10).replace(/\D/g, "")));
            } else if (line.includes("spec")) {
                setSpecPercent(Number(line.slice(10).replace(/\D/g, "")));
            } else if (line.includes("hp")) {
                setHealth(Number(line.slice(10).replace(/\D/g, "")));
            } else if (line.includes("clear")) {
                reset();
            } else if (line.includes("smp")) {
                atk.handleSmp();
                setSpecPercent(0);
            }
        }

    }
}
