const menuBtnWrite = document.querySelector("#menu-button-write");
const menuBtnOracle = document.querySelector("#menu-button-oracle");
const menuBtnPortent = document.querySelector("#menu-button-portent");
const menuBtnTwene = document.querySelector("#menu-button-twene");

const inputPanels = document.querySelectorAll(".panel-input");
const inputPanelWrite = document.querySelector("#panel-input-write");
const inputPanelOracle = document.querySelector("#panel-input-oracle");
const inputPanelPortent = document.querySelector("#panel-input-portent");
const inputPanelTwene = document.querySelector("#panel-input-twene");

const oracleQuestionInput = document.querySelector("#input-question");
const oracleInputLikelihood = document.querySelector("#input-likelihood");

/* UI */
menuBtnWrite.addEventListener("click", function () {
  setInputPanelDisplay();
});

menuBtnOracle.addEventListener("click", function () {
  setInputPanelDisplay(inputPanelOracle);
});

menuBtnPortent.addEventListener("click", function () {
  setInputPanelDisplay(inputPanelPortent);
});

menuBtnTwene.addEventListener("click", function () {
  setInputPanelDisplay(inputPanelTwene);
});

function setInputPanelDisplay(displayInputPanel) {
  inputPanels.forEach(function (inputPanel) {
    inputPanel.classList.add("hidden");
  });

  if (displayInputPanel !== undefined) {
    displayInputPanel.classList.remove("hidden");
  }
}

/*UTILITIES*/
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*ORACLE*/
const btnOracleGet = document.querySelector("#oracle-get");

let oracleLikelihood = "even";

btnOracleGet.addEventListener("click", function () {
  if (oracleQuestionInput.value === "") {
    tinyMCE.execCommand(
      "mceInsertContent",
      false,
      "<p>You need to enter your question.</p>"
    );
    return false;
  }

  let answer = getOracleAnswer();
  let string = getOracleString(answer);
  setOracleOutput(string);
  resetOracleInputs();
});

oracleQuestionInput.addEventListener("change", function () {
  if (oracleQuestionInput.value.trim() === "") {
    btnOracleGet.disabled = true;
  } else {
    btnOracleGet.disabled = false;
  }
});

oracleInputLikelihood.addEventListener("change", function () {
  oracleLikelihood = oracleInputLikelihood.value;
});

function getOracleAnswer() {
  let oracle = {};
  oracle.question = oracleQuestionInput.value;
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
  oracleString += `<br>${oracle.answer}`;

  if (oracle.likelihood === "even") {
    oracleString += ` (${oracle.finalRoll})`;
  } else {
    oracleString += ` (${oracle.roll1}, ${oracle.roll2})`;
  }

  oracleString += `</p><p></p>`;

  return oracleString;
}

function setOracleOutput(string) {
  tinyMCE.execCommand("mceInsertContent", false, string);
}

function resetOracleInputs() {
  oracleQuestionInput.value = "";
  oracleInputLikelihood.value = "even";
  oracleLikelihood = "even";
}

/* PORTENT */
const btnPortentGet = document.querySelector('#portent-get');

btnPortentGet.addEventListener('click', function() {
  let portent = getPortent();
  let string = getPortentString(portent);
  setPortentOutput(string);
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

function setPortentOutput(string) {
  tinyMCE.execCommand("mceInsertContent", false, string);
}

const verbs = ['rearrange', 'trap', 'unseal', 'isolate', 'avoid', 'corrupt', 'communicate', 'sneak', 'bestow', 'interrupt', 'restore', 'exhaust', 'befriend', 'curse', 'create', 'find', 'deactivate', 'detect', 'move', 'deny', 'punish', 'regenerate', 'attempt', 'assuage', 'disturb', 'decrease', 'abjur', 'injure', 'fight', 'foil', 'shatter', 'ambnush', 'take', 'unearth', 'eliminate', 'inflict', 'reveal', 'destroy', 'warn', 'poison', 'decimate', 'discourage', 'merge', 'follow', 'pardon', 'observe', 'entertain', 'destabilize', 'succeed', 'trespass', 'exchange', 'raise', 'heal', 'lose', 'convince', 'improve', 'humiliate', 'guide', 'divide', 'identify', 'join', 'condemn', 'grow', 'absolve', 'violate', 'enslave', 'strengthen', 'seal', 'trick', 'deviate', 'reward', 'cleanse', 'defeat', 'assist', 'hide', 'delay', 'execute', 'release', 'allow', 'alter', 'silence', 'replace', 'learn', 'bless', 'bargain', 'prevent', 'weaken', 'beguilde', 'pacify', 'forget', 'control', 'degrade', 'fail', 'defenestrate', 'judge', 'antagonize', 'distract', 'halt', 'discover', 'avenge', 'gather', 'imitate', 'fix', 'discuss', 'return', 'plan', 'explore', 'refresh', 'begin', 'travel', 'clarify', 'mesmerize', 'wish', 'confuse', 'meet', 'spoil', 'steal', 'ponder', 'confront', 'remember'];
const adjectives = ['helpful', 'graceful', 'maniacal', 'slovenly', 'terrible', 'curious', 'ironic', 'amusing', 'metaphorical', 'material', 'physical', 'advanced', 'tragic', 'profitable', 'empowered', 'hopeless', 'amicable', 'treacherous', 'artificial', 'active', 'defiant', 'despondent', 'timid', 'theoretical', 'precise', 'scientific', 'intact', 'brazen', 'painful', 'fallen', 'recent', 'delicious', 'diruptive', 'hallucinatory', 'traumatic', 'wonderous', 'cautious', 'common', 'nearby', 'haphazard', 'infinite', 'unholy', 'obvious', 'pandering', 'benevolent', 'rare', 'momentary', 'fetid', 'simple', 'inconvenient', 'religious', 'permanent', 'holy', 'erratic', 'complex', 'standard', 'opportune', 'deceptive', 'orderly', 'malevolent', 'bewildering', 'infamous', 'uncertain', 'psychological', 'hostile', 'personal', 'disappointing', 'humble', 'ghostly', 'immaculate', 'frightful', 'awkward', 'gaudy', 'occult', 'ambitious', 'tender', 'unfair', 'unlikely', 'angelic', 'diabolical', 'heroic', 'fraudulent', 'eldritch', 'stealthy', 'arrogant', 'broken', 'impending', 'restrained', 'mental', 'minor', 'artistic', 'drained', 'prodigious', 'sacreligious', 'hopeful', 'ancient', 'elusive', 'eternal', 'widespread', 'feral', 'new', 'bygone', 'distant', 'medical', 'irksome', 'fundamental', 'aberrant', 'callous', 'dorman', 'unclear', 'disastrous', 'famous', 'temporary', 'arcane', 'impressive', 'aggressive', 'fair', 'spiritual', 'vague', 'repulsive'];
const nouns = ['solution', 'pandemic', 'student', 'work', 'contraband', 'mystery', 'evidence', 'advice', 'temple', 'tool', 'foe', 'mother', 'truth', 'scheme', 'journey', 'dispute', 'death', 'deity', 'time', 'dream', 'illness', 'superstition', 'lies', 'despair', 'barrier', 'treasure', 'servant', 'foreigner', 'soul', 'network', 'health', 'reputation', 'poverty', 'conflict', 'purity', 'companion', 'captivity', 'government', 'monster', 'beast', 'crime', 'creature', 'vault', 'affliction', 'daemon', 'murder', 'portal', 'sustenance', 'goal', 'laboratory', 'fear', 'emotion', 'romance', 'technology', 'merchant', 'prison', 'secret', 'flame', 'council', 'child', 'prophecy', 'peace', 'path', 'civilization', 'exposure', 'chaos', 'food', 'obstacle', 'grudge', 'vehicle', 'source', 'belief', 'defense', 'love', 'structure', 'game', 'resource', 'wreckage', 'trial', 'trap', 'scrum', 'wilderness', 'mentor', 'father', 'aura', 'tension', 'rebellion', 'lookout', 'font', 'knowledge', 'evil', 'freedom', 'relief', 'investment', 'haven', 'relative', 'locals', 'underling', 'weapon', 'pain', 'tourist', 'agreement', 'rage', 'goodness', 'skill', 'hive', 'ability', 'salvation', 'nightmare', 'training', 'estate', 'team', 'leader', 'container', 'magic', 'puzzle', 'monument', 'wealth', 'resurrection', 'stockpile'];

/* TWENE */
const btnTweneGet = document.querySelector('#twene-get');

btnTweneGet.addEventListener('click', function() {
  let twene = getTwene();
  let string = getTweneString(twene);
  setTweneOutput(string);
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

function setTweneOutput(string) {
  tinyMCE.execCommand("mceInsertContent", false, string);
}