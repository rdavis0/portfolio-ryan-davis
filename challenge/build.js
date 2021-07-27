export default class Build {
    constructor() {
        this.champion = null;
        this.level = 1;
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
        };
    }  

    setChampion(champ) {
        this.champion = champ;
        this.setStatsToBase();     
    }

    setLevel(level) {
        this.level = level;
    }

    setStatsToBase() {
        let champStats = this.champion.stats
        this.stats.hp.value = champStats.hp;
        this.stats.mp.value = champStats.mp;
        this.stats.movespeed.value = champStats.movespeed;
        this.stats.armor.value = champStats.armor;
        this.stats.magicresist.value = champStats.spellblock;
        this.stats.attackrange.value = champStats.attackrange;
        this.stats.hpregen.value = champStats.hpregen;
        this.stats.mpregen.value = champStats.mpregen;
        this.stats.crit.value = champStats.crit;
        this.stats.attackdamage.value = champStats.attackdamage;
        this.stats.attackspeed.value = champStats.attackspeed;
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
                if (getModifierType(modifier) == 'flat') {
                    this.stats[affectedStat].value += buffValue;
                }           
                else if (getModifierType(modifier) == 'percent') {
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
                case "FlatHPPoolMod": return 'hp'; 
                case "FlatMPPoolMod": return 'mp'; 
                case "PercentHPPoolMod": return 'hp'; 
                case "PercentMPPoolMod": return 'mp'; 
                case "FlatHPRegenMod": return 'hpregen'; 
                case "PercentHPRegenMod": return 'hpregen'; 
                case "FlatMPRegenMod": return 'mpregen'; 
                case "PercentMPRegenMod": return 'mpregen'; 
                case "FlatArmorMod": return 'armor'; 
                case "PercentArmorMod": return 'armor'; 
                case "FlatPhysicalDamageMod": return 'attackdamage'; 
                case "PercentPhysicalDamageMod": return 'attackdamage'; 
                case "FlatMagicDamageMod": return 'ap'; 
                case "PercentMagicDamageMod": return 'ap'; 
                case "FlatMovementSpeedMod": return 'movespeed'; 
                case "PercentMovementSpeedMod": return 'movespeed'; 
                case "FlatAttackSpeedMod": return 'attackspeed'; 
                case "PercentAttackSpeedMod": return 'attackspeed'; 
                // case "PercentDodgeMod": return ''; 
                case "FlatCritChanceMod": return 'crit'; 
                case "PercentCritChanceMod": return 'crit'; 
                // case "FlatCritDamageMod": return ''; 
                // case "PercentCritDamageMod": return ''; 
                // case "FlatBlockMod": return ''; 
                // case "PercentBlockMod": return ''; 
                case "FlatSpellBlockMod": return 'magicresist'; 
                case "PercentSpellBlockMod": return 'magicresist'; 
                // case "FlatEXPBonus": return ''; 
                // case "PercentEXPBonus": return ''; 
                // case "FlatEnergyRegenMod": return ''; 
                // case "FlatEnergyPoolMod": return ''; 
                // case "PercentLifeStealMod": return ''; 
                // case "PercentSpellVampMod": return ''; 
            }
        }
    }

    
}