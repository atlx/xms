import {IChannel} from "../models/channel";
import {ActionType} from "../store/store";
import {UniqueId} from "../models/misc";
import App from "../core/app";

export default abstract class ChannelActions {
    public static add(channel: IChannel): void {
        App.getStore().dispatch({
            type: ActionType.AddChannel,
            payload: channel
        });
    }

    /**
     * Rename a private channel.
     */
    public static rename(channelId: UniqueId, name: string): void {
        App.getStore().dispatch({
            type: ActionType.RenameChannel,

            payload: {
                channelId,
                name
            }
        });
    }

    public static setTopic(channelId: UniqueId, topic: string): void {
        App.getStore().dispatch({
            type: ActionType.SetChannelTopic,

            payload: {
                channelId,
                topic
            }
        });
    }

    public static remove(channelId: UniqueId): void {
        App.getStore().dispatch({
            type: ActionType.RemoveChannel,
            payload: channelId
        });
    }

    public static setActive(channelId: UniqueId): void {
        App.getStore().dispatch({
            type: ActionType.SetActiveChannel,
            payload: channelId
        });
    }

    public static setGeneralAsActive(): void {
        App.getStore().dispatch({
            type: ActionType.SetGeneralAsActiveChannel
        });
    }
}
