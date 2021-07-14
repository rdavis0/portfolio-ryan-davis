import LolData from "./lbc.js";
import defaultExport from "./lbc.js";
import LBCView from "./view.js";

 const ld = new LolData();
 const champs = await ld.getChampions();

const lbcView = new LBCView();
lbcView.renderChampList(champs, document.getElementById('champList'));