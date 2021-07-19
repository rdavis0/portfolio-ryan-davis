export default class Build {
    constructor() {
        this.champion = null;
        this.items = [];
        this.stats = {
            hp: {
                value: 0,
                formatted: 'HP'
            },
            hpregen: {
                value: 0,
                formatted: 'HP Regen'
            },
            mp: {
                value: 0,
                formatted: 'Mana'
            },
            mpregen: {
                value: 0,
                formatted: 'Mana Regen'
            },
            armor: {
                value: 0,
                formatted: 'Armor'
            },
            magicresist: {
                value: 0,
                formatted: 'Magic Resist'
            },
            attackdamage: {
                value: 0,
                formatted: 'Attack Damage'
            },
            attackspeed: {
                value: 0,
                formatted: 'Attack Speed'
            },
            attackrange: {
                value: 0,
                formatted: 'Attack Range'
            },
            crit: {
                value: 0,
                formatted: 'Critical Strike'
            },
            ap: {
                value: 0,
                formatted: 'Ability Power'
            },
            movespeed: {
                value: 0,
                formatted: 'Movement Speed'
            }
        }
    }  

    setChampion(champ) {
        this.champion = champ;
        this.setStatsToBase();     
    }

    setStatsToBase() {
        this.stats.hp.value = this.champion.stats.hp;
        this.stats.mp.value = this.champion.stats.mp;
        this.stats.movespeed.value = this.champion.stats.movespeed;
        this.stats.armor.value = this.champion.stats.armor;
        this.stats.magicresist.value = this.champion.stats.spellblock;
        this.stats.attackrange.value = this.champion.stats.attackrange;
        this.stats.hpregen.value = this.champion.stats.hpregen;
        this.stats.mpregen.value = this.champion.stats.mpregen;
        this.stats.crit.value = this.champion.stats.crit;
        this.stats.attackdamage.value = this.champion.stats.attackdamage;
        this.stats.attackspeed.value = this.champion.stats.attackspeed;
        this.stats.ap.value = 0;
    }

    setItem(item, pos) {
        this.items[pos] = item;
        this.calcStats();
    }

    calcStats() {
        this.setStatsToBase();
        this.items.forEach((item) => {
            for(var modifier in item.stats) {
                let affectedStat = getAffectedStat(modifier);
                let buffValue = item.stats[modifier];  
                if (getModifierType(modifier) === 'flat') {
                    this.stats[affectedStat].value += buffValue;
                }           
                else if (getModifierType(modifier) === 'percent') {
                    this.stats[affectedStat].value *= (1 + buffValue);
                }   
            }
        });
        
        function getModifierType(modifier) {
            if(modifier.toLowerCase().includes('flat')) 
                return 'flat';
            else if (modifier.toLowerCase().includes('percent')) 
                return 'percent';
            else return 'error';
        }

        function getAffectedStat(modifier) {
            switch (modifier) {
                case "FlatHPPoolMod": return 'hp'; break;
                case "FlatMPPoolMod": return 'mp'; break;
                case "PercentHPPoolMod": return 'hp'; break;
                case "PercentMPPoolMod": return 'mp'; break;
                case "FlatHPRegenMod": return 'hpregen'; break;
                case "PercentHPRegenMod": return 'hpregen'; break;
                case "FlatMPRegenMod": return 'mpregen'; break;
                case "PercentMPRegenMod": return 'mpregen'; break;
                case "FlatArmorMod": return 'armor'; break;
                case "PercentArmorMod": return 'armor'; break;
                case "FlatPhysicalDamageMod": return 'attackdamage'; break;
                case "PercentPhysicalDamageMod": return 'attackdamage'; break;
                case "FlatMagicDamageMod": return 'ap'; break;
                case "PercentMagicDamageMod": return 'ap'; break;
                case "FlatMovementSpeedMod": return 'movespeed'; break;
                case "PercentMovementSpeedMod": return 'movespeed'; break;
                case "FlatAttackSpeedMod": return 'attackspeed'; break;
                case "PercentAttackSpeedMod": return 'attackspeed'; break;
                // case "PercentDodgeMod": return ''; break;
                case "FlatCritChanceMod": return 'crit'; break;
                case "PercentCritChanceMod": return 'crit'; break;
                // case "FlatCritDamageMod": return ''; break;
                // case "PercentCritDamageMod": return ''; break;
                // case "FlatBlockMod": return ''; break;
                // case "PercentBlockMod": return ''; break;
                case "FlatSpellBlockMod": return 'magicresist'; break;
                case "PercentSpellBlockMod": return 'magicresist'; break;
                // case "FlatEXPBonus": return ''; break;
                // case "PercentEXPBonus": return ''; break;
                // case "FlatEnergyRegenMod": return ''; break;
                // case "FlatEnergyPoolMod": return ''; break;
                // case "PercentLifeStealMod": return ''; break;
                // case "PercentSpellVampMod": return ''; break;
            }
        }
    }

    
}