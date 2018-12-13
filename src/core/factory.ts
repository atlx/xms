import {UniqueId, MessageType, IMessage, INotice, NoticeStyle} from "../types/types";
import Utils from "./utils";
import {app} from "..";

export default class Factory {
    public static createMessage(channelId: UniqueId, text: string): IMessage {
        return {
            id: Utils.generateId(),
            
            // TODO
            authorAvatarUrl: "",
            authorName: app.me.username,
            sent: false,

            // TODO
            systemMessage: false,
            text,
            time: Date.now(),
            channelId,
            type: MessageType.Text
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