import { apiCall } from "./utilities.js"; 

export default class LolData {
    async getChampions() {
        return await fetch('./data-dragon/champion.json')
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    getChampion(id) {
    }
}