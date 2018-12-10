import React from "react";
import "../styles/rooster-category.scss";
import RoosterItem from "./rooster-item";
import {RoosterUserModel, UniqueId} from "../types/types";

type RoosterCategoryProps = {
    readonly title: string;
    readonly users: RoosterUserModel[];
}

export default class RoosterCategory extends React.Component<RoosterCategoryProps> {
    public renderUsers(): JSX.Element[] {
        return this.props.users.map((user: RoosterUserModel) => {
            return <RoosterItem key={user.id} name={user.username} avatarUrl={user.avatarUrl} status={user.status} />;
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