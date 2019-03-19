import React from "react";
import {storiesOf} from "@storybook/react";
import ChatComposer from "../src/components/chat/chatComposer";

storiesOf("ChatComposer", module)
    .add("normal", () => (
        <ChatComposer />
    ));
