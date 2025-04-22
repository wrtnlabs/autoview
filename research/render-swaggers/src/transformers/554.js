export function transform($input) {
    return visualizeData($input);
}
// Helper to create a DataListItem for a metric icon + count
function createMetricItem(icon, count, color) {
    return {
        type: "DataListItem",
        // label can be an array of presentation components
        label: [
            {
                type: "Icon",
                id: icon,
                size: 16,
                color,
            },
            {
                type: "Text",
                content: `${count}`,
                variant: "body2",
            },
        ],
    };
}
function visualizeData(input) {
    // Prepare the card header with repository name, privacy status, and owner avatar.
    const header = {
        type: "CardHeader",
        title: input.name,
        // Use emoji to visually distinguish private vs public
        description: input.private ? "🔒 Private repository" : "🌐 Public repository",
        // Show owner avatar if available
        startElement: input.owner && input.owner.avatar_url
            ? {
                type: "Avatar",
                src: input.owner.avatar_url,
                name: input.owner.login,
                variant: "primary",
                size: 40,
            }
            : undefined,
    };
    // Build the card content: description (markdown) + key metrics (star, watchers, forks)
    const contentChildren = [];
    if (input.description) {
        contentChildren.push({
            type: "Markdown",
            content: input.description,
        });
    }
    contentChildren.push({
        type: "DataList",
        childrenProps: [
            createMetricItem("star", input.stargazers_count, "yellow"),
            createMetricItem("eye", input.watchers_count, "cyan"),
            createMetricItem("code-branch", input.forks_count, "green"),
        ],
    });
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Footer with a single button linking to the GitHub repository
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            variant: "outlined",
            color: "primary",
            size: "small",
            label: "View on GitHub",
            startElement: {
                type: "Icon",
                id: "github",
                size: 16,
                color: "blue",
            },
            href: input.html_url,
        },
    };
    // Compose a vertical card assembling header, content, and footer for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=554.js.map