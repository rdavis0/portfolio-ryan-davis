

import Build from "./build.js";
import LolData from "./lolDataHelper.js";

const ld = new LolData();

const build = new Build();
let champs = null;
let items = null;
const champsDiv = document.getElementById('champList');
const champSelectView = document.getElementById('champ-select-view');
const champImgPath = './data-dragon/img/champion/';
const buildView = document.getElementById('build-view-container');
const itemSelectView = getElement('item-select-view');
const itemListDiv = getElement('item-list');
const itemImgPath = './data-dragon/img/item/';

init().then(() => {
    champs = ld.getChampions();
    items = ld.getItems();
    renderChampList();

    // Rapid testing code
    selectChampion('Nunu');
    // showItemList('buildItem3');
    // selectItem('1001', 'buildItem3');

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
        let imgPath = champ.image.full;
        let fig = document.createElement('figure');
        let img = document.createElement('img');
        img.setAttribute('src', champImgPath + imgPath);
        img.setAttribute('alt', champ.name);
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
    getElement('build-view-champ-img').src = champImgPath + build.champion.image.full;
    getElement('build-view-champ-img').alt = build.champion.name;
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
    getElement('edit-champ-button').addEventListener('click', showChampSelect);
    hide(champSelectView);
    show(buildView);
}

function updateBuildStatsDisplay() {
    for (let stat in build.stats) {
        if(stat === 'crit') {
            let critPercent = Intl.NumberFormat('en-US', {style: 'percent'}).format(build.stats[stat].value);
            getElement(stat).innerText = `${build.stats[stat].formatted}: ${critPercent}`;
        }
        else getElement(stat).innerText = `${build.stats[stat].formatted}: ${build.stats[stat].value}`;
    }
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
        let imgPath = item.image.full;
        let fig = document.createElement('figure');
        let img = document.createElement('img');
        img.setAttribute('src', itemImgPath + imgPath);
        img.setAttribute('alt', item.name);
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
    let imgPath = ld.getItem(itemId).image.full;
    img.setAttribute('src', itemImgPath + imgPath);
    img.setAttribute('alt', ld.getItem(itemId).name);
    buildItemDiv.appendChild(img);
    buildItemDiv.removeAttribute('data-active-belt-slot');
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