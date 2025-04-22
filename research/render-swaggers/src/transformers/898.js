export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Build a list of key repository stats as DataListItem components
    const stats = [];
    // Stars
    stats.push({
        type: "DataListItem",
        label: { type: "Text", content: "Stars", variant: "body2" },
        value: {
            type: "Chip",
            label: input.stargazers_count.toString(),
            // show a star icon before the number
            startElement: { type: "Icon", id: "star", color: "yellow", size: 16 },
        },
    });
    // Forks
    stats.push({
        type: "DataListItem",
        label: { type: "Text", content: "Forks", variant: "body2" },
        value: {
            type: "Chip",
            label: input.forks_count.toString(),
            // use a branch icon if available
            startElement: { type: "Icon", id: "code-branch", color: "cyan", size: 16 },
        },
    });
    // Watchers
    stats.push({
        type: "DataListItem",
        label: { type: "Text", content: "Watchers", variant: "body2" },
        value: {
            type: "Chip",
            label: input.watchers_count.toString(),
            startElement: { type: "Icon", id: "eye", color: "blue", size: 16 },
        },
    });
    // Open issues
    stats.push({
        type: "DataListItem",
        label: { type: "Text", content: "Open Issues", variant: "body2" },
        value: {
            type: "Chip",
            label: input.open_issues_count.toString(),
            startElement: { type: "Icon", id: "exclamation-circle", color: "red", size: 16 },
        },
    });
    // Language (if present)
    if (input.language) {
        stats.push({
            type: "DataListItem",
            label: { type: "Text", content: "Language", variant: "body2" },
            value: {
                type: "Chip",
                label: input.language,
                color: "green",
            },
        });
    }
    // Visibility
    const visibilityLabel = input.private ? "Private" : "Public";
    stats.push({
        type: "DataListItem",
        label: { type: "Text", content: "Visibility", variant: "body2" },
        value: {
            type: "Chip",
            label: visibilityLabel,
            color: input.private ? "red" : "success",
        },
    });
    // Build the main Card layout
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Header with repo name, description, and owner avatar
            {
                type: "CardHeader",
                title: input.full_name,
                description: (_a = input.description) !== null && _a !== void 0 ? _a : undefined,
                startElement: {
                    type: "Avatar",
                    src: input.owner.avatar_url,
                    name: input.owner.login,
                },
            },
            // Content section with a DataList of stats
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: stats,
                },
            },
            // Footer with a button to open the repo in GitHub
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    variant: "outlined",
                    color: "primary",
                    label: "View on GitHub",
                    href: input.html_url,
                    startElement: { type: "Icon", id: "github", size: 20, color: "gray" },
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=898.js.map