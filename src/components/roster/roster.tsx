import React from "react";
import {connect} from "react-redux";
import "../../styles/roster/roster.scss";
import {IAppState} from "../../store/store";
import {IRosterCategory, User} from "../../types/types";
import RosterCategory from "./rosterCategory";

interface ILocalProps {
    readonly users: User[];
    readonly categories: IRosterCategory[];
}

class Roster extends React.Component<ILocalProps> {
    public renderCategories(): JSX.Element[] {
        return this.props.categories.map((category: IRosterCategory) => {
            const users: User[] = this.props.users.filter((user: User) => {
                return category.users.includes(user.id);
            });

            // TODO: Hard-coded meId for redux connect
            return <RosterCategory meId={null as any} key={category.id} title={category.name} users={users} />
        });
    }

    public render(): JSX.Element {
        return (
            <div className="roster">
                {this.renderCategories()}
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): any => {
    return {
        users: state.user.users,
        categories: state.category.categories
    };
};

export default connect(mapStateToProps)(Roster);
