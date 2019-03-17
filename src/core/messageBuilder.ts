// TODO
export default class MessageBuilder {
    public readonly text: string;

    protected readonly components: Array<JSX.Element | string>;

    public constructor(text: string) {
        this.text = text;
        this.components = [];
    }

    // TODO: Implement
    public insert(component: JSX.Element): this {
        return this;
    }

    public get(): ReadonlyArray<JSX.Element | string> {
        return this.components;
    }
}
