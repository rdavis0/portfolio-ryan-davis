
export default class LBCView {
    renderChampList(data, champsDiv) {
        champsDiv.innerHTML = '';
        
        const champsList = data.data;
        Object.keys(champsList).forEach(key => {
            let champ = champsList[key];
            let name = champ.name;
            let imgPath = champ.image.full;
            let fig = document.createElement('figure');
            let img = document.createElement('img');
            img.setAttribute('src', `./data-dragon/img/champion/${imgPath}`)
            let figcaption = document.createElement('figcaption');
            figcaption.innerText = name;
            fig.appendChild(img);
            fig.appendChild(figcaption);
            champsDiv.appendChild(fig);
        })
    }
}