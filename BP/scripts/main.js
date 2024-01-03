import { world, system } from "@minecraft/server";

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
                break;
            case "paraayarla":
                break;
            case "paraekle":
                break;
            case "parasil":
                break;
            case "paragonder":
                break;
        }
    }
});
