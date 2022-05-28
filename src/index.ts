import * as a1lib from "@alt1/base";
import "./css/nis.css";
import "./css/styles.css";
import * as $ from "./js/jquery.js";
import * as main from "./scripts/script.js";

// Tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

let element = {
	phase: document.getElementById("phase"),
	enrage: document.getElementById("enrage"),
	special: document.getElementById("special"),
	health: document.getElementById("health"),
	currentAttack: document.getElementById("current-attack"),
	nextAttack: document.getElementById("next-attack"),
	suggestion: document.getElementById("suggestion"),
	warning: document.getElementById("warning"),
	nextPhase: document.getElementById("next-phase"),
	streak: document.getElementById("streak"),
	showMouseTooltip: localStorage.mouse_tooltip
}

let settings = {
    showMouseTooltip: false,
    refreshRate: 200
}

window.onload = async function start() {
	
	if (window.alt1) {
		if (localStorage.getItem("showMouseTooltip") == "true") {
			$("#mouse-tooltip").prop("checked", true)
			settings.showMouseTooltip = localStorage.showMouseTooltip;
		}
	
		if (localStorage.getItem("refreshRate")) {
			$("#refresh-rate").val(localStorage.getItem("refreshRate"));
			settings.refreshRate = localStorage.refreshRate;
		}
		
		main.updateSettings(settings);
		main.start(element);
	}

	setTelosTab();
	console.log("Ready to spenk");
}

// Listen for pasted (ctrl-v) images, usually used in the browser version of an app
a1lib.PasteInput.listen(img => {
	main.test(img, element);
}, (err, errid) => {

});

if (window.alt1) {
	alt1.identifyAppUrl("./appconfig.json");
}

$(".contenttab").click(function() {
	$(".activetab").removeClass("activetab");
	$(this).addClass("activetab");
	
	if (this.id == "telos-tab") {
		setTelosTab();
	} else if (this.id == "drops-tab") {
		setDropsTab();
	} else if (this.id == "settings-tab") {
		setSettingsTab();
	}
});

export function setTelosTab() {
	$('#telos-content').show();
	$('#drops-content').hide();
	$('#settings-content').hide();
};

export function setDropsTab() {
	$('#settings-content').hide();
	$('#drops-content').show();
	$('#telos-content').hide();
};

export function setSettingsTab() {
	$('#telos-content').hide();
	$('#drops-content').hide();
	$('#settings-content').show();
};

$("#mouse-tooltip").change(function () {
	localStorage.showMouseTooltip = $(this).is(":checked");
	
	settings.showMouseTooltip = localStorage.showMouseTooltip;
	main.updateSettings(settings);
});

$("#refresh-rate").change(function () {
	localStorage.refreshRate = $(this).val();
	
	settings.refreshRate = localStorage.refreshRate;
	main.updateSettings(settings);
});