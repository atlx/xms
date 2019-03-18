export default abstract class StateHelper<T> {
    protected state: T;

    public constructor(state: T) {
        this.state = state;
    }

    public updateState(state: T): void {
        this.state = state;
    }
}
