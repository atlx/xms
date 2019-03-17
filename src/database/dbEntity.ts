import Db from "./db";
import {UniqueId} from "../../models/models";
import {Remote} from "electron";

export interface IDbModel {
    /**
     * A unique ID representing this model.
     */
    readonly id: UniqueId;
}

/**
 * A PouchDB document model.
 */
export interface IDocModel {
    /**
     * The required identifier for all documents.
     */
    readonly _id: UniqueId;
}

/**
 * A database entity, used to be inherited for
 * active directory support.
 */
export default abstract class DbEntity<T extends IDbModel> {
    protected model: T;

    public constructor(model: T) {
        this.model = model;
    }

    /**
     * Create a document model from the entity's model.
     */
    public buildDocModel(): IDocModel {
        return {
            // Retrieve the required document ID from the model.
            _id: this.model.id,

            ...this.model
        };
    }

    /**
     * Update and sync properties of the model.
     */
    public update(changes: Partial<T>): this {
        this.model = {
            ...this.model,
            ...changes
        };

        // Sync the model after update.
        return this.sync();
    }

    /**
     * Synchronize the entity's model with the database.
     */
    public sync(): this {
        Db.get().put(this.buildDocModel());

        return this;
    }

    /**
     * Remove entity from the database.
     */
    public remove(): this {
        // TODO: DocModel should contain '_rev' property. See (https://pouchdb.com/getting-started.html#delete_an_object).
        Db.get().remove(this.buildDocModel() as any);

        return this;
    }
}
