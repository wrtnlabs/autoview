export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there is no user information, show a markdown notice
    if (!input.user) {
        return {
            type: "Markdown",
            content: "## No user data available\nPlease check back later or contact support."
        };
    }
    const user = input.user;
    // Helper to safely push DataList items
    const details = [];
    function addDetail(label, value) {
        if (value === undefined || value === null || String(value).trim() === "")
            return;
        details.push({
            type: "DataListItem",
            // Label on the left
            label: {
                type: "Text",
                content: label,
                variant: "subtitle2"
            },
            // Value on the right
            value: {
                type: "Text",
                content: String(value),
                variant: "body2"
            }
        });
    }
    // Collect key user properties
    addDetail("ID", user.id);
    addDetail("Email", user.email);
    addDetail("Phone", user.mobileNumber);
    addDetail("Country", user.country);
    addDetail("Language", user.language);
    if (user.lastSeenAt) {
        // Convert timestamp to locale string
        addDetail("Last Seen", new Date(user.lastSeenAt).toLocaleString());
    }
    // Build the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: details
    };
    // Header: avatar + name + role
    const header = {
        type: "CardHeader",
        title: user.name || user.id || "Unnamed User",
        // Capitalize the user.type if present
        description: user.type
            ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
            : undefined,
        startElement: user.avatarUrl
            ? {
                type: "Avatar",
                src: user.avatarUrl,
                name: user.name,
                size: 40,
                variant: "primary"
            }
            : undefined
    };
    // Footer: online status chip
    const onlineChip = {
        type: "Chip",
        label: input.online ? "Online" : "Offline",
        color: input.online ? "success" : "gray",
        variant: "filled",
        size: "small"
    };
    const footer = {
        type: "CardFooter",
        childrenProps: onlineChip
    };
    // Compose a vertical card: header + content + footer
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: dataList
            },
            footer
        ]
    };
}
//# sourceMappingURL=274.js.map