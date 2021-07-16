import Build from "./build.js";
import LolData from "./lolDataHelper.js";

const ld = new LolData();
const champs = await ld.getChampions();
const dataDragVer = champs.version;
const champsList = champs.data;
const build = new Build();
const champsDiv = document.getElementById('champList');
const champSelectView = document.getElementById('champ-select-view');
const buildView = document.getElementById('build-view');
const champImgPath = './data-dragon/img/champion/';



renderChampList(champsList);

function renderChampList(champsList) {
    champsDiv.innerHTML = '';
    Object.keys(champsList).forEach(key => {
        let champ = champsList[key];
        let imgPath = champ.image.full;
        let fig = document.createElement('figure');
        let img = document.createElement('img');
        img.setAttribute('src', `./data-dragon/img/champion/${imgPath}`);
        let figcaption = document.createElement('figcaption');
        figcaption.innerText = champ.name;
        fig.appendChild(img);
        fig.appendChild(figcaption);
        fig.setAttribute('id', champ.id);
        fig.addEventListener('click', () => selectChampion(champ.id));
        champsDiv.appendChild(fig);
    })
}


function selectChampion(id) {
    build.setChampion(ld.getChampion(champsList, id));
    renderBuildView();
}

function renderBuildView() {
    getElement('build-view-champ-img').src = champImgPath + build.champion.image.full;
    getElement('build-view-champ-img').alt = build.champion.name;
    getElement('champ-name').innerText = build.champion.name;
    let buildStatsDisplay = getElement('build-stats-display');
    for(let stat in build.stats) {
        let p = document.createElement('p');
        p.innerText = `${stat}: ${build.stats[stat]}`;
        buildStatsDisplay.appendChild(p);
    }
    hide(champSelectView);
    show(buildView);
}

function hide(element) {
    element.style.display = 'none';
}

function show(element) {
    element.style.display = 'block';
}

function getElement(e) {
    return document.getElementById(e);
}