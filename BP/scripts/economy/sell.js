import { addMoney } from "./money";

export function sellHand(player, container) {
    const item = container.getItem(player.selectedSlot);
    if (sellableItems.hasOwnProperty(item?.typeId)) {
        const container = player.getComponent('inventory')?.container;
        container.setItem(player.selectedSlot, undefined)
        var money = sellableItems[item.typeId] * item.amount;
        addMoney(player, money, false);
        player.sendMessage(translate("sell.message", [item.amount.toString(), capitalizeEveryWord(item?.typeId), money.toString()]));
    } else {
        player.sendMessage(translate("bu.esya.satilmiyor"));
    }
}

export function sellAll(player, container) {
    var selledItemCount = 0;
    var totalMoney = 0;
    for (let i = 0; i < 36; i++) {
        const item = container.getItem(i);
        if (sellableItems.hasOwnProperty(item?.typeId)) {
            const container = player.getComponent('inventory')?.container;
            container.setItem(i, undefined)
            var money = sellableItems[item.typeId] * item.amount;
            addMoney(player, money, false);
            player.sendMessage(translate("sell.message", [item.amount.toString(), capitalizeEveryWord(item?.typeId), money.toString()]));
            selledItemCount++;
            totalMoney += money;
        }
    }
    if (selledItemCount > 0) {
        player.sendMessage(selledItemCount + " tane eşya satıldı. Toplam " + totalMoney + "TL kazandınız.");
    } else {
        player.sendMessage("Envanterinizde satılabilecek eşya bulunmuyor.");
    }
}

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
};

const sellableItems = {
    "minecraft:grass": 10, "minecraft:stone": 5, "minecraft:diamond_block": 99
}