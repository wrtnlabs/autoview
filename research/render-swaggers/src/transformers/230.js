export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Extract the tag data; if missing, render a friendly markdown message
    const tag = input.chatTag;
    if (!tag) {
        return {
            type: "Markdown",
            content: "**No tag data available**"
        };
    }
    // Map back-end variants to AutoView color scales
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
    const chipColor = (_b = colorMap[(_a = tag.colorVariant) !== null && _a !== void 0 ? _a : ""]) !== null && _b !== void 0 ? _b : "gray";
    // Build a list of DataListItemProps for each relevant field
    const listItems = [];
    // ID
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", variant: "subtitle2", content: "ID" },
        value: { type: "Text", content: (_c = tag.id) !== null && _c !== void 0 ? _c : "-" }
    });
    // Channel ID (if present)
    if (tag.channelId) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Channel" },
            value: { type: "Text", content: tag.channelId }
        });
    }
    // Created At timestamp (formatted)
    if (typeof tag.createdAt === "number") {
        const formatted = new Date(tag.createdAt).toLocaleString();
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Created At" },
            value: { type: "Text", content: formatted }
        });
    }
    // Follower count as a badge on a users icon
    if (Array.isArray(tag.followerIds)) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Followers" },
            value: {
                type: "Badge",
                count: tag.followerIds.length,
                maxCount: 99,
                showZero: false,
                childrenProps: {
                    type: "Icon",
                    id: "users",
                    color: "gray",
                    size: 16
                }
            }
        });
    }
    // Header: display tag name, description, avatar, and key chip
    const cardHeader = {
        type: "CardHeader",
        title: tag.name,
        description: tag.description,
        startElement: {
            // Avatar using the tag's name initials
            type: "Avatar",
            name: tag.name,
            variant: chipColor,
            size: 40
        },
        endElement: {
            // Display the tag key as a small, outlined chip
            type: "Chip",
            label: tag.key,
            color: chipColor,
            size: "small",
            variant: "outlined"
        }
    };
    // DataList to summarize fields
    const dataList = {
        type: "DataList",
        childrenProps: listItems
    };
    // Wrap the DataList in CardContent
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Assemble into a VerticalCard for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };
}
//# sourceMappingURL=230.js.map