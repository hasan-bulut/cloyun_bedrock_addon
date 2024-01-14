import { world, system } from "@minecraft/server";
import { getMoney, setMoney, addMoney, removeMoney } from "./economy/money";
import { sellHand, sellAll, addSell, delSell, autoSell } from "./economy/sell";
import { repair } from "./general/repair";
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
                    sender.sendMessage(translate("paran", [getMoney(sender).toString()]));
                    break;
                case commands[1]: // #paraayarla
                    if (!sender.getTags().includes(cmdPerm)) {
                        sender.sendMessage(translate("bu.komudu.kullanma.iznin.yok"));
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
                        sender.sendMessage(translate("bu.komudu.kullanma.iznin.yok"));
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
                        sender.sendMessage(translate("bu.komudu.kullanma.iznin.yok"));
                        break;
                    }
                    var targetName = msgList[1];
                    if (targetName == "@s") {
                        removeMoney(sender, Number(msgList[2]));
                    } else {
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
                        sender.sendMessage(translate("para.gonderildi", [targetPlayer.name, amount.toString()]));
                        targetPlayer.sendMessage(translate("para.gonderdi", [sender.name, amount.toString()]));
                    } else {
                        sender.sendMessage(translate("bu.oyuncu.aktif.degil"));
                    }
                    break;
                case commands[5]: // #satel
                    system.run(() => {
                        sellHand(sender);
                    });
                    break;
                case commands[6]: // #sathepsi
                    system.run(() => {
                        sellAll(sender);
                    });
                    break;
                case commands[7]: // #satekle
                    if (!sender.getTags().includes(cmdPerm)) {
                        sender.sendMessage(translate("bu.komudu.kullanma.iznin.yok"));
                        break;
                    }
                    var price = msgList[1];
                    addSell(sender, Number(price));
                    break;
                case commands[8]: // #satsil
                    if (!sender.getTags().includes(cmdPerm)) {
                        sender.sendMessage(translate("bu.komudu.kullanma.iznin.yok"));
                        break;
                    }
                    delSell(sender);
                    break;
                case commands[9]: // #otosat
                    var status = msgList[1];
                    if (status == "true") {
                        autoSell(sender, true);
                    } else if (status == "false") {
                        autoSell(sender, false);
                    } else {
                        sender.sendMessage(translate("otosat.msg"));
                    }
                    break;
                case commands[10]: // #tamir
                    system.run(() => {
                        repair(sender);
                    });
                    break;
            }
        })
    }
});

function translate(key, params) {
    if (params?.length > 0) {
        return { "translate": key, "with": params };

    }
    return { "translate": key };
};