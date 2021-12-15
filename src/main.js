/* UI */
const panels = document.querySelectorAll(".panel");
const panelWriting = document.querySelector(".writing");

function setPanelVisibility(panel) {
  // If panel already visible, hide it
  if (!panel.classList.contains("hidden")) {
    panel.classList.add("hidden");
  }
  // else hide all panels then display input panel
  else {
    panels.forEach(function (panel) {
      panel.classList.add("hidden");
    });
    panel.classList.remove("hidden");
  }
  setEditorVisibility();
}

function setEditorVisibility() {
  if (panelOptions.classList.contains("hidden")) {
    panelWriting.classList.remove("hidden");
  } else {
    panelWriting.classList.add("hidden");
  }
}

/*UTILITIES*/
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function appendOutput(string) {
  tinyMCE.execCommand("mceInsertContent", false, string);
}

function notImplemented(event) {
  appendOutput(`<p class="game">${event.target.id} not implemented`);
}

/*ORACLE*/
const btnOracle = document.querySelector("#button-oracle");
const panelOracle = document.querySelector("#panel-oracle");
const btnOracleAsk = document.querySelector("#oracle-ask");
const oracleInputQuestion = document.querySelector("#input-question");
const oracleInputLikelihood = document.querySelector("#input-likelihood");
const diplayInterventionPoints = document.querySelector(
  "#display-intervention-points"
);

let oracleLikelihood = "even";
let interventionPoints = 0;

btnOracle.addEventListener("click", function () {
  setPanelVisibility(panelOracle);
});

btnOracleAsk.addEventListener("click", function () {
  let answer = getOracleAnswer();
  let string = getOracleString(answer);
  appendOutput(string);
  resetOracleInputs();
  testOracleIntervention(answer);
});

oracleInputLikelihood.addEventListener("change", function () {
  oracleLikelihood = oracleInputLikelihood.value;
});

function getOracleAnswer() {
  let oracle = {};
  oracle.question = oracleInputQuestion.value;
  oracle.likelihood = oracleLikelihood;
  oracle.roll1 = getRandomNum(1, 6);
  oracle.roll2 = getRandomNum(1, 6);

  const answerTable = {
    1: "No, and…",
    2: "No.",
    3: "No, but…",
    4: "Yes, but…",
    5: "Yes.",
    6: "Yes, and…",
  };

  if (oracleLikelihood === "even") {
    oracle.finalRoll = oracle.roll1;
    oracle.answer = answerTable[oracle.roll1];
  } else if (oracleLikelihood === "unlikely") {
    oracle.finalRoll = Math.min(oracle.roll1, oracle.roll2);
    oracle.answer = answerTable[oracle.finalRoll];
  } else if (oracleLikelihood === "likely") {
    oracle.finalRoll = Math.max(oracle.roll1, oracle.roll2);
    oracle.answer = answerTable[oracle.finalRoll];
  } else {
    alert(
      `Likelihood modifier ${oracleLikelihood} not recognised. Abandoning oracle operation.`
    );
    return false;
  }
  return oracle;
}

function getOracleString(oracle) {
  let oracleString = `<p class="oracle">${oracle.question}`;

  if (oracle.likelihood !== "even") {
    oracleString += ` (${oracle.likelihood})`;
  }

  if (oracleString !== '<p class="oracle">') {
    oracleString += `<br>`;
  }

  oracleString += `${oracle.answer}`;

  // if (oracle.likelihood === "even") {
  //   oracleString += ` (${oracle.finalRoll})`;
  // } else {
  //   oracleString += ` (${oracle.roll1}, ${oracle.roll2})`;
  // }

  oracleString += `</p><p></p>`;

  return oracleString;
}

function resetOracleInputs() {
  oracleInputQuestion.value = "";
  oracleInputLikelihood.value = "even";
  oracleLikelihood = "even";
}

function testOracleIntervention(oracle) {
  if (oracle.roll1 === 6) {
    interventionPoints++;
  }
  if (oracle.roll2 === 6) {
    interventionPoints++;
  }
  diplayInterventionPoints.textContent = interventionPoints;

  if (interventionPoints >= 3) {
    let intervention = getIntervention();
    let string = getInterventionString(intervention);
    appendOutput(`<p class="oracle">Intervention Triggered!</p><p>`);
    appendOutput(string);
    interventionPoints = 0;
    diplayInterventionPoints.textContent = 0;
  }
}

/* TOOLS */
const btnTools = document.querySelector("#button-tools");
const panelTools = document.querySelector("#panel-tools");
const btnIntervention = document.querySelector("#button-intervention");
const btnPortent = document.querySelector("#button-portent");
const btnTwene = document.querySelector("#button-twene");
const btnNpcAttitude = document.querySelector("#button-npc-attitude");

const verbs = [
  "rearrange",
  "trap",
  "unseal",
  "isolate",
  "avoid",
  "corrupt",
  "communicate",
  "sneak",
  "bestow",
  "interrupt",
  "restore",
  "exhaust",
  "befriend",
  "curse",
  "create",
  "find",
  "deactivate",
  "detect",
  "move",
  "deny",
  "punish",
  "regenerate",
  "attempt",
  "assuage",
  "disturb",
  "decrease",
  "abjur",
  "injure",
  "fight",
  "foil",
  "shatter",
  "ambnush",
  "take",
  "unearth",
  "eliminate",
  "inflict",
  "reveal",
  "destroy",
  "warn",
  "poison",
  "decimate",
  "discourage",
  "merge",
  "follow",
  "pardon",
  "observe",
  "entertain",
  "destabilize",
  "succeed",
  "trespass",
  "exchange",
  "raise",
  "heal",
  "lose",
  "convince",
  "improve",
  "humiliate",
  "guide",
  "divide",
  "identify",
  "join",
  "condemn",
  "grow",
  "absolve",
  "violate",
  "enslave",
  "strengthen",
  "seal",
  "trick",
  "deviate",
  "reward",
  "cleanse",
  "defeat",
  "assist",
  "hide",
  "delay",
  "execute",
  "release",
  "allow",
  "alter",
  "silence",
  "replace",
  "learn",
  "bless",
  "bargain",
  "prevent",
  "weaken",
  "beguilde",
  "pacify",
  "forget",
  "control",
  "degrade",
  "fail",
  "defenestrate",
  "judge",
  "antagonize",
  "distract",
  "halt",
  "discover",
  "avenge",
  "gather",
  "imitate",
  "fix",
  "discuss",
  "return",
  "plan",
  "explore",
  "refresh",
  "begin",
  "travel",
  "clarify",
  "mesmerize",
  "wish",
  "confuse",
  "meet",
  "spoil",
  "steal",
  "ponder",
  "confront",
  "remember",
];
const adjectives = [
  "helpful",
  "graceful",
  "maniacal",
  "slovenly",
  "terrible",
  "curious",
  "ironic",
  "amusing",
  "metaphorical",
  "material",
  "physical",
  "advanced",
  "tragic",
  "profitable",
  "empowered",
  "hopeless",
  "amicable",
  "treacherous",
  "artificial",
  "active",
  "defiant",
  "despondent",
  "timid",
  "theoretical",
  "precise",
  "scientific",
  "intact",
  "brazen",
  "painful",
  "fallen",
  "recent",
  "delicious",
  "diruptive",
  "hallucinatory",
  "traumatic",
  "wonderous",
  "cautious",
  "common",
  "nearby",
  "haphazard",
  "infinite",
  "unholy",
  "obvious",
  "pandering",
  "benevolent",
  "rare",
  "momentary",
  "fetid",
  "simple",
  "inconvenient",
  "religious",
  "permanent",
  "holy",
  "erratic",
  "complex",
  "standard",
  "opportune",
  "deceptive",
  "orderly",
  "malevolent",
  "bewildering",
  "infamous",
  "uncertain",
  "psychological",
  "hostile",
  "personal",
  "disappointing",
  "humble",
  "ghostly",
  "immaculate",
  "frightful",
  "awkward",
  "gaudy",
  "occult",
  "ambitious",
  "tender",
  "unfair",
  "unlikely",
  "angelic",
  "diabolical",
  "heroic",
  "fraudulent",
  "eldritch",
  "stealthy",
  "arrogant",
  "broken",
  "impending",
  "restrained",
  "mental",
  "minor",
  "artistic",
  "drained",
  "prodigious",
  "sacreligious",
  "hopeful",
  "ancient",
  "elusive",
  "eternal",
  "widespread",
  "feral",
  "new",
  "bygone",
  "distant",
  "medical",
  "irksome",
  "fundamental",
  "aberrant",
  "callous",
  "dorman",
  "unclear",
  "disastrous",
  "famous",
  "temporary",
  "arcane",
  "impressive",
  "aggressive",
  "fair",
  "spiritual",
  "vague",
  "repulsive",
];
const nouns = [
  "solution",
  "pandemic",
  "student",
  "work",
  "contraband",
  "mystery",
  "evidence",
  "advice",
  "temple",
  "tool",
  "foe",
  "mother",
  "truth",
  "scheme",
  "journey",
  "dispute",
  "death",
  "deity",
  "time",
  "dream",
  "illness",
  "superstition",
  "lies",
  "despair",
  "barrier",
  "treasure",
  "servant",
  "foreigner",
  "soul",
  "network",
  "health",
  "reputation",
  "poverty",
  "conflict",
  "purity",
  "companion",
  "captivity",
  "government",
  "monster",
  "beast",
  "crime",
  "creature",
  "vault",
  "affliction",
  "daemon",
  "murder",
  "portal",
  "sustenance",
  "goal",
  "laboratory",
  "fear",
  "emotion",
  "romance",
  "technology",
  "merchant",
  "prison",
  "secret",
  "flame",
  "council",
  "child",
  "prophecy",
  "peace",
  "path",
  "civilization",
  "exposure",
  "chaos",
  "food",
  "obstacle",
  "grudge",
  "vehicle",
  "source",
  "belief",
  "defense",
  "love",
  "structure",
  "game",
  "resource",
  "wreckage",
  "trial",
  "trap",
  "scrum",
  "wilderness",
  "mentor",
  "father",
  "aura",
  "tension",
  "rebellion",
  "lookout",
  "font",
  "knowledge",
  "evil",
  "freedom",
  "relief",
  "investment",
  "haven",
  "relative",
  "locals",
  "underling",
  "weapon",
  "pain",
  "tourist",
  "agreement",
  "rage",
  "goodness",
  "skill",
  "hive",
  "ability",
  "salvation",
  "nightmare",
  "training",
  "estate",
  "team",
  "leader",
  "container",
  "magic",
  "puzzle",
  "monument",
  "wealth",
  "resurrection",
  "stockpile",
];

btnTools.addEventListener("click", function () {
  setPanelVisibility(panelTools);
});

/* INTERVENTION */
btnIntervention.addEventListener("click", function () {
  let intervention = getIntervention();
  let string = getInterventionString(intervention);
  appendOutput(string);
});

function getIntervention() {
  const interventionTable = {
    1: "New entity",
    2: "Entity positive",
    3: "Entity negative",
    4: "Advance plot",
    5: "Regress plot",
    6: "Wild",
  };

  let roll = getRandomNum(1, 6);
  return interventionTable[roll];
}

function getInterventionString(intervention) {
  return `<p class="oracle">Intervention: ${intervention}</p><p>`;
}

/* PORTENT */
btnPortent.addEventListener("click", function () {
  let portent = getPortent();
  let string = getPortentString(portent);
  appendOutput(string);
});

function getPortent() {
  let portent = {};
  portent.verb = verbs[getRandomNum(0, verbs.length - 1)];
  portent.adjective = adjectives[getRandomNum(0, adjectives.length - 1)];
  portent.noun = nouns[getRandomNum(0, nouns.length - 1)];
  return portent;
}

function getPortentString(portent) {
  let string = '<p class="oracle">Portent: ';
  string += `${portent.verb}, `;
  string += `${portent.adjective}, `;
  string += `${portent.noun}`;
  string += `</p><p>`;
  return string;
}

/* TWENE */
btnTwene.addEventListener("click", function () {
  let twene = getTwene();
  let string = getTweneString(twene);
  appendOutput(string);
});

function getTwene() {
  const tweneTable = {
    1: "Increase simple element",
    2: "Decrease simple element",
    3: "Add simple element",
    4: "Remove simple element",
    5: "Increase major element",
    6: "Decrease major element",
    7: "Add major element",
    8: "Remove major element",
    9: "Wild positive",
    10: "Wild negative",
  };

  let roll = getRandomNum(1, 10);
  return tweneTable[roll];
}

function getTweneString(twene) {
  return `<p class="oracle">TWENE: ${twene}</p><p>`;
}

/* NPC Attitude */
btnNpcAttitude.addEventListener("click", function () {
  let npcAttitude = getNpcAttitude();
  let string = getNpcAttitudeString(npcAttitude);
  appendOutput(string);
});

function getNpcAttitude() {
  const npcAttitudeTable = {
    1: "Hostile",
    2: "Hostile",
    3: "Neutral",
    4: "Neutral",
    5: "Friendly",
    6: "Friendly",
  };

  let roll = getRandomNum(1, 6);
  return npcAttitudeTable[roll];
}

function getNpcAttitudeString(npcAttitude) {
  return `<p class="oracle">NPC Attitude: ${npcAttitude}</p><p>`;
}

/* LISTS */
const btnLists = document.querySelector("#button-lists");
const panelLists = document.querySelector("#panel-lists");
const btnPlots = document.querySelector("#button-plots");
const btnEntities = document.querySelector("#button-entities");

btnLists.addEventListener("click", function (e) {
  setPanelVisibility(panelLists);
});

/* PLOTS */
btnPlots.addEventListener("click", function (e) {
  notImplemented(e);
});

/* ENTITIES */
btnEntities.addEventListener("click", function (e) {
  notImplemented(e);
});

/* OPTIONS */
const btnOptions = document.querySelector("#button-options");
const panelOptions = document.querySelector("#panel-options");
const btnExportHtml = document.querySelector("#export-html");
const btnExportText = document.querySelector("#export-text");
const btnSystemPDF = document.querySelector("#system-pdf");
const btnSystemSource = document.querySelector("#system-source");
const btnAboutHowToMune = document.querySelector("#about-how-to-mune");

btnOptions.addEventListener("click", function () {
  setPanelVisibility(panelOptions);
});

btnExportHtml.addEventListener("click", function () {
  exportToHTML();
});

function exportToHTML() {
  const htmlTemplateStart = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mune</title>
  <style>
  body {
    font-family: "Helvetica";
  }  
  
  .oracle {
    color: #008060;
  }

  .game {
    color: #800000;
  }
  </style>
</head>
<body>`;

  const htmlTemplateEnd = `
  </body>
  </html>`;

  let output = `${htmlTemplateStart}${tinymce.activeEditor.getContent()}${htmlTemplateEnd}`;
  download("mune.html", output);
}

btnExportText.addEventListener("click", function () {
  exportToText();
});

function exportToText() {
  let htmlString = tinymce.activeEditor.getContent();
  let htmlNode = document.createElement("div");
  htmlNode.innerHTML = htmlString;
  let output = htmlNode.textContent;
  download("mune.txt", output);
}

btnAboutHowToMune.addEventListener("click", function () {
  alert("Not implemented");
});

btnSystemPDF.addEventListener("click", function () {
  window.open("mune_v5.pdf");
});

btnSystemSource.addEventListener("click", function () {
  window.open("https://homebrewery.naturalcrit.com/share/rkmo0t9k4Q");
});
