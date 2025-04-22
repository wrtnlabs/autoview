export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Header: show title, issue number, creation date and author avatar
    const header = {
        type: "CardHeader",
        title: input.title,
        // Format the description to include number, date, and author login
        description: `#${input.number} opened on ${new Date(input.created_at).toLocaleDateString()} by ${(_b = (_a = input.author) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : "Unknown"}`,
        // If author is available, show their avatar
        startElement: input.author
            ? {
                type: "Avatar",
                src: input.author.avatar_url,
                name: input.author.login,
                variant: "primary",
                size: 40,
            }
            : undefined,
    };
    // Content: render the markdown body for better readability
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body,
        },
    };
    // Footer: display reaction counts as badges and a button linking to GitHub
    const footerChildren = [];
    if (input.reactions) {
        // Map certain reactions to FontAwesome icon IDs
        const mapping = {
            "+1": { icon: "thumbs-up", count: input.reactions["+1"] },
            "-1": { icon: "thumbs-down", count: input.reactions["-1"] },
            heart: { icon: "heart", count: input.reactions.heart },
            rocket: { icon: "rocket", count: input.reactions.rocket },
        };
        for (const key of Object.keys(mapping)) {
            const { icon, count } = mapping[key];
            if (count > 0) {
                footerChildren.push({
                    type: "Badge",
                    count,
                    maxCount: 99,
                    showZero: false,
                    childrenProps: {
                        type: "Icon",
                        id: icon,
                        size: 16,
                        color: "gray",
                    },
                });
            }
        }
    }
    // Button to navigate to the full discussion on GitHub
    footerChildren.push({
        type: "Button",
        label: "View on GitHub",
        href: input.html_url,
        variant: "contained",
        color: "primary",
        size: "small",
    });
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Compose the vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=908.js.map