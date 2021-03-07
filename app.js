const WebSocket = require("ws");

const ChannelManager = require("./src/models/ChannelManager");
const IncommingMessage = require("./src/models/IncommingMessage");

const wss = new WebSocket.Server({ port: 3005 });

console.log("starting server on port 3005");

const channelManager = new ChannelManager();

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(message);
        const incommingMessage = new IncommingMessage(message);
        try {
            if (incommingMessage.type === 0) {
                channelManager.processIncommingChannelItem(
                    incommingMessage.body,
                    ws
                );
                ws.send(
                    JSON.stringify({
                        type: 0,
                        channels: channelManager.channels,
                        channelItemList: channelManager.channelItemList,
                    })
                );
            } else if (incommingMessage.type === 1) {
                incommingMessage.body.channelIds.forEach((channelId) => {
                    const channel = channelManager.channels.find(
                        (c) => c.channelId === channelId
                    );
                    if (channel) {
                        channel.channelItems.forEach((channelItem) => {
                            channelItem.ws.send(incommingMessage.body.csv);
                        });
                    }
                });
            } else if (incommingMessage.type === 2) {
                ws.send("Connected to Server");
            }
        } catch {
            ws.send("Your Message is not allowed");
        }
    });
});

// TODO: Deal with disconnect
// TODO: Deal with spots deads
