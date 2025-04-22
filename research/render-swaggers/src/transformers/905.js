export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare list items for key metrics
    const dataListItems = [];
    // Privacy level, if provided
    if (input.privacy) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Privacy", variant: "body2" },
            value: {
                type: "Chip",
                label: input.privacy,
                variant: "filled",
                color: "secondary",
                size: "small",
            },
        });
    }
    // Team permission
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Permission", variant: "body2" },
        value: {
            type: "Chip",
            label: input.permission,
            variant: "outlined",
            color: "primary",
            size: "small",
        },
    });
    // Member count with an icon wrapped in a badge
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Members", variant: "body2" },
        value: {
            type: "Badge",
            count: input.members_count,
            // wrap a user icon inside the badge
            childrenProps: {
                type: "Icon",
                id: "users",
                size: 16,
                color: "blue",
            },
        },
    });
    // Repository count
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Repositories", variant: "body2" },
        value: {
            type: "Text",
            content: String(input.repos_count),
            variant: "body2",
        },
    });
    // Creation date
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created", variant: "body2" },
        value: {
            type: "Text",
            content: new Date(input.created_at).toLocaleDateString(),
            variant: "body2",
        },
    });
    // Last updated date
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Updated", variant: "body2" },
        value: {
            type: "Text",
            content: new Date(input.updated_at).toLocaleDateString(),
            variant: "body2",
        },
    });
    // Compose the card header with organization avatar and team name
    const cardHeader = {
        type: "CardHeader",
        title: input.name,
        description: input.slug,
        startElement: {
            type: "Avatar",
            src: input.organization.avatar_url,
            name: input.organization.login,
        },
        // Show the team permission as a chip on the header
        endElement: {
            type: "Chip",
            label: input.permission,
            variant: "outlined",
            color: "primary",
            size: "medium",
        },
    };
    // Compose the main content: optional description + data list
    const contentChildren = [];
    if (input.description) {
        contentChildren.push({
            type: "Markdown",
            content: input.description,
        });
    }
    contentChildren.push({
        type: "DataList",
        childrenProps: dataListItems,
    });
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Footer with a button linking to GitHub
    const cardFooter = {
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
                color: "gray",
            },
            href: input.html_url,
        },
    };
    // Wrap everything in a vertical card for a responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=905.js.map