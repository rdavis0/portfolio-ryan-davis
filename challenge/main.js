import Build from "./build.js";
import LolData from "./lolDataHelper.js";

const ld = new LolData();
await ld.init();
const champs = ld.getChampions();
const items = ld.getItems();

const build = new Build();

const champsDiv = document.getElementById('champList');
const champSelectView = document.getElementById('champ-select-view');
const champImgPath = './data-dragon/img/champion/';
const buildView = document.getElementById('build-view-container');
const itemSelectView = getElement('item-select-view');
const itemListDiv = getElement('item-list');
const itemImgPath = './data-dragon/img/item/'

init();

function init() { 
    renderChampList();

    // Rapid testing code
    selectChampion('Sivir');
    // showItemList('buildItem1');
    // selectItem('1056', 'buildItem1');

    document.querySelectorAll('.build-item').forEach((item) => {
        item.addEventListener('click', () => showItemList(item.id));
    });
    constructItemList();
}

function renderChampList() {
    champsDiv.innerHTML = '';
    Object.keys(champs).forEach(key => {
        let champ = champs[key];
        let imgPath = champ.image.full;
        let fig = document.createElement('figure');
        let img = document.createElement('img');
        img.setAttribute('src', champImgPath + imgPath);
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
    build.setChampion(ld.getChampion(id));
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
    document.querySelector('main').classList.add('build-view');
    document.querySelector('main').classList.remove('champ-select-view');
    hide(champSelectView);
    show(buildView);
}

function showItemList(beltPosition) {
    getElement(beltPosition).setAttribute('data-active-belt-slot', 'true');
    // document.querySelector('main').classList.add('item-select-view');
    show(itemSelectView);
}

function constructItemList() {
    Object.keys(items).forEach(key => {
        let item = items[key];
        let imgPath = item.image.full;
        let fig = document.createElement('figure');
        let img = document.createElement('img');
        img.setAttribute('src', itemImgPath + imgPath);
        let figcaption = document.createElement('figcaption');
        figcaption.innerText = item.name;
        fig.appendChild(img);
        fig.appendChild(figcaption);
        fig.setAttribute('id', item.id);
        fig.addEventListener('click', () => selectItem(key, document.querySelector('div[data-active-belt-slot="true"]').id));
        itemListDiv.appendChild(fig);
    })
}

function selectItem(itemId, beltPosition) {
    // add the item to the belt
    addItemToBelt(itemId, beltPosition);

    // close the item view
    hide(itemSelectView);

    // add item to the build
    build.setItem(ld.getItem(itemId), beltPosition);
}

function addItemToBelt(itemId, beltPosition) {
    let buildItemDiv = getElement(beltPosition);
    buildItemDiv.innerHTML = '';
    let img = document.createElement('img');
    let imgPath = ld.getItem(itemId).image.full;
    img.setAttribute('src', itemImgPath + imgPath);
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