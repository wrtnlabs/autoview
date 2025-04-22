export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no comments, show a friendly message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No comments available.",
            variant: "body1",
            color: "gray",
        };
    }
    // Map each issue comment to a DataListItemProps
    const items = input.map((comment) => {
        var _a, _b;
        // Safely extract user information (nullable_simple_user can be null)
        const user = comment.user;
        const login = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown";
        const avatarUrl = user === null || user === void 0 ? void 0 : user.avatar_url;
        // Prepare an avatar or a fallback text component if avatar is missing
        const startElement = avatarUrl
            ? {
                type: "Avatar",
                src: avatarUrl,
                name: login,
                size: 32,
            }
            : {
                type: "Text",
                content: login,
                variant: "body2",
            };
        // Format the creation date into a human-readable string
        const createdAt = new Date(comment.created_at).toLocaleString();
        // Label area: avatar + user login + timestamp
        const label = [
            startElement,
            {
                type: "Text",
                content: login,
                variant: "body2",
                color: "primary",
            },
            {
                type: "Text",
                content: createdAt,
                variant: "caption",
                color: "gray",
            },
        ];
        // Use markdown to render the comment body for richer formatting
        const bodyContent = (_b = comment.body) !== null && _b !== void 0 ? _b : "";
        const value = {
            type: "Markdown",
            content: bodyContent || "_No content_",
        };
        return {
            type: "DataListItem",
            label,
            value,
        };
    });
    // Wrap all items in a DataList for display
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=775.js.map