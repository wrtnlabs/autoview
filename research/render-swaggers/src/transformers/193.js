export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    const manager = input.manager;
    // If there's no manager data, show a friendly markdown message
    if (!manager) {
        return {
            type: "Markdown",
            content: "*No manager data available.*",
        };
    }
    // Determine if the manager is currently online
    const isOnline = !!input.online &&
        input.online.personId !== undefined &&
        input.online.personId === manager.id;
    // Build the avatar component (uses initials if no src)
    const avatarProps = {
        type: "Avatar",
        src: manager.avatarUrl,
        name: manager.name,
        size: 40,
    };
    // If online, wrap the avatar with a green dot badge
    const startElement = isOnline
        ? {
            type: "Badge",
            dot: true,
            color: "green",
            offset: { vertical: "top", horizontal: "right" },
            childrenProps: avatarProps,
        }
        : avatarProps;
    // Build the card header showing name and role
    const cardHeader = {
        type: "CardHeader",
        title: manager.name,
        description: manager.role,
        startElement,
    };
    // Helper to push a data-list item if the value exists
    const items = [];
    function addItem(label, value) {
        if (value !== undefined && value !== "") {
            items.push({
                type: "DataListItem",
                label: { type: "Text", content: label },
                value: { type: "Text", content: value },
            });
        }
    }
    // Email (respect front‐end visibility)
    const email = manager.showEmailToFront && manager.emailForFront
        ? manager.emailForFront
        : manager.email;
    addItem("Email", email);
    // Mobile number (respect front‐end visibility)
    const mobile = manager.showMobileNumberToFront && manager.mobileNumberForFront
        ? manager.mobileNumberForFront
        : manager.mobileNumber;
    addItem("Mobile", mobile);
    // Description (if allowed to front-end)
    if (manager.showDescriptionToFront) {
        addItem("Description", manager.description);
    }
    // Created date, formatted to locale
    if (manager.createdAt !== undefined) {
        const date = new Date(manager.createdAt).toLocaleDateString();
        addItem("Created", date);
    }
    // Default watch settings
    addItem("Group Watch", manager.defaultGroupWatch);
    addItem("Direct Chat Watch", manager.defaultDirectChatWatch);
    addItem("User Chat Watch", manager.defaultUserChatWatch);
    // Scores
    if (manager.operatorScore !== undefined) {
        addItem("Operator Score", String(manager.operatorScore));
    }
    if (manager.touchScore !== undefined) {
        addItem("Touch Score", String(manager.touchScore));
    }
    // DisplayAsChannel flag
    if (manager.displayAsChannel !== undefined) {
        addItem("Channel Mode", manager.displayAsChannel ? "Enabled" : "Disabled");
    }
    // Status emoji & text
    if (manager.statusEmoji || manager.statusText) {
        const statusText = (manager.statusEmoji ? manager.statusEmoji + " " : "") +
            ((_a = manager.statusText) !== null && _a !== void 0 ? _a : "");
        addItem("Status", statusText);
    }
    // If no details were added, show a fallback message
    const contentComponent = items.length > 0
        ? {
            type: "DataList",
            childrenProps: items,
        }
        : {
            type: "Markdown",
            content: "*No details to display.*",
        };
    // Wrap the data-list (or markdown) in a CardContent
    const cardContent = {
        type: "CardContent",
        childrenProps: contentComponent,
    };
    // Return a vertical card combining header + content
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
}
//# sourceMappingURL=193.js.map