import { ItemStack } from "@minecraft/server";
import { removeMoney } from "./../economy/money";

export function repair(player) {
    const container = player.getComponent('inventory')?.container;
    const item = container.getItem(player.selectedSlot);
    var damage = item.getComponent('durability')?.damage;
    if (damage > 0) {
        var newItem = new ItemStack(item.typeId, item.amount);
        newItem.nameTag = item.nameTag;
        newItem.getComponents = item.getComponents;
        newItem.setLore(item.getLore());
        newItem.getComponent('enchantments').enchantments = item.getComponent('enchantments').enchantments;

        container.setItem(player.selectedSlot, newItem);
        removeMoney(player, damage * 3, false);
        player.sendMessage(translate("tamir.edildi", [(damage * 3).toString()]));
    } else if (damage == 0) {
        player.sendMessage(translate("hasar.bulunmuyor"));
    } else {
        player.sendMessage(translate("tamir.edilemez"));
    }
}

function translate(key, params) {
    if (params?.length > 0) {
        return { "translate": key, "with": params };

    }
    return { "translate": key };
}