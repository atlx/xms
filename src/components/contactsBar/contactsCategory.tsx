import React from "react";
import "@/styles/roster/rosterCategory.scss";
import Contact from "./contact";
import {UniqueId} from "@/models/misc";
import {IAppState} from "@/store/store";
import {connect} from "react-redux";
import PlaceholderRosterItem from "../placeholder/rosterItem";
import {User} from "@/models/user";
import {BasicMap} from "@/core/helper";

interface IProps {
    readonly title: string;
    readonly users: BasicMap<User>;
    readonly meId: UniqueId | null;
}

class ContactsCategory extends React.Component<IProps> {
    public renderUsers(): JSX.Element[] {
        const users: User[] = [];

        // Populate users array from source map.
        for (const user of this.props.users.values()) {
            users.push(user);
        }

        return users.map((user: User) => {
            return <Contact
                key={user.id}
                me={this.props.meId !== null && user.id === this.props.meId}
                username={user.username}
                avatarUrl={user.avatarUrl}
                status={user.status} />;
        });
    }

    public render(): JSX.Element {
        return (
            <div className="roster-category">
                <div className="title">{this.props.title} &mdash; {this.props.users.size}</div>
                <div className="users">
                    {this.renderUsers()}
                    <PlaceholderRosterItem opacity={1} />
                    <PlaceholderRosterItem opacity={2} />
                    <PlaceholderRosterItem opacity={3} />
                    <PlaceholderRosterItem opacity={4} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): any => {
    return {
        meId: state.user.me ? state.user.me.id : null
    };
};

export default connect(mapStateToProps)(ContactsCategory);
