export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input for easier access
    const { channel, managers } = input;
    // Prepare DataList items: one for the channel, then one per manager
    const dataListItems = [];
    // 1. Channel item: display channel number with a badge and hashtag icon
    dataListItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Channel",
            variant: "subtitle1",
        },
        value: {
            type: "Badge",
            count: channel,
            // Use a hashtag icon to represent the channel identifier
            childrenProps: {
                type: "Icon",
                id: "hashtag",
                size: 16,
                color: "blue",
            },
        },
    });
    // 2. Manager items: sort alphabetically for consistent ordering
    const mgrMap = managers !== null && managers !== void 0 ? managers : {};
    Object.keys(mgrMap)
        .sort((a, b) => a.localeCompare(b))
        .forEach((managerName) => {
        const wrapTime = mgrMap[managerName];
        dataListItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: managerName,
                variant: "subtitle1",
            },
            value: {
                type: "Badge",
                count: wrapTime,
                // A clock icon to represent wrap-up time
                childrenProps: {
                    type: "Icon",
                    id: "clock",
                    size: 16,
                    color: "cyan",
                },
            },
        });
    });
    // Compose the final UI as a vertical card with a header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with title, description, and a leading icon
                type: "CardHeader",
                title: "Wrap‑Up Time Summary",
                description: "Overview of channel and individual manager wrap‑up times.",
                startElement: {
                    type: "Icon",
                    id: "clock",
                    size: 24,
                    color: "blue",
                },
            },
            {
                // Card content holding a data list of our items
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=248.js.map