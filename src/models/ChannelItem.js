class ChannelItem {
    taxiId;

    ws;

    channelIds = [];

    constructor(taxiId, channelIds, ws) {
        this.taxiId = taxiId;
        this.channelIds = channelIds;
        this.ws = ws;
    }
}

module.exports = ChannelItem;
