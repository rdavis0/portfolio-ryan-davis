//create an array of hikes
import Hikes from './hike-data.js';
  
const hikeList = new Hikes("hikes");

  const imgBasePath = "//byui-cit.github.io/cit261/examples/";
  //on load grab the array and insert it into the page
  window.addEventListener("load", () => {
    showHikeList();
  });
  
  function showHikeList() {
    //Finds the ul where hikes will be rendered
    const hikeListElement = document.getElementById("hikes");

    //Makes sure the hike list is empty so duplicates don't get rendered.
    hikeListElement.innerHTML = "";
    
    renderHikeList(hikeListElement);
  }
  
function renderHikeList(parent) {
    hikeList.getAllHikes().forEach(hike => {
        parent.appendChild(renderOneHike(hike));
    });
}

  function renderOneHike(hike) {
    const item = document.createElement("li");
  
    item.innerHTML = ` <h2>${hike.name}</h2>
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div>
                  <div>
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  <div>
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                  </div>
          </div>`;
  
    return item;
  }