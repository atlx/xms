import PouchDB from "pouchdb";

export default abstract class Db {
    /**
     * The database name to be used during creation.
     */
    public static dbName: string = "xms";

    /**
     * The source database. Initially intentionally undefined.
     */
    protected static db: PouchDB.Database;

    /**
     * Create the database. This should be done
     * before using the database for the first time.
     */
    public static createDefault(): void {
        Db.db = new PouchDB(Db.dbName);
    }

    /**
     * Retrieve the database.
     */
    public static get(): PouchDB.Database {
        return this.db;
    }
}
