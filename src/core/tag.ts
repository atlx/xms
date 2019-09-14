export enum TagName {
    DatabaseSyncable = "dbSyncable"
}

export default abstract class Tag {
    public static readonly propertyName: string = "_tags";

    public static add<T = any>(obj: T, tag: string): T {
        let tags: Set<string> | undefined = obj[Tag.propertyName];

        // Create the tag set if applicable.
        if (tags === undefined) {
            obj[Tag.propertyName] = new Set();
            tags = obj[Tag.propertyName];
        }

        // Add the tag to the set.
        tags!.add(tag);

        // Return the modified object.
        return obj;
    }

    public static has(obj: any, tag: string): boolean {
        // Set is not defined; Therefore object does not contain such tag.
        if (obj[Tag.propertyName] === undefined) {
            return false;
        }

        return (obj[Tag.propertyName] as Set<string>).has(tag);
    }

    /**
     * Tags a property as database sync-able.
     */
    public static dbSyncable<T = any>(item: T): T {
        return Tag.add(item, TagName.DatabaseSyncable);
    }
}
