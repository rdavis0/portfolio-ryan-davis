import {getJSON} from './utilities.js'

export default class LolData {
    constructor() {
        this.champs = null;
        this.items = null;
    }
    
    async init() {
        this.champs = await getJSON('./data-dragon/champion.json');
        this.items = await getJSON('./data-dragon/item.json');
    }

    getChampions() {
        return this.champs.data;
    }

    getChampion(id) {
        return this.champs.data[id];
    }

    getItems() {
        return this.items.data;
    }

    getItem(id) {
        return this.items.data[id];
    }

    getVersion() {
        return this.champs.version;
    }
}