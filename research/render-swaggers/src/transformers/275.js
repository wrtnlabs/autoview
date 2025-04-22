export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const user = input.user;
    // If there's no user, render a friendly markdown message
    if (!user) {
        return {
            type: "Markdown",
            content: "### No user data available\n> Please check back later."
        };
    }
    // Build the avatar component for the user
    const avatar = {
        type: "Avatar",
        src: user.avatarUrl,
        name: user.name || undefined,
        variant: user.type === "member" ? "primary" : "secondary",
        size: 40
    };
    // Wrap the avatar in a badge to indicate online status
    const avatarBadge = {
        type: "Badge",
        dot: true,
        color: input.online ? "success" : "gray",
        offset: { vertical: "bottom", horizontal: "right" },
        // Badge overlays on the avatar
        childrenProps: avatar
    };
    // Header of the card: avatar+badge, name and user type
    const cardHeader = {
        type: "CardHeader",
        startElement: avatarBadge,
        title: user.name,
        description: user.type
    };
    // Helper to build an icon + text presentation component
    const makeIconText = (iconId, label) => [
        { type: "Icon", id: iconId, color: "gray", size: 16 },
        { type: "Text", content: ` ${label}`, variant: "body2" }
    ];
    // Build the data list items for the user's key fields
    const details = [];
    // Email
    details.push({
        type: "DataListItem",
        label: makeIconText("envelope", "Email"),
        value: [
            { type: "Icon", id: "at", color: "gray", size: 16 },
            { type: "Text", content: ` ${user.email || "N/A"}`, variant: "body2" }
        ]
    });
    // Phone
    details.push({
        type: "DataListItem",
        label: makeIconText("phone", "Phone"),
        value: [
            { type: "Icon", id: "phone-alt", color: "gray", size: 16 },
            { type: "Text", content: ` ${user.mobileNumber || "N/A"}`, variant: "body2" }
        ]
    });
    // Channel ID, if present
    if (user.channelId) {
        details.push({
            type: "DataListItem",
            label: makeIconText("comments", "Channel"),
            value: { type: "Text", content: user.channelId, variant: "body2" }
        });
    }
    // Unread count, if present
    if (typeof user.unread === "number") {
        details.push({
            type: "DataListItem",
            label: makeIconText("inbox", "Unread"),
            value: {
                type: "Badge",
                count: user.unread,
                maxCount: 99,
                showZero: false,
                childrenProps: { type: "Icon", id: "inbox", color: "gray", size: 16 }
            }
        });
    }
    // Compose the data list
    const dataList = {
        type: "DataList",
        childrenProps: details
    };
    // Wrap details in card content
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Assemble a vertical card with header and content
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };
}
//# sourceMappingURL=275.js.map