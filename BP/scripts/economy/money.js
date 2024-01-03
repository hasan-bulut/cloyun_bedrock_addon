import { JsonDatabase } from "./../database/database";

const moneyDB = new JsonDatabase("moneyDatabase");
moneyDB.load();

export function getMoney(playerName) {
    return Number(moneyDB.get(playerName)) ?? 0;
}

export function setMoney(playername, money) {
    try {
        moneyDB.set(playername, money);
        return "§aBaşarıyla Ayarlandı.";
    } catch (e) { console.log(e); }

    return "§cBir Hata Oluştu!";
}

export function addMoney(playername, money) {
    try {
        var oldMoney = getMoney(playername);
        var newMoney = oldMoney + money;

        setMoney(playername, newMoney);
        return "§aBaşarıyla Eklendi.";
    } catch (e) { console.log(e); }

    return "§cBir Hata Oluştu!";
}

export function removeMoney(playername, money) {
    var oldMoney = getMoney(playername);
    if (oldMoney >= money) {
        try {
            var newMoney = oldMoney - money;
            setMoney(playername, newMoney);
            return "§aBaşarıyla Silindi.";
        } catch (e) { console.log(e); }

        return "§cBir Hata Oluştu!";
    }

    return "§cPara Yetersiz!";
}
