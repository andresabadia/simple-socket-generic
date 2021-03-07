class IncommingMessage {
    type;

    body;

    constructor(incommingMessage) {
        const incommingMessageObject = JSON.parse(incommingMessage);
        Object.assign(this, incommingMessageObject);
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
