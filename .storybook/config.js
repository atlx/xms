import {configure} from "@storybook/react";

// See (https://storybook.js.org/docs/guides/guide-react/) for the guide.

function loadStories() {
    // You can require as many stories as you need.
    require("../stories/index.js");

    
}

configure(loadStories, module);
