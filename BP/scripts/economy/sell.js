import { addMoney } from "./money";

export function sell(player, item) {
    if (sellableItems.hasOwnProperty(item?.typeId)) {
        const container = player.getComponent('inventory')?.container;
        container.setItem(player.selectedSlot, undefined)
        var money = sellableItems[item.typeId] * item.amount;
        addMoney(player, money, false);
        player.sendMessage(item.amount + " tane " + capitalizeEveryWord(item?.typeId) + " " + money + "TL'ye sattın.");
    } else {
        player.sendMessage("Bu eşya satılmıyor");
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

function translate(key) {
    return { "rawtext": [{ "translate": key }] };
};

const sellableItems = {
    "minecraft:grass": 10, "minecraft:stone": 5, "minecraft:diamond_block": 99
}