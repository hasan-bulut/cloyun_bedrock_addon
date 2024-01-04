import { JsonDatabase } from "./../database/database";

const moneyDB = new JsonDatabase("moneyDatabase");
moneyDB.load();

export function getMoney(player) {
    return Number(moneyDB.get(player.name)) ?? 0;
}

export function setMoney(player, money) {
    try {
        moneyDB.set(player.name, money);
        player.sendMessage(translate("basariyla.ayarlandi"));
        return;
    } catch (e) { console.warn(e); }

    player.sendMessage(translate("bir.hata.olustu"));
}

export function addMoney(player, money) {
    try {
        var oldMoney = getMoney(player);
        var newMoney = oldMoney + money;

        moneyDB.set(player.name, newMoney);
        player.sendMessage(translate("basariyla.eklendi"));
        return;
    } catch (e) { console.warn(e); }

    player.sendMessage(translate("bir.hata.olustu"));
}

export function removeMoney(player, money) {
    var oldMoney = getMoney(player);
    if (oldMoney >= money) {
        try {
            var newMoney = oldMoney - money;
            moneyDB.set(player.name, newMoney);
            player.sendMessage(translate("basariyla.silindi"));
            return;
        } catch (e) { console.warn(e); }

        player.sendMessage(translate("bir.hata.olustu"));
    }

    player.sendMessage(translate("para.yetersiz"));
}

function translate(key) {
    return { "rawtext": [{ "translate": key }] };
};