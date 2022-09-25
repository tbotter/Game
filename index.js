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

    upgrade1: new Decimal(20), 
};
const healthScaling = 1.70;
var monster = {
    h: new Decimal(15), //Health
    nr: 1,   //Number
    maxHealth: new Decimal(15),
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
    if (player.d != '0')
        document.getElementById("increaseDamage").innerHTML = "Upgrade your damage with 1 Idle PointTM.";
    document.getElementById("Zone").innerHTML = "Zone: " + monster.zone + " (" + monster.current + "/" + monster.maxperzone + ")";
    document.getElementById("mainDamage").innerHTML = "You deal " + player.dps + " damage per second.";
    document.getElementById("mainMoney").innerHTML = "You have " + player.c + " Idle PointsTM.";
    document.getElementById("mainEnemy").innerHTML = "Monster #" + monster.nr + " has " + formatter.format(monster.h) + " health.";
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
            monster.maxHealth = 15;
            for (i = 1; i <= monster.zone; i++)
                monster.maxHealth = monster.maxHealth.times(healthScaling);
            monster.h = monster.maxHealth;
            monster.zone += 1;
            monster.nr = 1;
            monster.current = 1;
            }
    }
}

function buyDamage() {
    if (player.d.equals(0)) {
        player.d = player.d.plus(1/32);
        player.dps = player.dps.plus(1);
    }
    if (player.c.greaterThan(0)) {
        player.c = player.c.minus(1);
        player.d = player.d.plus(1/32);
        player.dps = player.dps.plus(1);
    }
}

function upgradeDamage() {
    if (player.c >= player.upgrade1) {
        player.c = player.c.minus(player.upgrade1);
        player.d = player.d.times(2);
        player.dps = player.dps.times(2);
        player.upgrade1 = player.upgrade1.multi(2);
    }
}