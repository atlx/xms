import React from "react";
import "../styles/user-bar.scss";

export default class UserBar extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="user-bar">
                <div className="avatar"></div>
                <div className="info">
                    <div className="name">An User</div>
                    <div className="status"></div>
                </div>
            </div>
        );
    }
}
