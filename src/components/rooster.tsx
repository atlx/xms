import React from "react";
import {connect} from "react-redux";
import "../styles/rooster.scss";
import {AppState} from "../store/store";
import {RoosterCategoryModel, RoosterUserModel} from "../types/types";
import RoosterCategory from "./rooster-category";

class Rooster extends React.Component<any> {
	public renderCategories(): JSX.Element[] {
		return this.props.categories.map((category: RoosterCategoryModel) => {
			const users: RoosterUserModel[] = this.props.users.filter((user: RoosterUserModel) => {
				return user.categoryId === category.id;
			});

			return <RoosterCategory key={category.id} title={category.name} users={users} />
		});
	}

	public render() {
		return (
			<div className="rooster">
				{this.renderCategories()}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): any => {
    return {
		users: state.users,
		categories: state.categories
    };
};

export default connect(mapStateToProps)(Rooster);