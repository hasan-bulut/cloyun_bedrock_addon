import { JsonDatabase } from "./../database/database";

const moneyDB = new JsonDatabase("moneyDatabase");
moneyDB.load();

export function getMoney(playerName) {
    return Number(moneyDB.get(playerName)) ?? 0;
}

export function setMoney(playername, money) {
    try {
        moneyDB.set(playername, money);
        return translate("basariyla.ayarlandi");
    } catch (e) { console.log(e); }

    return translate("bir.hata.olustu");
}

export function addMoney(playername, money) {
    try {
        var oldMoney = getMoney(playername);
        var newMoney = oldMoney + money;

        setMoney(playername, newMoney);
        return translate("basariyla.eklendi");
    } catch (e) { console.log(e); }

    return translate("bir.hata.olustu");
}

export function removeMoney(playername, money) {
    var oldMoney = getMoney(playername);
    if (oldMoney >= money) {
        try {
            var newMoney = oldMoney - money;
            setMoney(playername, newMoney);
            return translate("basariyla.silindi");
        } catch (e) { console.log(e); }

        return translate("bir.hata.olustu");
    }

    return translate("para.yetersiz");
}

function translate(key) {
    return { "rawtext": [{ "translate": key }] };
};