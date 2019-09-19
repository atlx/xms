import Util from "./util";
import {UniqueId} from "@/models/misc";
import {ITextMessage, MessageType, NoticeStyle, INotice, IGenericMessage} from "@/models/message";
import {app} from "@/index";

export default class Factory {
    public static createMessage(channelId: UniqueId, text: string): ITextMessage {
        // TODO: Fix everything (most is hard-coded)
        return {
            id: Util.generateId(),

            // TODO
            authorAvatarHash: "",
            authorName: app.me.username,
            sent: false,

            // TODO
            systemMessage: false,
            text,
            time: Date.now(),
            channelId,
            type: MessageType.Text,
            senderAddress: "unknown",

            // TODO: Computed from text.
            mentions: []
        };
    }

    public static createNotice(channelId: UniqueId, text: string, style: NoticeStyle = NoticeStyle.Success): INotice {
        return {
            channelId,
            id: Util.generateId(),
            text,
            time: Date.now(),
            type: MessageType.Notice,
            style
        };
    }

    public static createBreakMessage(channelId: UniqueId, text: string): IGenericMessage {
        return {
            channelId,
            id: Util.generateId(),
            text,
            type: MessageType.Break,
            time: Date.now()
        };
    }
}
