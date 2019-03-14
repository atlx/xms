import timeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

timeAgo.addLocale(en);

const enTimeAgo: any = new timeAgo("en-US");

/**
 * Time and date utility class.
 */
export default abstract class Time {
    /**
     * Determine whether the input timestamp is older than a day than the second timestamp.
     */
    public static isDayOlder(timestampA: number, timestampB: number) {
        const timeA: Date = new Date(timestampA);

        // Add a day to timeA in order to compare. The format is (day * ms * sec * min * hour).
        timeA.setTime(timeA.getTime() + (1 * 1000 * 60 * 60 * 24));

        return timeA.getTime() < new Date(timestampB).getTime();
    }

    public static timeAgo(timestamp: number): string {
        return enTimeAgo.format(timestamp);
    }
}
