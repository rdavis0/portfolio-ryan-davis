import {getJSON} from './utilities.js'

export default class LolData {
    async getChampions() {
        return getJSON('./data-dragon/champion.json');
    }

    getChampion(champsList, champId) {
        return champsList[champId];
    }
}