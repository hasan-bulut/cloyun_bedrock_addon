import { addMoney } from "./money";

export function sell(player, item) {
    if (sellableItems.hasOwnProperty(item?.typeId)) {
        const container = player.getComponent('inventory')?.container;
        container.setItem(player.selectedSlot, undefined)
        addMoney(player, sellableItems[item.typeId] * item.amount);
    } else {
        player.sendMessage("Bu eşya satılmıyor");
    }
}

function translate(key) {
    return { "rawtext": [{ "translate": key }] };
};

const sellableItems = {
    "minecraft:grass": 10, "minecraft:stone": 5
}