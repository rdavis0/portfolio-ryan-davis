import Champion from "./champion.js"

export default class Build {
    constructor() {
        this.champion = null;
        this.items = [];
        this.stats = {
            hp: 0,
            mp: 0,
            movespeed: 0,
            armor: 0,
            magicResist: 0,
            hpregen: 0,
            mpregen: 0,
            crit: 0,
            attackdamage: 0,
            attackspeed: 0,
            attackrange: 0
        }
        this.hp = 0;
    }  

    setChampion(champ) {
        this.champion = champ;
        this.stats.hp = champ.stats.hp;
        this.stats.mp = champ.stats.mp;
        this.stats.movespeed = champ.stats.movespeed;
        this.stats.armor = champ.stats.armor;
        this.stats.magicResist = champ.stats.spellblock;
        this.stats.attackrange = champ.stats.attackrange;
        this.stats.hpregen = champ.stats.hpregen;
        this.stats.mpregen = champ.stats.mpregen;
        this.stats.crit = champ.stats.crit;
        this.stats.attackdamage = champ.stats.attackdamage;
        this.stats.attackspeed = champ.stats.attackspeed;
    }

    setItem(item, pos) {
        this.items[pos] = item;
    }


}