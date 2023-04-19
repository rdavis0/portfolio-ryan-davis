

import Build from "./build.js";
import LolData from "./lolDataHelper.js";

const ld = new LolData();

const build = new Build();
let champs = null;
let items = null;
const champsDiv = document.getElementById('champList');
const champSelectView = document.getElementById('champ-select-view');
const champImgDir = './data-dragon/img/compressed/champion/';
const buildView = document.getElementById('build-view-container');
const itemSelectView = getElement('item-select-view');
const itemListDiv = getElement('item-list');
const itemImgDir = './data-dragon/img/compressed/item/';

init().then(() => {
    champs = ld.getChampions();
    items = ld.getItems();
    renderChampList();

    // Rapid testing code
    if(location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        selectChampion('Jinx');
        // showItemList('buildItem0');
        selectItem('3006', 'buildItem0'); // Berserker's greaves
        selectItem('3094', 'buildItem1'); // Rapid Firecannon
        selectItem('3085', 'buildItem2'); // Runaan's Hurricane
        setLevel(10);
    }

    document.querySelectorAll('.build-item').forEach((item) => {
        item.addEventListener('click', () => showItemList(item.id));
    });
    constructItemList();
});

async function init(){
    await ld.init().catch(e => {
        console.log(e);
        getElement('champList').innerHTML = 'Champs list failed to load.';
    });
}

function renderChampList() {
    champsDiv.classList.remove('loading');
    champsDiv.innerHTML = '';
    Object.keys(champs).forEach(key => {
        let champ = champs[key];
        let imgPath =  champImgDir + champ.image.full.replace('png', 'webp');
        let fig = document.createElement('figure');
        let img = document.createElement('img');
        img.setAttribute('src', imgPath);
        img.setAttribute('alt', "");
        let figcaption = document.createElement('figcaption');
        figcaption.innerText = champ.id == "Nunu" ? "Nunu" : champ.name;   // Nunu & Willump is too long of a name
        fig.appendChild(img);
        fig.appendChild(figcaption);
        fig.setAttribute('id', champ.id);
        fig.addEventListener('click', () => selectChampion(champ.id));
        champsDiv.appendChild(fig);
    });
}

function showChampSelect() {
    hide(buildView);
    document.querySelector('main').classList.add('champ-select-view');
    document.querySelector('main').classList.remove('build-view');
    show(champSelectView);
}

function selectChampion(id) {
    build.setChampion(ld.getChampion(id));
    renderBuildView();
}

function renderBuildView() {
    getElement('build-view-champ-img').src = champImgDir + build.champion.image.full.replace('png', 'webp');
    getElement('build-view-champ-img').alt = "";
    getElement('champ-name').innerText = build.champion.name;
    let buildStatsDisplay = getElement('build-stats-display');
    for (let stat in build.stats) {
        let p = document.createElement('p');
        p.classList.add('build-stat');
        p.setAttribute('id', stat);
        buildStatsDisplay.appendChild(p);
    }
    updateBuildStatsDisplay();

    document.querySelector('main').classList.add('build-view');
    document.querySelector('main').classList.remove('champ-select-view');
    document.querySelectorAll('.edit-champ-button').forEach((el) => {
        el.addEventListener('click', showChampSelect);
    });
    let levelSelector = getElement('champ-level');
    levelSelector.addEventListener('change', () => setLevel(levelSelector.value));
    hide(champSelectView);
    show(buildView);
}

function updateBuildStatsDisplay() {
    for (let stat in build.stats) {
        let roundedValue = Math.round(build.stats[stat].value * 1000) / 1000;
        if(stat === 'crit' || stat === 'critdamage') {
            roundedValue = Intl.NumberFormat('en-US', {style: 'percent'}).format(roundedValue);
        }
        getElement(stat).innerText = `${build.stats[stat].formatted}: ${roundedValue}`;
    }
    getElement('champ-level').value = build.level;
}

function showItemList(buildItemId) {
    //deselect any previously selected belt slots
    document.querySelectorAll('.build-item[data-active-belt-slot="true"]').forEach((el) => {
        el.removeAttribute('data-active-belt-slot');
    });

    //set the selected belt slot
    getElement(buildItemId).setAttribute('data-active-belt-slot', 'true');
    show(itemSelectView);
}

function constructItemList() {
    Object.keys(items).forEach(key => {
        let item = items[key];
        let imgPath = itemImgDir + item.image.full.replace('png', 'webp');;
        let fig = document.createElement('figure');
        let img = document.createElement('img');
        img.setAttribute('src', imgPath);
        img.setAttribute('alt', "");
        let figcaption = document.createElement('figcaption');
        figcaption.innerText = item.name;
        fig.appendChild(img);
        fig.appendChild(figcaption);
        fig.setAttribute('id', item.id);
        fig.addEventListener('click', () => selectItem(key, document.querySelector('div[data-active-belt-slot="true"]').id));
        itemListDiv.appendChild(fig);
    });
}

function selectItem(itemId, buildItemId) {
    // add the item to the belt
    addItemToBelt(itemId, buildItemId);
    // close the item view
    hide(itemSelectView);
    // add item to the build
    build.setItem(ld.getItem(itemId), getElement(buildItemId).getAttribute('data-belt-position'));
    // update build view with new stats
    updateBuildStatsDisplay();
}

function addItemToBelt(itemId, buildItemId) {
    let buildItemDiv = getElement(buildItemId);
    buildItemDiv.innerHTML = '';
    let img = document.createElement('img');
    let imgPath = itemImgDir + ld.getItem(itemId).image.full.replace('png', 'webp');;
    img.setAttribute('src', imgPath);
    img.setAttribute('alt', ld.getItem(itemId).name);
    buildItemDiv.appendChild(img);
    buildItemDiv.removeAttribute('data-active-belt-slot');
}

function setLevel(level) {
    build.setLevel(level);
    updateBuildStatsDisplay();
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