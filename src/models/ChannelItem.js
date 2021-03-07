class ChannelItem {
    taxiId;

    ws;

    channelIds = [];

    constructor(taxiId, channelIds, ws) {
        this.taxiId = taxiId;
        this.ws = ws;
    }
}

module.exports = ChannelItem;
