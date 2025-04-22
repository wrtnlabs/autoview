export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    const tag = input.chatTag;
    // If there's no tag data, render a simple markdown message
    if (!tag) {
        return {
            type: "Markdown",
            content: "### No tag data available",
        };
    }
    // Map backend colorVariant values to UI avatar variants
    const colorMap = {
        red: "red",
        orange: "orange",
        yellow: "yellow",
        olive: "lime", // olive → lime
        green: "green",
        cobalt: "blue", // cobalt → blue
        purple: "violet", // purple → violet
        pink: "pink",
        navy: "indigo", // navy → indigo
    };
    const avatarVariant = tag.colorVariant ? colorMap[tag.colorVariant] : undefined;
    // Prepare a badge for follower count if provided
    let followerBadge;
    if (Array.isArray(tag.followerIds) && tag.followerIds.length > 0) {
        followerBadge = {
            type: "Badge",
            count: tag.followerIds.length,
            maxCount: 99,
            showZero: false,
            dot: false,
            color: avatarVariant !== null && avatarVariant !== void 0 ? avatarVariant : "primary",
            // Use a simple user icon inside the badge
            childrenProps: {
                type: "Icon",
                id: "user",
                color: "gray",
                size: 20,
            },
        };
    }
    // Build the card header: show avatar, name, key, and follower count badge
    const header = {
        type: "CardHeader",
        title: tag.name,
        description: tag.key,
        startElement: {
            type: "Avatar",
            // Show the initial of the tag name
            name: tag.name.charAt(0).toUpperCase(),
            variant: avatarVariant,
            size: 40,
        },
        endElement: followerBadge,
    };
    // Build a list of tag properties to display
    const items = [];
    // ID
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "ID", variant: "body2", color: "tertiary" },
        value: { type: "Text", content: (_a = tag.id) !== null && _a !== void 0 ? _a : "N/A", variant: "body1" },
    });
    // Channel ID (if available)
    if (tag.channelId) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Channel", variant: "body2", color: "tertiary" },
            value: { type: "Text", content: tag.channelId, variant: "body1" },
        });
    }
    // Creation timestamp
    if (typeof tag.createdAt === "number") {
        const date = new Date(tag.createdAt);
        if (!isNaN(date.getTime())) {
            items.push({
                type: "DataListItem",
                label: { type: "Text", content: "Created At", variant: "body2", color: "tertiary" },
                value: { type: "Text", content: date.toLocaleString(), variant: "body1" },
            });
        }
    }
    // Description (if available) rendered as markdown for richer formatting
    if (tag.description) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Description", variant: "body2", color: "tertiary" },
            // Markdown component will wrap plain text gracefully and support links etc.
            value: {
                type: "Markdown",
                content: tag.description,
            },
        });
    }
    // Wrap the items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Card content holds the data list
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Compose a vertical card with header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=231.js.map