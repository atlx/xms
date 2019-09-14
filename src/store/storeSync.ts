import AppStore from "./store";

export default class StoreSync {
    public static defaultThreshold: number = 15;

    protected readonly store: AppStore;

    protected readonly threshold: number;

    protected counter: number;

    public constructor(store: AppStore, threshold: number = StoreSync.defaultThreshold) {
        this.store = store;
        this.threshold = threshold;
        this.counter = 0;
        this.setupEvents();
    }

    protected setupEvents(): void {
        this.store.unwrap().subscribe(() => {
            this.counter++;

            // Threshold has been passed, proceed to sync state.
            if (this.counter >= this.threshold) {
                
            }
        });
    }
}
