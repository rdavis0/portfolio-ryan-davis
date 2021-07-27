export default class Build {
    constructor() {
        this.champion = null;
        this.level = 1;
        this.items = [];
        this.stats = {
            hp: {
                value: 0,
                multiplier: 1,
                formatted: 'HP'
            },
            hpregen: {
                value: 0,
                multiplier: 1,
                formatted: 'HP Regen'
            },
            mp: {
                value: 0,
                multiplier: 1,
                formatted: 'Mana'
            },
            mpregen: {
                value: 0,
                multiplier: 1,
                formatted: 'Mana Regen'
            },
            armor: {
                value: 0,
                multiplier: 1,
                formatted: 'Armor'
            },
            spellblock: {
                value: 0,
                multiplier: 1,
                formatted: 'Magic Resist'
            },
            attackdamage: {
                value: 0,
                multiplier: 1,
                formatted: 'Attack Damage'
            },
            attackspeed: {
                value: 0,
                multiplier: 1,
                formatted: 'Attack Speed'
            },
            attackrange: {
                value: 0,
                multiplier: 1,
                formatted: 'Attack Range'
            },
            crit: {
                value: 0,
                multiplier: 1,
                formatted: 'Crit Chance'
            },
            critdamage: {
                value: 0,
                multiplier: 1,
                formatted: 'Crit Damage'
            },
            ap: {
                value: 0,
                multiplier: 1,
                formatted: 'Ability Power'
            },
            movespeed: {
                value: 0,
                multiplier: 1,
                formatted: 'Movement Speed'
            },
            armorpen: {
                value: 0,
                multiplier: 1,
                formatted: 'Armor Penetration'
            },
            // lethality: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Lethality'
            // },
            // lifesteal: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Life Steal'
            // },
            // magicpen: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Magic Penetration'
            // },
            // omnivamp: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Omnivamp'
            // },
            // physvamp: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Physical Vamp'
            // },
            // healshieldpower: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Heal & Shield Power'
            // },
            // tenacity: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Tenacity'
            // },
            // slowresist: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Slow Resist'
            // },
            // abilityhaste: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Ability Haste'
            // },
            // energy: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Energy'
            // },
            // energyregen: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Energy Regen'
            // },
            // goldgen: {
            //     value: 0,
            //     multiplier: 1,
            //     formatted: 'Gold Gen'
            // }
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
        for(var stat in this.stats) {
            // Get the base stats from the champ and set them
            if(this.champion.stats.hasOwnProperty(stat)) {
                this.stats[stat].value = this.champion.stats[stat];
            } else { //Set the stats not included with champs
                this.stats[stat].value = 0;
            }
            this.stats[stat].multiplier = 1;
        }
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
                else if (getModifierType(modifier) === 'percent') {
                    this.stats[affectedStat].multiplier += (buffValue);
                }   
            }
            
        });
        for(var stat in this.stats) {
            this.stats[stat].value *= this.stats[stat].multiplier; 
        }
        
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
                // case "PercentDodgeMod": return '';                   DEPRECATED?
                case "FlatCritChanceMod": return 'crit'; 
                case "PercentCritChanceMod": return 'crit'; 
                case "FlatCritDamageMod": return 'critdamage'; 
                case "PercentCritDamageMod": return 'critdamage'; 
                // case "FlatBlockMod": return '';                      DEPRECATED?
                // case "PercentBlockMod": return '';                   DEPRECATED?
                case "FlatSpellBlockMod": return 'spellblock'; 
                case "PercentSpellBlockMod": return 'spellblock'; 
                // case "FlatEXPBonus": return '';                      DEPRECATED?
                // case "PercentEXPBonus": return '';                   DEPRECATED?
                // case "FlatEnergyRegenMod": return '';                DEPRECATED?
                // case "FlatEnergyPoolMod": return '';                 DEPRECATED?
                case "PercentLifeStealMod": return 'lifesteal'; 
                // case "PercentSpellVampMod": return '';               DEPRECATED?
            }
        }
    }

    
}