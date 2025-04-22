export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no user data, show a friendly markdown message
    if (!input.user) {
        return {
            type: "Markdown",
            content: "### User data not available\nPlease check back later or refresh the page."
        };
    }
    const user = input.user;
    // Determine online status
    const isOnline = Boolean(input.online);
    // A small status chip with an icon
    const statusChip = {
        type: "Chip",
        label: isOnline ? "Online" : "Offline",
        color: isOnline ? "success" : "gray",
        size: "small",
        variant: "outlined",
        startElement: {
            type: "Icon",
            id: "circle",
            color: isOnline ? "green" : "gray",
            size: 8
        }
    };
    // User avatar, fallback to initials if avatarUrl is missing
    const avatar = {
        type: "Avatar",
        src: user.avatarUrl,
        name: user.name,
        variant: "primary",
        size: 40
    };
    // Card header with avatar, name, user type, and status
    const header = {
        type: "CardHeader",
        title: user.name || "Unknown User",
        description: user.type
            ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
            : undefined,
        startElement: avatar,
        endElement: statusChip
    };
    // Helper to create a text component
    const makeText = (text) => ({
        type: "Text",
        content: text
    });
    // Build a list of user details
    const details = [];
    if (user.email) {
        details.push({
            type: "DataListItem",
            label: makeText("Email"),
            value: makeText(user.email)
        });
    }
    if (user.mobileNumber) {
        details.push({
            type: "DataListItem",
            label: makeText("Mobile"),
            value: {
                type: "Button",
                variant: "text",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "mobile-alt",
                    size: 16,
                    color: "blue"
                },
                label: user.mobileNumber
            }
        });
    }
    if (user.lastSeenAt) {
        const dateString = new Date(user.lastSeenAt).toLocaleString();
        details.push({
            type: "DataListItem",
            label: makeText("Last Seen"),
            value: makeText(dateString)
        });
    }
    if (typeof user.sessionsCount === "number") {
        details.push({
            type: "DataListItem",
            label: makeText("Sessions"),
            value: makeText(user.sessionsCount.toString())
        });
    }
    if (Array.isArray(user.tags) && user.tags.length > 0) {
        // Render all user tags as a chip group
        const tagChips = user.tags.map((tag) => ({
            type: "Chip",
            label: tag,
            size: "small",
            variant: "outlined",
            color: "secondary"
        }));
        details.push({
            type: "DataListItem",
            label: makeText("Tags"),
            value: {
                type: "ChipGroup",
                childrenProps: tagChips,
                maxItems: 10
            }
        });
    }
    // Wrap details in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: details
    };
    // Main card content
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Compose a vertical card to make it responsive and stackable on mobile
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
    return card;
}
//# sourceMappingURL=272.js.map