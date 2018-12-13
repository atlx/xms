import React from "react";
import "../styles/rooster-category.scss";
import RoosterItem from "./rooster-item";
import {User, UniqueId} from "../types/types";
import {AppState} from "../store/store";
import {connect} from "react-redux";

type RoosterCategoryProps = {
    readonly title: string;
    readonly users: User[];
    readonly meId: UniqueId | null;
}

class RoosterCategory extends React.Component<RoosterCategoryProps> {
    public renderUsers(): JSX.Element[] {
        return this.props.users.map((user: User) => {
            return <RoosterItem
                key={user.id}
                me={this.props.meId !== null && user.id === this.props.meId}
                name={user.username}
                avatarUrl={user.avatarUrl}
                status={user.status} />;
        });
    }

	public render(): JSX.Element {
		return (
			<div className="rooster-category">
                <div className="title">{this.props.title} &mdash; {this.props.users.length}</div>
                <div className="users">
                    {this.renderUsers()}
                </div>
			</div>
		);
    }
}

const mapStateToProps = (state: AppState): any => {
	return {
        meId: state.me ? state.me.id : null
	};
};

export default connect(mapStateToProps)(RoosterCategory);