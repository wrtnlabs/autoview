export function transform($input) {
    return visualizeData($input);
}
// Transforms GitHub installation data into a visual VerticalCard with a header and a DataList of installations.
function visualizeData(input) {
    // Map each installation to a DataListItemProps
    const listItems = input.installations.map(inst => {
        var _a;
        // Attempt to extract login and avatar_url from the account object
        const account = inst.account;
        const login = (_a = account === null || account === void 0 ? void 0 : account.login) !== null && _a !== void 0 ? _a : "Unknown";
        // Label: display the user/organization login
        const label = [
            {
                type: "Text",
                content: login,
                variant: "h5"
            }
        ];
        // Value: a series of visual components
        const value = [];
        // 1) Avatar (if available)
        if (account === null || account === void 0 ? void 0 : account.avatar_url) {
            value.push({
                type: "Avatar",
                src: account.avatar_url,
                name: login,
                size: 32,
                variant: "primary"
            });
        }
        // 2) Repository selection as a colored chip
        value.push({
            type: "Chip",
            label: inst.repository_selection === "all" ? "All repositories" : "Selected repositories",
            variant: "filled",
            color: inst.repository_selection === "all" ? "success" : "warning",
            size: "small"
        });
        // 3) Number of subscribed events as a badge around a bell icon
        value.push({
            type: "Badge",
            count: inst.events.length,
            childrenProps: {
                type: "Icon",
                id: "bell",
                color: "gray",
                size: 16
            },
            color: "info",
            maxCount: 99,
            showZero: false
        });
        // 4) Created and updated timestamps rendered via markdown for emphasis
        const created = new Date(inst.created_at).toLocaleDateString();
        const updated = new Date(inst.updated_at).toLocaleDateString();
        value.push({
            type: "Markdown",
            content: `**Created:** ${created}  
**Updated:** ${updated}`
        });
        // 5) Link to GitHub page for this installation
        value.push({
            type: "Markdown",
            content: `[View on GitHub](${inst.html_url})`
        });
        return {
            type: "DataListItem",
            label,
            value
        };
    });
    // Card header showing overall summary
    const header = {
        type: "CardHeader",
        title: "GitHub Installations",
        description: `Total count: ${input.total_count}`,
        startElement: {
            type: "Icon",
            id: "server",
            color: "cyan",
            size: 24
        }
    };
    // Card content wrapping the DataList
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems
        }
    };
    // Wrap everything in a vertical card for a clean, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=952.js.map