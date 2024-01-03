import { world, system } from "@minecraft/server";
import { getMoney, setMoney, addMoney, removeMoney } from "./economy/money";
import { commands_lang } from "./commands_lang";

const commandPrefix = "#";

world.beforeEvents.chatSend.subscribe(event => {
    var sender = event.sender;
    var msg = event.message;

    if (msg.startsWith(commandPrefix)) {
        event.cancel = true;
        msg = msg.substring(1);
        var msgList = msg.split(" ");

        commands_lang.forEach(commands => {
            switch (msgList[0]) {
                case commands[0]:
                    sender.sendMessage([{ "translate": "paran" }, { "text": getMoney(sender.name) + "TL" }]);
                    break;
                case commands[1]:
                    sender.sendMessage(setMoney(sender.name, Number(msgList[1])));
                    break;
                case commands[2]:
                    sender.sendMessage(addMoney(sender.name, Number(msgList[1])));
                    break;
                case commands[3]:
                    sender.sendMessage(removeMoney(sender.name, Number(msgList[1])));
                    break;
                case commands[4]:
                    var playerName = msgList[1];
                    var amount = msgList[2];
                    if (world.getAllPlayers.some(player => player.name === playerName)) {
                        var targetPlayer = world.getPlayers({ name: playerName })[0];
                        sender.sendMessage(removeMoney(sender.name, Number(amount)));
                        targetPlayer.sendMessage(addMoney(targetPlayer.name, Number(amount)));
                    } else {
                        sender.sendMessage(translate("bu.oyuncu.aktif.degil"));
                    }
                    break;
            }
        })
    }
});

function translate(key) {
    return { "translate": key };
};