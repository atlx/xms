import React from "react";
import {connect} from "react-redux";
import "../../styles/roster/roster.scss";
import {IAppState} from "../../store/store";
import {IRosterCategory, User, UniqueId} from "../../models/models";
import RosterCategory from "./rosterCategory";
import {Map as ImmutableMap} from "immutable";

interface ILocalProps {
    readonly users: ImmutableMap<UniqueId, User>;
    readonly categories: IRosterCategory[];
}

class Roster extends React.Component<ILocalProps> {
    public renderCategories(): JSX.Element[] {
        return this.props.categories.map((category: IRosterCategory) => {
            const users: ImmutableMap<UniqueId, User> = ImmutableMap().asMutable() as ImmutableMap<UniqueId, User>;

            for (const user of this.props.users.values()) {
                if (category.users.includes(user.id)) {
                    users.set(user.id, user);
                }
            }

            // TODO: Hard-coded meId for redux connect.
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
