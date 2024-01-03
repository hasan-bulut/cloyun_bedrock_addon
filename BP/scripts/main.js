import { world, system } from "@minecraft/server";
import { getMoney, setMoney, addMoney, removeMoney } from "./economy/money";

const commandPrefix = "#";

world.beforeEvents.chatSend.subscribe(event => {
    var sender = event.sender;
    var msg = event.message;

    if (msg.startsWith(commandPrefix)) {
        event.cancel = true;
        msg = msg.substring(1);
        var msgList = msg.split(" ");

        switch (msgList[0]) {
            case "param":
                sender.sendMessage("Paran: " + getMoney(sender.name) + "TL");
                break;
            case "paraayarla":
                sender.sendMessage(setMoney(sender.name, Number(msgList[1])));
                break;
            case "paraekle":
                sender.sendMessage(addMoney(sender.name, Number(msgList[1])));
                break;
            case "parasil":
                sender.sendMessage(removeMoney(sender.name, Number(msgList[1])));
                break;
            case "paragonder":
                var playerName = msgList[1];
                var amount = msgList[2];
                if (world.getAllPlayers.some(player => player.name === playerName)) {
                    var targetPlayer = world.getPlayers({ name: playerName })[0];
                    sender.sendMessage(removeMoney(sender.name, Number(amount)));
                    targetPlayer.sendMessage(addMoney(targetPlayer.name, Number(amount)));
                } else {
                    sender.sendMessage("Bu oyuncu aktif değil!");
                }
                break;
        }
    }
});
