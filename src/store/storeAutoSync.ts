import AppStore from "./store";
import {EventEmitter} from "events";
import DbEntity from "../database/dbEntity";

export default class StoreAutoSync extends EventEmitter {
    public static defaultThreshold: number = 15;

    protected readonly store: AppStore;

    protected readonly threshold: number;

    protected readonly entities: Set<DbEntity>;

    protected counter: number;

    public constructor(store: AppStore, threshold: number = StoreAutoSync.defaultThreshold) {
        super();

        this.store = store;
        this.threshold = threshold;
        this.entities = new Set();
        this.counter = 0;
        this.setupEvents();
    }

    public attach(entity: DbEntity): boolean {
        // Do not continue if the entity already exist.
        if (this.entities.has(entity)) {
            return false;
        }

        // Save the entity.
        this.entities.add(entity);

        return true;
    }

    protected setupEvents(): void {
        this.store.unwrap().subscribe(() => {
            this.counter++;

            // Threshold has been passed, proceed to sync state.
            if (this.counter >= this.threshold) {
                this.sync();
            }
        });
    }

    protected sync(): void {
        // Sync all entities.
        for (const entity of this.entities) {
            entity.sync();
        }

        // Report event.
        this.emit("sync");
    }
}
