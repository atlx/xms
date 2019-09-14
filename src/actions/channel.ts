import {IChannel} from "../models/channel";
import {ActionType} from "../store/store";
import {UniqueId} from "../models/misc";
import app from "../index";

export default abstract class ChannelAction {
    public static add(channel: IChannel): void {
        app.store.dispatch({
            type: ActionType.AddChannel,
            payload: channel
        });
    }

    /**
     * Rename a private channel.
     */
    public static rename(channelId: UniqueId, name: string): void {
        app.store.dispatch({
            type: ActionType.RenameChannel,

            payload: {
                channelId,
                name
            }
        });
    }

    public static setTopic(channelId: UniqueId, topic: string): void {
        app.store.dispatch({
            type: ActionType.SetChannelTopic,

            payload: {
                channelId,
                topic
            }
        });
    }

    public static remove(channelId: UniqueId): void {
        app.store.dispatch({
            type: ActionType.RemoveChannel,
            payload: channelId
        });
    }

    public static setActive(channelId: UniqueId): void {
        app.store.dispatch({
            type: ActionType.SetActiveChannel,
            payload: channelId
        });
    }

    public static setGeneralAsActive(): void {
        app.store.dispatch({
            type: ActionType.SetGeneralAsActiveChannel
        });
    }
}
