import { JsonDatabase } from "./../database/database";

const moneyDB = new JsonDatabase("moneyDatabase");
moneyDB.load();

export function getMoney(player) {
    return Number(moneyDB.get(player.name) ?? 0);
}

export function setMoney(player, money, sendMsg = true) {
    try {
        moneyDB.set(player.name, money);
        if (sendMsg) player.sendMessage(translate("setmoney.message", [money.toString()]));
        return;
    } catch (e) { console.warn(e); }

    if (sendMsg) player.sendMessage(translate("bir.hata.olustu"));
}

export function addMoney(player, money, sendMsg = true) {
    try {
        var oldMoney = getMoney(player);
        var newMoney = oldMoney + money;

        moneyDB.set(player.name, newMoney);
        if (sendMsg) player.sendMessage(translate("addmoney.message", [money.toString()]));
        return;
    } catch (e) { console.warn(e); }

    if (sendMsg) player.sendMessage(translate("bir.hata.olustu"));
}

export function removeMoney(player, money, sendMsg = true) {
    var oldMoney = getMoney(player);
    if (oldMoney >= money) {
        try {
            var newMoney = oldMoney - money;
            moneyDB.set(player.name, newMoney);
            if (sendMsg) player.sendMessage(translate("removemoney.message", [money.toString()]));
            return;
        } catch (e) { console.warn(e); }

        if (sendMsg) player.sendMessage(translate("bir.hata.olustu"));
    }

    if (sendMsg) player.sendMessage(translate("para.yetersiz"));
}

function translate(key, params) {
    if (params.length > 0) {
        return { "translate": key, "with": params };

    }
    return { "translate": key };
};