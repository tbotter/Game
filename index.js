var formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

let loop;
var player = {
    c: new Decimal(0), //Currency
    gainC: new Decimal(1), //Amount of currency added per monster kill
    d: new Decimal(0), //Damage
    dps: new Decimal(0), //Damage per second
    gainDPS: new Decimal(1), //DPS gained per upgrade
    gainDamage: new Decimal(1), //actual damage gained per upgrade
    upgrade1: new Decimal(20), 
};

var monster = {
    h: new Decimal(15), //Health
    nr: 1,   //Number
    maxHealth: new Decimal(15),
    healthScaling: new Decimal(1.70),
    zone: 1,    //Zone the player is on
    current: 1,     //Current monster the player is on in a zone
    maxperzone: 10  //Monsters the player has to kill to move up a zone
};

window.onload = function updatecount() {
    loop = setInterval(() => {
        textUpdate();
        render();
    }, 30);
        
}

function textUpdate() {
    if (player.d.lessThanOrEqualTo(0))
        document.getElementById("increaseDamage").innerHTML = "Upgrade your damage for free!";
    else
    document.getElementById("increaseDamage").innerHTML = "Increase your damage by " + player.gainDamage + " for 1 Idle PointTM.";
    document.getElementById("Zone").innerHTML = "Zone: " + monster.zone + " (" + monster.current + "/" + monster.maxperzone + ")";
    document.getElementById("mainDamage").innerHTML = "You deal " + player.dps + " damage per second.";
    document.getElementById("mainMoney").innerHTML = "You have " + player.c + " Idle PointsTM.";
    document.getElementById("mainEnemy").innerHTML = "Monster #" + monster.nr + " has " + monster.h.toPrecision(5) + " health.";
    document.getElementById("upgrade1").innerHTML = "Double your damage. Cost: (" + player.upgrade1 + ")";
}

function render() {
    monster.h = monster.h.minus(player.d); //Health minus Damage
    monsterLoop();
}

function monsterLoop() {
    if (monster.h.lessThanOrEqualTo(0)) {
        monster.h = monster.maxHealth;
        monster.nr += 1;
        monster.current += 1;
        player.c = player.c.plus(player.gainC);
        if (monster.nr > monster.maxperzone)    //No Decimal numbers
            {
            monster.maxHealth = new Decimal(15);
            for (i = 1; i <= monster.zone; i++)
                monster.maxHealth = monster.maxHealth.times(monster.healthScaling);
            monster.h = monster.maxHealth;
            monster.zone += 1;
            monster.nr = 1;
            monster.current = 1;
            }
    }
}

function buyDamage() {
    if (player.d.equals(0)) {
        player.d = player.d.plus(player.gainDamage/32);
        player.dps = player.dps.plus(player.gainDPS);
    }
    if (player.c.greaterThan(0)) {
        player.c = player.c.minus(1);
        player.d = player.d.plus(player.gainDamage/32);
        player.dps = player.dps.plus(player.gainDPS);
    }
}

function upgradeDamage() {
    if (player.c.greaterThanOrEqualTo(player.upgrade1)) {
        player.c = player.c.minus(player.upgrade1);
        player.dps = player.dps.times(2);
        player.d = player.d.times(2);
        player.gainDamage = player.gainDamage.times(2);
        player.gainDPS = player.gainDPS.times(2);
        player.upgrade1 = player.upgrade1.times(2);
    }
}