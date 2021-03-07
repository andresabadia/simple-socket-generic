class IncommingMessage {
    type;

    body;

    constructor(incommingMessage) {
        if (this.isJsonString(incommingMessage)) {
            const incommingMessageObject = JSON.parse(incommingMessage);
            Object.assign(this, incommingMessageObject);
        } else {
            console.log(incommingMessage);
        }
    }

    isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

module.exports = IncommingMessage;
