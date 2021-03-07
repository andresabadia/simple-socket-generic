const Channel = require("./Channel");
const ChannelItem = require("./ChannelItem");

class ChannelManager {
    channels = [];

    channelItemList = [];

    constructor() {}

    processIncommingChannelItem(channelItemMessage, ws) {
        const itemIndex = this.channelItemList.findIndex(
            (ci) => ci.taxiId === channelItemMessage.taxiId
        );
        if (itemIndex < 0) {
            const channelItem = new ChannelItem(
                channelItemMessage.taxiId,
                channelItemMessage.channelIds,
                ws
            );
            this.channelItemList.push(channelItem);
            channelItemMessage.channelIds.forEach((channelId) => {
                this.addToChannel(channelId, channelItem);
            });
        } else {
            const item = this.channelItemList[itemIndex];
            const positiveDelta = this.calculatePositiveDelta(
                item.channelIds,
                channelItemMessage.channelIds
            );
            const negativeDelta = this.calculateNegativeDelta(
                item.channelIds,
                channelItemMessage.channelIds
            );
            if (positiveDelta) {
                positiveDelta.forEach((pId) => {
                    this.addToChannel(pId, channelItemMessage);
                });
            }
            if (negativeDelta) {
                negativeDelta.forEach((nId) => {
                    this.removeFromChannel(nId, channelItemMessage);
                });
            }
            this.channelItemList[itemIndex].channelIds =
                channelItemMessage.channelIds;
        }
    }

    calculatePositiveDelta(oldChannelIds, incommingChannelIds) {
        const delta = incommingChannelIds.filter(
            (channelIds) => !oldChannelIds.includes(channelIds)
        );
        return delta;
    }

    calculateNegativeDelta(oldChannelIds, incommingChannelIds) {
        const delta = oldChannelIds.filter(
            (channelIds) => !incommingChannelIds.includes(channelIds)
        );
        return delta;
    }

    addToChannel(channelId, channelItem) {
        const index = this.channels.findIndex((c) => c.channelId === channelId);
        if (index >= 0) {
            // item exits in channel
            this.channels[index].addItem(channelItem);
        } else {
            // create Channel and add item
            const channel = new Channel(channelId);
            channel.addItem(channelItem);
            this.channels.push(channel);
        }
    }

    removeFromChannel(channelId, channelItem) {
        const index = this.channels.findIndex((c) => c.channelId === channelId);
        if (index) {
            // item exits in channel
            this.channels[index].removeItem(channelItem);
        }
    }
}

module.exports = ChannelManager;
