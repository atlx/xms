import {Component} from "react";
import "../styles/misc/lost.scss";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";

export default class Lost extends Component {
    public render(): JSX.Element {
        return (
            <div className="lost">
                <div className="header">
                        <img className="image" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/92/thinking-face_1f914.png" />
                        <div className="title">Something's not right</div>
                        <div className="sub-title">Hmm.. You shouldn't be here!</div>
                        <div
                            onClick={() => window.location.reload()}
                            className="reload">
                            <FontAwesomeIcon className="icon" icon={faSyncAlt} /> Reload Window
                        </div>
                        <div onClick={() => window.close()} className="exit">Exit Application</div>
                    </div>
                    <div className="footer">
                        <div className="title">User ID</div>
                        <div className="id">2aae6c35c94fcfb415</div>
                    </div>
            </div>
        );
    }
}
