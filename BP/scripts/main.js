import { world, system } from "@minecraft/server";
import { getMoney, setMoney, addMoney, removeMoney } from "./economy/money";
import { sell } from "./economy/sell";
import { commands_lang } from "./commands_lang";

const commandPrefix = "#";

world.afterEvents.chatSend.subscribe(event => {
    var sender = event.sender;
    var msg = event.message;

    if (msg.startsWith(commandPrefix)) {
        // event.cancel = true;
        msg = msg.substring(1);
        var msgList = msg.split(" ");

        commands_lang.forEach(commands => {
            switch (msgList[0]) {
                case commands[0]: // #param
                    sender.sendMessage([{ "translate": "paran" }, { "text": getMoney(sender) + "TL" }]);
                    break;
                case commands[1]: // #paraayarla
                    setMoney(sender, Number(msgList[1]));
                    break;
                case commands[2]: // #paraekle
                    addMoney(sender, Number(msgList[1]));
                    break;
                case commands[3]: // #parasil
                    removeMoney(sender, Number(msgList[1]));
                    break;
                case commands[4]: // #paragonder
                    var playerName = msgList[1];
                    var amount = msgList[2];
                    if (world.getAllPlayers.some(player => player.name === playerName)) {
                        var targetPlayer = world.getPlayers({ name: playerName })[0];
                        removeMoney(sender, Number(amount));
                        addMoney(targetPlayer, Number(amount));
                    } else {
                        sender.sendMessage(translate("bu.oyuncu.aktif.degil"));
                    }
                    break;
                case commands[5]: // #satel
                    const container = sender.getComponent('inventory')?.container;
                    const item = container.getItem(sender.selectedSlot);
                    sell(sender, item);
                    break;
                case commands[6]: // #sathepsi

                    break;
            }
        })
    }
});

function translate(key) {
    return { "translate": key };
};