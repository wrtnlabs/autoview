export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no reactions, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No reactions found\nBe the first to leave a reaction!"
        };
    }
    // Helper to map GitHub reaction content to FontAwesome icon IDs.
    const mapContentToIcon = (content) => {
        switch (content) {
            case "+1": return "thumbs-up";
            case "-1": return "thumbs-down";
            case "laugh": return "laugh";
            case "confused": return "confused";
            case "heart": return "heart";
            case "hooray": return "tada";
            case "rocket": return "rocket";
            case "eyes": return "eye";
            default: return "question-circle"; // fallback icon
        }
    };
    // Helper to choose a color for each reaction type.
    const mapContentToColor = (content) => {
        switch (content) {
            case "+1": return "green";
            case "-1": return "red";
            case "heart": return "red";
            case "laugh": return "yellow";
            case "hooray": return "violet";
            case "rocket": return "cyan";
            case "eyes": return "teal";
            case "confused": return "orange";
            default: return "gray";
        }
    };
    // Transform each reaction into a DataListItem with avatar, name+timestamp, and reaction icon.
    const items = input.map((reaction) => {
        var _a, _b;
        const user = reaction.user;
        const login = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown";
        const displayName = (_b = user === null || user === void 0 ? void 0 : user.name) !== null && _b !== void 0 ? _b : login;
        const timestamp = new Date(reaction.created_at).toLocaleString();
        // Avatar shows the user's avatar_url if available, otherwise initials from login.
        const avatar = {
            type: "Avatar",
            src: user === null || user === void 0 ? void 0 : user.avatar_url,
            name: displayName,
            variant: "blue",
            size: 28
        };
        // Text includes the display name and a subdued timestamp.
        const nameAndTime = {
            type: "Text",
            variant: "body1",
            color: "tertiary",
            content: `${displayName} • ${timestamp}`
        };
        // Icon for the reaction content.
        const reactionIcon = {
            type: "Icon",
            id: mapContentToIcon(reaction.content),
            size: 20,
            color: mapContentToColor(reaction.content)
        };
        return {
            type: "DataListItem",
            // label is a horizontal stack of avatar and text.
            label: [avatar, nameAndTime],
            // value is the reaction icon.
            value: reactionIcon
        };
    });
    // Render the list of reactions as a DataList for responsive, mobile-friendly layout.
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    return dataList;
}
//# sourceMappingURL=856.js.map