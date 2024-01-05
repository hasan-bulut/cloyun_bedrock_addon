import { world, system } from "@minecraft/server";
import { getMoney, setMoney, addMoney, removeMoney } from "./economy/money";
import { sell } from "./economy/sell";
import { commands_lang } from "./commands_lang";

const commandPrefix = "#";
const cmdPerm = "cmdPerm";

world.beforeEvents.chatSend.subscribe(event => {
    var sender = event.sender;
    var msg = event.message;

    if (msg.startsWith(commandPrefix)) {
        event.cancel = true;
        msg = msg.substring(1);
        var msgList = msg.split(" ");

        commands_lang.forEach(commands => {
            switch (msgList[0]) {
                case commands[0]: // #param
                    sender.sendMessage([{ "translate": "paran" }, { "text": getMoney(sender) + "TL" }]);
                    break;
                case commands[1]: // #paraayarla
                    if (!sender.getTags().includes(cmdPerm)) {
                        sender.sendMessage("bu komudu kullanma yetkin yok");
                        break;
                    }
                    var targetName = msgList[1];
                    if (targetName == "@s") {
                        setMoney(sender, Number(msgList[2]));
                    } else if (targetName == "@a") {
                        world.getAllPlayers().forEach(player => {
                            setMoney(player, Number(msgList[2]));
                        });
                    }
                    else {
                        if (world.getAllPlayers().some(player => player.name === targetName)) {
                            setMoney(world.getPlayers({ name: targetName })[0], Number(msgList[2]));
                        } else {
                            sender.sendMessage(translate("bu.oyuncu.aktif.degil"));
                        }
                    }
                    break;
                case commands[2]: // #paraekle
                    if (!sender.getTags().includes(cmdPerm)) {
                        sender.sendMessage("bu komudu kullanma yetkin yok");
                        break;
                    }
                    var targetName = msgList[1];
                    if (targetName == "@s") {
                        addMoney(sender, Number(msgList[2]));
                    } else if (targetName == "@a") {
                        world.getAllPlayers().forEach(player => {
                            addMoney(player, Number(msgList[2]));
                        });
                    }
                    else {
                        if (world.getAllPlayers().some(player => player.name === targetName)) {
                            addMoney(world.getPlayers({ name: targetName })[0], Number(msgList[2]));
                        } else {
                            sender.sendMessage(translate("bu.oyuncu.aktif.degil"));
                        }
                    }
                    break;
                case commands[3]: // #parasil
                    if (!sender.getTags().includes(cmdPerm)) {
                        sender.sendMessage("bu komudu kullanma yetkin yok");
                        break;
                    }
                    var targetName = msgList[1];
                    if (targetName == "@s") {
                        removeMoney(sender, Number(msgList[2]));
                    } else if (targetName == "@a") {
                        world.getAllPlayers().forEach(player => {
                            removeMoney(player, Number(msgList[2]));
                        });
                    }
                    else {
                        if (world.getAllPlayers().some(player => player.name === targetName)) {
                            removeMoney(world.getPlayers({ name: targetName })[0], Number(msgList[2]));
                        } else {
                            sender.sendMessage(translate("bu.oyuncu.aktif.degil"));
                        }
                    }
                    break;
                case commands[4]: // #paragonder
                    var playerName = msgList[1];
                    var amount = msgList[2];
                    if (world.getAllPlayers().some(player => player.name === playerName)) {
                        var targetPlayer = world.getPlayers({ name: playerName })[0];
                        removeMoney(sender, Number(amount), false);
                        addMoney(targetPlayer, Number(amount), false);
                        sender.sendMessage(targetPlayer.name + " kişisine " + amount + "TL gönderildi.");
                        targetPlayer.sendMessage(sender.name + ", sana " + amount + "TL gönderdi.");
                    } else {
                        sender.sendMessage(translate("bu.oyuncu.aktif.degil"));
                    }
                    break;
                case commands[5]: // #satel
                    const container = sender.getComponent('inventory')?.container;
                    const item = container.getItem(sender.selectedSlot);
                    system.run(() => {
                        sell(sender, item);
                    });
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