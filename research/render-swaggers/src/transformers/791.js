export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Mapping from GitHub reaction content to FontAwesome icon IDs
    const iconMap = {
        "+1": "thumbs-up",
        "-1": "thumbs-down",
        laugh: "laugh",
        confused: "meh",
        heart: "heart",
        hooray: "trophy",
        rocket: "rocket",
        eyes: "eye",
    };
    // If there are no reactions, show a simple markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No reactions yet",
        };
    }
    // Build a list of DataListItemProps for each reaction
    const items = input.map((reaction) => {
        var _a, _b, _c;
        const user = reaction.user;
        // Prepare avatar: if user is null, show a generic placeholder avatar with initials
        const avatar = {
            type: "Avatar",
            src: user === null || user === void 0 ? void 0 : user.avatar_url,
            name: (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown",
            size: 40,
            variant: "primary",
        };
        // Prepare user's display name text
        const nameText = {
            type: "Text",
            variant: "body1",
            content: (_c = (_b = user === null || user === void 0 ? void 0 : user.name) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.login) !== null && _c !== void 0 ? _c : "Unknown",
            color: "primary",
        };
        // Prepare reaction icon
        const reactionIconId = iconMap[reaction.content] || "question";
        const reactionIcon = {
            type: "Icon",
            id: reactionIconId,
            color: "blue",
            size: 20,
        };
        // Format timestamp as locale string (the UI layer can localize further)
        const timeText = {
            type: "Text",
            variant: "caption",
            content: new Date(reaction.created_at).toLocaleString(),
            color: "gray",
        };
        // Compose label as [avatar, name]
        const labelComponents = [
            avatar,
            nameText,
        ];
        // Compose value as [icon, time]
        const valueComponents = [
            reactionIcon,
            timeText,
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap the list in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Add a header card for context
    const header = {
        type: "CardHeader",
        title: "Reactions",
        description: `${input.length} reaction${input.length > 1 ? "s" : ""}`,
    };
    // Card content holds the DataList
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Use a vertical card to lay out header + list
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=791.js.map