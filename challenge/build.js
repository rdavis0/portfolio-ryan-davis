export default class Build {
    constructor() {
        this.champion = null;
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
            magicresist: {
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
            lethality: {
                value: 0,
                multiplier: 1,
                formatted: 'Lethality'
            },
            lifesteal: {
                value: 0,
                multiplier: 1,
                formatted: 'Life Steal'
            },
            magicpen: {
                value: 0,
                multiplier: 1,
                formatted: 'Magic Penetration'
            },
            omnivamp: {
                value: 0,
                multiplier: 1,
                formatted: 'Omnivamp'
            },
            physvamp: {
                value: 0,
                multiplier: 1,
                formatted: 'Physical Vamp'
            },
            healshieldpower: {
                value: 0,
                multiplier: 1,
                formatted: 'Heal & Shield Power'
            },
            tenacity: {
                value: 0,
                multiplier: 1,
                formatted: 'Tenacity'
            },
            slowresist: {
                value: 0,
                multiplier: 1,
                formatted: 'Slow Resist'
            },
            abilityhaste: {
                value: 0,
                multiplier: 1,
                formatted: 'Ability Haste'
            },
            energy: {
                value: 0,
                multiplier: 1,
                formatted: 'Energy'
            },
            energyregen: {
                value: 0,
                multiplier: 1,
                formatted: 'Energy Regen'
            },
            goldgen: {
                value: 0,
                multiplier: 1,
                formatted: 'Gold Gen'
            }
        };
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
        this.stats.armorpen.value = 0;
        this.stats.lethality.value = 0;
        this.stats.lifesteal.value = 0;
        this.stats.magicpen.value = 0; 
        this.stats.omnivamp.value = 0;
        this.stats.physvamp.value = 0;
        this.stats.healshieldpower.value = 0;
        this.stats.tenacity.value = 0;
        this.stats.slowresist.value = 0; 
        this.stats.abilityhaste.value = 0;
        this.stats.energy.value = 0;
        this.stats.energyregen.value = 0;
        this.stats.goldgen.value = 0;
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
                case "FlatSpellBlockMod": return 'magicresist'; 
                case "PercentSpellBlockMod": return 'magicresist'; 
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