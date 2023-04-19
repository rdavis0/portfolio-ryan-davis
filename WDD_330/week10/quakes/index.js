import { getJSON, getLocation } from './utilities.js';

const baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-06-01&endtime=2021-06-30';

//Import controller here, instantiate class, then call init
import QuakesController from './quakeController.js';
const quakesController = new QuakesController('#quakeList');
quakesController.init();
document.getElementById('radiusBtn').addEventListener('click', () => {
    let radius = document.getElementById('radius').value;
    console.log(radius);
    quakesController.init(radius);
}); 

