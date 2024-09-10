const Keywords = {
    "action advanced": {
        "name": "Action advanced",
        "description": "Reduces the target's waiting interval before the next action."
    },
    "action delayed": {
        "name": "Action delayed",
        "description": "Increases the target's waiting interval before the next action."
    },
    "additional dmg": {
        "name": "Additional DMG",
        "description": "Causes the target being hit to take extra DMG, which is not considered an attack."
    },
    "base chance": {
        "name": "Base Chance",
        "description": "The base chance of applying debuffs to targets hit.<br />The final probability is affected by the attacker's Effect Hit Rate and enemy targets' Effect RES."
    },
    "break dmg": {
        "name": "Break DMG",
        "description": "Break DMG increases with higher Break Effect, higher target max Toughness, and higher character levels.<br />Break DMG cannot CRIT hit and is not affected by DMG Boost effects."
    },
    "buff": {
        "name": "Buff",
        "description": "Can buff combat ability for a period of time, which can be dispelled unless otherwise specified."
    },
    "counter": {
        "name": "Counter",
        "description": "An effect that automatically triggers when the target is attacked, which unleashes an extra attack on the attacker.<br />Counter is also considered a follow-up attack."
    },
    "crowd control debuff": {
        "name": "Crowd Control debuff",
        "description": "Frozen, Entanglement, Imprisonment, Dominated, Outrage, Strong Reverberation, and Alien Dream."
    },
    "debuff": {
        "name": "Debuff",
        "description": "Debuffs are negative status effects that render units weaker. Unless otherwise specified, debuffs can be dispelled."
    },
    "departed": {
        "name": "Departed",
        "description": "Ally units in the Departed state cannot be designated as ability targets and will not appear in the Action Order."
    },
    "distribute": {
        "name": "Distribute",
        "description": "Before DMG is calculated, distribute a part of the attacking unit's DMG to another target (or multiple other targets), with the target hit by the attack taking the rest of the DMG. DMG distributed to other targets cannot be distributed again."
    },
    "downed state": {
        "name": "Downed State",
        "description": "An ally will be incapacitated once their HP is reduced to 0."
    },
    "extra turn": {
        "name": "Extra Turn",
        "description": "Gain 1 extra turn that won't expend your remaining turns when taking action.<br />During this extra turn, no Ultimate can be used."
    },
    "fixed chance": {
        "name": "Fixed Chance",
        "description": "Fixed chance will not be affected by any factor."
    },
    "follow up attack": {
        "name": "Follow-Up Attack",
        "description": "Unleashes an extra attack on the target. This effect is triggered automatically when requirements are met."
    },
    "res pen": {
        "name": "RES PEN",
        "description": "When dealing DMG, ignore a part of the enemy target's resistance to the corresponding damage type."
    },
    "super break dmg": {
        "name": "Super Break DMG",
        "description": "Super Break DMG increases with higher Break Effect, higher Toughness Reduction of the attack, and higher character levels.<br />Super Break DMG cannot CRIT hit and is not affected by DMG Boost effects."
    },
    "weakness break state": {
        "name": "Weakness Break State",
        "description": "When enemy targets' Toughness is reduced to 0, they will enter the Weakness Break State, which delays their actions."
    }
}

export default Keywords;