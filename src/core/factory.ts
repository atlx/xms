import {UniqueId, MessageType, IMessage, INotice, NoticeStyle} from "../types/types";
import Utils from "./utils";
import {MainApp} from "../index";

export default class Factory {
    public static createMessage(channelId: UniqueId, text: string): IMessage {
        // TODO: Fix everything (most is hard-coded)
        return {
            id: Utils.generateId(),

            // TODO
            authorAvatarHash: "",
            authorName: MainApp.me.username,
            sent: false,

            // TODO
            systemMessage: false,
            text,
            time: Date.now(),
            channelId,
            type: MessageType.Text,
            senderAddress: "unknown"
        };
    }

    public static createNotice(channelId: UniqueId, text: string, style: NoticeStyle = NoticeStyle.Success): INotice {
        return {
            channelId,
            id: Utils.generateId(),
            text,
            time: Date.now(),
            type: MessageType.Notice,
            style
        };
    }
}
