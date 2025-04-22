export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no comment data, show a friendly placeholder message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No commit comments to display.",
        };
    }
    // Transform each commit_comment into a DataListItem for a visually rich list
    const items = input.map((cmt) => {
        var _a, _b;
        // Build the label: avatar + username + short commit SHA
        const labelComponents = [];
        if (cmt.user) {
            labelComponents.push({
                type: "Avatar",
                src: cmt.user.avatar_url,
                name: cmt.user.login,
                variant: "primary",
                size: 32,
            });
        }
        labelComponents.push({
            type: "Text",
            // Use an array to allow future icon mixing if desired
            content: [`${(_b = (_a = cmt.user) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : "Unknown user"}`],
            variant: "body1",
        });
        // Show a short SHA for quick identification
        labelComponents.push({
            type: "Text",
            content: [`${cmt.commit_id.slice(0, 7)}`],
            variant: "caption",
            color: "gray",
        });
        // Build the value: markdown body, file path chip, reactions badge, and a link button
        const valueComponents = [];
        // Render the comment body as markdown for rich text support
        if (cmt.body) {
            valueComponents.push({
                type: "Markdown",
                content: cmt.body,
            });
        }
        // Show file path if available
        if (cmt.path) {
            valueComponents.push({
                type: "Chip",
                label: cmt.path,
                variant: "outlined",
                size: "small",
                color: "secondary",
            });
        }
        // Display reactions rollup as a badge with an icon
        if (cmt.reactions) {
            valueComponents.push({
                type: "Badge",
                count: cmt.reactions.total_count,
                maxCount: 99,
                showZero: false,
                childrenProps: {
                    type: "Icon",
                    id: "thumbs-up",
                    size: 16,
                    color: "blue",
                },
            });
        }
        // Provide a button to jump to the comment in GitHub
        valueComponents.push({
            type: "Button",
            label: "View on GitHub",
            variant: "outlined",
            size: "small",
            href: cmt.html_url,
        });
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a DataList for a clean, scrollable list UI
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=704.js.map