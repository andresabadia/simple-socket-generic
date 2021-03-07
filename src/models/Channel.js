class Channel {
    channelId;

    channelItems = [];

    constructor(channelId) {
        this.channelId = channelId;
    }

    addItem(channelItem) {
        this.channelItems.push(channelItem);
    }

    removeItem(channelItem) {
        const index = this.channelItems.findIndex(
            (item) => item.taxiId === channelItem.taxiId
        );
        if (index >= 0) {
            this.channelItems.splice(index, 1);
        }
    }

    // updateItem(channelItem) {
    //     if (!this.channelItems) {
    //         this.addItem(channelItem);
    //     } else {
    //         const index = this.channelItems.findIndex(
    //             (item) => item.taxiId === channelItem.taxiId
    //         );
    //         if (index) {
    //             this.channelItems[index] = channelItem;
    //         }
    //     }
    // }
}

module.exports = Channel;
