import {IpAddress} from "../types/types";

export default abstract class Constants {
    public static minPlaceholderNameWidth: number = 60;

    public static maxPlaceholderNameWidth: number = 160;

    public static primaryGroupAddress: IpAddress = "233.183.91.212";

    public static primaryNetPort: number = 45462;

    public static primaryBroadcastPort: number = 45463;
}
