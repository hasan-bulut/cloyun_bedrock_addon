import { system, world } from "@minecraft/server";
import { addMoney } from "./money";
import { JsonDatabase } from "./../database/database";

const sellableItemsDB = new JsonDatabase("sellableItem").load();

const autoSellDB = new JsonDatabase("autoSell").load();

export function sellHand(player) {
    const container = player.getComponent('inventory')?.container;
    const item = container.getItem(player.selectedSlot);
    if (sellableItemsDB.has(item?.typeId)) {
        const container = player.getComponent('inventory')?.container;
        container.setItem(player.selectedSlot, undefined)
        var money = sellableItemsDB.get(item.typeId) * item.amount;
        addMoney(player, money, false);
        player.sendMessage(translate("sell.message", [item.amount.toString(), capitalizeEveryWord(item?.typeId), money.toString()]));
    } else {
        player.sendMessage(translate("bu.esya.satilmiyor"));
    }
}

export function sellAll(player) {
    var selledItemCount = 0;
    var totalMoney = 0;
    const container = player.getComponent('inventory')?.container;
    for (let i = 0; i < 36; i++) {
        const item = container.getItem(i);
        if (sellableItemsDB.has(item?.typeId)) {
            const container = player.getComponent('inventory')?.container;
            container.setItem(i, undefined)
            var money = sellableItemsDB.get(item.typeId) * item.amount;
            addMoney(player, money, false);
            player.sendMessage(translate("sell.message", [item.amount.toString(), capitalizeEveryWord(item?.typeId), money.toString()]));
            selledItemCount += item.amount;
            totalMoney += money;
        }
    }
    if (selledItemCount > 0) {
        player.sendMessage(translate("sellall.message", [selledItemCount.toString(), totalMoney.toString()]));
    } else {
        player.sendMessage(translate("envanterinizde.satilabilecek.esya.bulunmuyor"));
    }
}

export function addSell(player, price) {
    sellableItemsDB.load();
    const container = player.getComponent('inventory')?.container;
    const item = container.getItem(player.selectedSlot);
    if (item?.typeId) {
        sellableItemsDB.set(item.typeId, price);
        player.sendMessage(capitalizeEveryWord(item.typeId) + " satılabilecek eşyalar listesine " + price + "TL olarak eklendi.");
    } else {
        player.sendMessage("Elinizde eşya bulunmuyor.");
    }
}

export function delSell(player) {
    const container = player.getComponent('inventory')?.container;
    const item = container.getItem(player.selectedSlot);
    if (item?.typeId) {
        sellableItemsDB.delete(item.typeId);
        player.sendMessage(capitalizeEveryWord(item.typeId) + " satılabilecek eşyalar listesinden çıkartıldı.");
    } else {
        player.sendMessage("Elinizde eşya bulunmuyor.");
    }
}

export function autoSell(player, status) {
    const container = player.getComponent('inventory')?.container;
    const item = container.getItem(player.selectedSlot);
    if (sellableItemsDB.has(item?.typeId)) {
        var data = autoSellDB.get(player.name) ?? {};
        data[item?.typeId] = status;
        autoSellDB.set(player.name, data);
        player.sendMessage(capitalizeEveryWord(item?.typeId) + " için otomatik satma " + status.toString() + " olarak ayarlandı.");
    } else {
        player.sendMessage(translate("bu.esya.satilmiyor"));
    }
}

system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
        const container = player.getComponent('inventory')?.container;
        for (let i = 0; i < 36; i++) {
            const item = container.getItem(i);
            if (autoSellDB.get(player.name)[item?.typeId] && item.amount == item.maxAmount) {
                const container = player.getComponent('inventory')?.container;
                container.setItem(i, undefined)
                var money = sellableItemsDB.get(item.typeId) * item.amount;
                addMoney(player, money, false);
                player.sendMessage(translate("sell.message", [item.amount.toString(), capitalizeEveryWord(item?.typeId), money.toString()]));
            }
        }
    });
}, 20)

function capitalizeEveryWord(itemName) {
    itemName = itemName.replace("minecraft:", "");
    var sentence = itemName.replace("_", " ");
    let words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    let capitalizedSentence = words.join(" ");
    return capitalizedSentence;
}

function translate(key, params) {
    if (params?.length > 0) {
        return { "translate": key, "with": params };

    }
    return { "translate": key };
}