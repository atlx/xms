import React from "react";
import {connect} from "react-redux";
import "@/styles/roster/roster.scss";
import {IAppState} from "@/store/store";
import {IRosterCategory} from "@/models/misc";
import ContactsCategory from "./contactsCategory";
import {Map as ImmutableMap} from "immutable";
import {User} from "@/models/user";
import {BasicMap} from "@/core/helper";

interface IProps {
    readonly users: BasicMap<User>;
    readonly categories: IRosterCategory[];
}

class ContactsBar extends React.Component<IProps> {
    public renderCategories(): JSX.Element[] {
        return this.props.categories.map((category: IRosterCategory) => {
            const users: BasicMap<User> = ImmutableMap().asMutable() as BasicMap<User>;

            for (const user of this.props.users.values()) {
                if (category.users.includes(user.id)) {
                    users.set(user.id, user);
                }
            }

            // TODO: Hard-coded meId for redux connect.
            return <ContactsCategory meId={null as any} key={category.id} title={category.name} users={users} />
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

export default connect(mapStateToProps)(ContactsBar);
