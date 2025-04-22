export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    const tag = input.chatTag;
    // If there's no tag data, show a simple markdown message
    if (!tag) {
        return {
            type: "Markdown",
            content: "## No chat tag data available"
        };
    }
    // Map legacy color variants to AutoView icon colors
    const colorMap = {
        red: "red",
        orange: "orange",
        yellow: "yellow",
        olive: "lime",
        green: "green",
        cobalt: "blue",
        purple: "violet",
        pink: "pink",
        navy: "indigo"
    };
    const mappedColor = (_b = colorMap[(_a = tag.colorVariant) !== null && _a !== void 0 ? _a : ""]) !== null && _b !== void 0 ? _b : "gray";
    // Build a list of key/value items for the tag metadata
    const listItems = [];
    // Tag key
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: ["Key:"],
            variant: "body2",
            color: "tertiary"
        },
        value: {
            type: "Text",
            content: [tag.key],
            variant: "body1"
        }
    });
    // Channel ID (if present)
    if (tag.channelId) {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: ["Channel:"],
                variant: "body2",
                color: "tertiary"
            },
            value: {
                type: "Text",
                content: [tag.channelId],
                variant: "body1"
            }
        });
    }
    // Creation date (if present)
    if (typeof tag.createdAt === "number") {
        const dateStr = new Date(tag.createdAt).toLocaleString();
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: ["Created At:"],
                variant: "body2",
                color: "tertiary"
            },
            value: {
                type: "Text",
                content: [dateStr],
                variant: "body1"
            }
        });
    }
    // Wrap the metadata in a DataList component
    const metadataList = {
        type: "DataList",
        childrenProps: listItems
    };
    // Build a badge to show follower count
    const followerBadge = {
        type: "Badge",
        count: (_d = (_c = tag.followerIds) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0,
        showZero: true,
        childrenProps: {
            type: "Icon",
            id: "user",
            size: 16,
            color: "gray"
        }
    };
    // Assemble the card header with the tag name and optional description
    const header = {
        type: "CardHeader",
        title: tag.name,
        description: tag.description,
        startElement: {
            type: "Icon",
            id: "tag",
            color: mappedColor,
            size: 36
        }
    };
    // Card content holds the metadata list
    const content = {
        type: "CardContent",
        childrenProps: metadataList
    };
    // Card footer holds the follower badge
    const footer = {
        type: "CardFooter",
        childrenProps: followerBadge
    };
    // Return a responsive vertical card that displays all of the above
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=178.js.map