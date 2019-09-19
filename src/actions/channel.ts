import {IChannel} from "@/models/channel";
import {ActionType} from "@/store/store";
import {UniqueId} from "@/models/misc";
import {store} from "@/index";

export default abstract class ChannelAction {
    public static add(channel: IChannel): void {
        store.dispatch({
            type: ActionType.AddChannel,
            payload: channel
        });
    }

    /**
     * Rename a private channel.
     */
    public static rename(channelId: UniqueId, name: string): void {
        store.dispatch({
            type: ActionType.RenameChannel,

            payload: {
                channelId,
                name
            }
        });
    }

    public static setTopic(channelId: UniqueId, topic: string): void {
        store.dispatch({
            type: ActionType.SetChannelTopic,

            payload: {
                channelId,
                topic
            }
        });
    }

    public static remove(channelId: UniqueId): void {
        store.dispatch({
            type: ActionType.RemoveChannel,
            payload: channelId
        });
    }

    public static setActive(channelId: UniqueId): void {
        store.dispatch({
            type: ActionType.SetActiveChannel,
            payload: channelId
        });
    }

    public static setGeneralAsActive(): void {
        store.dispatch({
            type: ActionType.SetGeneralAsActiveChannel
        });
    }
}
