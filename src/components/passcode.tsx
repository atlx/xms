import React, {Component, RefObject} from "react";
import "@/styles/misc/passcode.scss";

export default class Passcode extends Component {
    protected readonly $box1: RefObject<HTMLInputElement>;

    protected readonly $box2: RefObject<HTMLInputElement>;

    protected readonly $box3: RefObject<HTMLInputElement>;

    protected readonly $box4: RefObject<HTMLInputElement>;

    public constructor(props: any) {
        super(props);

        // Refs.
        this.$box1 = React.createRef();
        this.$box2 = React.createRef();
        this.$box3 = React.createRef();
        this.$box4 = React.createRef();
    }

    /**
     * Ensure entered value is a number, otherwise prevent.
     */
    public ensureNumber(e: any): void {
        // Attempting to paste, allow.
        if (e.key === "v" && e.ctrlKey) {
            return;
        }
        // If key isn't a number or a Backspace, disallow.
        else if (isNaN(parseInt(e.key)) && e.key !== "Backspace") {
            e.preventDefault();
        }
    }

    public handlePaste(e: any): void {
        // TODO: Get pasted data.
        e.preventDefault();
    }

    public cycle1(): void {
        this.$box2.current!.focus();
    }

    public cycle2(): void {
        this.$box3.current!.focus();
    }

    public cycle3(): void {
        this.$box4.current!.focus();
    }

    /**
     * Attempt to authenticate the provided passcode.
     */
    public finish(): void {

    }

    public render(): JSX.Element {
        return (
            <div className="passcode">
                <input ref={this.$box1} onPaste={this.handlePaste} onKeyDown={this.ensureNumber} onChange={() => this.cycle1()} maxLength={1} tabIndex={0} className="box" />
                <input ref={this.$box2} onPaste={this.handlePaste} onKeyDown={this.ensureNumber} onChange={() => this.cycle2()} maxLength={1} tabIndex={1} className="box" />
                <input ref={this.$box3} onPaste={this.handlePaste} onKeyDown={this.ensureNumber} onChange={() => this.cycle3()} maxLength={1} tabIndex={2} className="box" />
                <input ref={this.$box4} onPaste={this.handlePaste} onKeyDown={this.ensureNumber} onChange={() => this.finish()} maxLength={1} tabIndex={3} className="box" />
            </div>
        );
    }
}
