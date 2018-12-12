import React from "react";
import "../styles/pages/default.scss";
import Explorer from "../components/explorer";
import Chat from "../components/chat";
import Rooster from "../components/rooster";
import Modal from "../components/modal";
import {CSSTransition} from "react-transition-group";

type DefaultPageState = {
	readonly showTestModal: boolean;
}

export default class DefaultPage extends React.Component<any, DefaultPageState> {
	public componentWillMount(): void {
		this.setState({
			showTestModal: true
		});
	}

	public render(): JSX.Element {
		return (
			<React.Fragment>
				<CSSTransition classNames="trans"  unmountOnExit={true} in={this.state.showTestModal} timeout={300}>
					<Modal
						text="Hello world"
						title="Some title here"

						onClose={() => this.setState({
							showTestModal: false
						})}
					/>
				</CSSTransition>
				<Explorer />
				{/* TODO: Props are hard-coded */}
				<Chat
					commandHandler={null as any}
					autoCompleteVisible={false}
					offsetMultiplier={10}
					messages={[]}
					inputLocked={true}
					activeChannel={null as any}
				/>
				<Rooster />
			</React.Fragment>
		);
	}
}
