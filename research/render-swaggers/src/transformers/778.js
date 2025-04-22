export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no reactions, display a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No reactions yet\nBe the first to react! 🎉"
        };
    }
    // Map each reaction to a ListItemProps
    const listItems = input.map(reaction => {
        var _a, _b;
        // 1. Determine which icon and color to use for this reaction content
        //    Using FontAwesome icon names (kebab-case, without prefix)
        let iconId;
        let iconColor;
        switch (reaction.content) {
            case "+1":
                iconId = "thumbs-up";
                iconColor = "green";
                break;
            case "-1":
                iconId = "thumbs-down";
                iconColor = "red";
                break;
            case "laugh":
                iconId = "face-laugh";
                iconColor = "yellow";
                break;
            case "confused":
                iconId = "face-confused";
                iconColor = "orange";
                break;
            case "heart":
                iconId = "heart";
                iconColor = "red";
                break;
            case "hooray":
                iconId = "hands-clapping";
                iconColor = "violet";
                break;
            case "rocket":
                iconId = "rocket";
                iconColor = "teal";
                break;
            case "eyes":
                iconId = "eye";
                iconColor = "cyan";
                break;
            default:
                iconId = "smile";
                iconColor = "gray";
        }
        // 2. Build the startElement: user's avatar or a generic user icon if missing
        const startElement = reaction.user
            ? {
                type: "Avatar",
                src: reaction.user.avatar_url,
                name: reaction.user.login,
                variant: "primary",
                size: 40
            }
            : {
                type: "Icon",
                id: "user",
                color: "gray",
                size: 40
            };
        // 3. Build the endElement: the reaction icon
        const endElement = {
            type: "Icon",
            id: iconId,
            color: iconColor,
            size: 24
        };
        // 4. Format the timestamp into a human‑readable string
        const timestamp = new Date(reaction.created_at).toLocaleString();
        // 5. Compose the list item
        return {
            type: "ListItem",
            title: (_b = (_a = reaction.user) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : "Unknown User",
            description: timestamp,
            startElement,
            endElement
        };
    });
    // Wrap all items into a responsive List
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=778.js.map