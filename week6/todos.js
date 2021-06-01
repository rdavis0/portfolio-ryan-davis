import {qs, onTouch} from './utilities.js'
import {readFromLS, writeToLS} from './ls.js';

export default class Todos {
    constructor(parentElementId, key) {
        this.parentElement = document.getElementById(parentElementId);
        this.key = key;
        
        // set element and key here? maybe no params?
    }
}