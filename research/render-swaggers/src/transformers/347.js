export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of GitHub gist comments into an AutoView DataList.
// Each comment becomes a DataListItem displaying the user's avatar (or a fallback icon),
// the username, the comment body in Markdown, and the creation date.
function visualizeData(input) {
    // If no comments, show a placeholder markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "_No comments available._",
        };
    }
    // Map each comment to a DataListItemProps
    const items = input.map((comment) => {
        const user = comment.user;
        // Choose avatar or generic user icon if user data is missing
        const identityComponent = user
            ? {
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                variant: "primary",
                size: 40,
            }
            : {
                type: "Icon",
                id: "user-circle", // generic user icon from FontAwesome
                color: "gray",
                size: 40,
            };
        // Username for display
        const userName = user ? user.login : "Unknown";
        // Compose label: avatar/icon next to the username text
        const labelComponents = [
            identityComponent,
            {
                type: "Text",
                content: userName,
                variant: "body1",
                color: "secondary",
            },
        ];
        // Format creation date for display
        const createdAt = new Date(comment.created_at).toLocaleString();
        // Compose value: comment body as Markdown, then date as caption text
        const valueComponents = [
            {
                type: "Markdown",
                content: comment.body,
            },
            {
                type: "Text",
                content: createdAt,
                variant: "caption",
                color: "gray",
            },
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a DataList component for responsive rendering
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=347.js.map