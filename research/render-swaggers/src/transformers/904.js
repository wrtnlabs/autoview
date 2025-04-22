export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure for convenience
    const { organization, members_count, repos_count, permission, privacy, created_at, updated_at, parent } = input;
    // Compose the card header with organization avatar and team name/slug
    const header = {
        type: "CardHeader",
        title: input.name,
        // Use slug as subtitle; description may be null so we omit if absent
        description: input.slug,
        startElement: {
            type: "Avatar",
            src: organization.avatar_url,
            name: organization.login,
        },
    };
    // Helper to build a simple Text component
    const makeText = (text) => ({
        type: "Text",
        content: text,
        variant: "body2",
    });
    // Build data list items for members, repositories, permission, privacy, dates, parent
    const listItems = [];
    // Members count with a chip and user icon
    listItems.push({
        type: "DataListItem",
        label: [makeText("Members")],
        value: {
            type: "Chip",
            label: String(members_count),
            startElement: { type: "Icon", id: "users" },
        },
    });
    // Repositories count
    listItems.push({
        type: "DataListItem",
        label: [makeText("Repositories")],
        value: {
            type: "Chip",
            label: String(repos_count),
            startElement: { type: "Icon", id: "book" },
        },
    });
    // Permission level
    listItems.push({
        type: "DataListItem",
        label: [makeText("Permission")],
        value: {
            type: "Chip",
            label: permission,
            variant: "outlined",
        },
    });
    // Privacy level, if provided
    if (privacy) {
        listItems.push({
            type: "DataListItem",
            label: [makeText("Privacy")],
            value: {
                type: "Chip",
                label: privacy,
                variant: "outlined",
            },
        });
    }
    // Parent team, if exists
    if (parent && typeof parent === "object") {
        listItems.push({
            type: "DataListItem",
            label: [makeText("Parent Team")],
            value: {
                type: "Text",
                content: parent.name,
                variant: "body2",
            },
        });
    }
    // Format dates using locale for readability
    const createdDate = new Date(created_at).toLocaleDateString();
    const updatedDate = new Date(updated_at).toLocaleDateString();
    listItems.push({
        type: "DataListItem",
        label: [makeText("Created")],
        value: makeText(createdDate),
    });
    listItems.push({
        type: "DataListItem",
        label: [makeText("Updated")],
        value: makeText(updatedDate),
    });
    // Wrap list items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Compose card content with the data list
    const content = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Footer with a link button to GitHub
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            href: input.html_url,
            label: "View on GitHub",
            startElement: { type: "Icon", id: "github" },
        },
    };
    // Return a vertical card that neatly organizes header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=904.js.map