/**
 * Time and date utility class.
 */
export default abstract class Time {
    /**
     * Determine whether the input timestamp is older than a day than the second timestamp.
     */
    public static isDayOlder(timestampA: number, timestampB: number) {
        const timeA: Date = new Date(timestampA);

        // Substract a day from the provided timestamp.
        timeA.setTime(timeA.getDate() + 1);

        return new Date(timestampB).getTime() < timeA.getTime();
    }
}
