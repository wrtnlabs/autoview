export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Extract user info, handling the case where user may be null
    const userLogin = (_b = (_a = input.user) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : "unknown user";
    const avatarSrc = (_d = (_c = input.user) === null || _c === void 0 ? void 0 : _c.avatar_url) !== null && _d !== void 0 ? _d : undefined;
    // Format created date to a human‐readable string
    // Using toLocaleString makes it responsive to the viewer's locale
    const createdAtLabel = new Date(input.created_at).toLocaleString();
    // Build the card header with avatar, username, and timestamp
    const header = {
        type: "CardHeader",
        title: userLogin,
        description: createdAtLabel,
        // Only include avatar if we have a valid URL
        startElement: avatarSrc
            ? {
                type: "Avatar",
                src: avatarSrc,
                name: userLogin,
                size: 40,
            }
            : undefined,
    };
    // Use a Markdown component to render the comment body,
    // so that any markdown syntax in the comment is rendered properly.
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body,
        },
    };
    // Provide a footer with a link button to view the comment on GitHub.
    // We attach a link icon to make it visually intuitive.
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            variant: "text",
            size: "small",
            label: "View on GitHub",
            href: input.url,
            startElement: {
                type: "Icon",
                id: "link",
                size: 16,
                color: "blue",
            },
        },
    };
    // Assemble into a vertical card for a clear visual hierarchy.
    // This component is responsive and stacks its header, content, and footer vertically.
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=348.js.map