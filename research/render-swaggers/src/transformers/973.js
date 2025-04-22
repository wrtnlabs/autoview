export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // 1. Card Header: show project name, number/state, and creator avatar if available
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `#${input.number} • ${input.state}`,
        // Conditionally include avatar when creator exists
        startElement: input.creator
            ? {
                type: "Avatar",
                src: input.creator.avatar_url,
                name: input.creator.login,
                size: 40,
                variant: "primary",
            }
            : undefined,
    };
    // 2. Card Content: use Markdown to render the project body or a placeholder
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: (_a = input.body) !== null && _a !== void 0 ? _a : "*No description provided.*",
        },
    };
    // 3. Format timestamps for footer display
    const createdAt = new Date(input.created_at).toLocaleString();
    const updatedAt = new Date(input.updated_at).toLocaleString();
    // 4. Build a data list of creation and update times
    const dateListItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Created",
                variant: "caption",
                color: "gray",
            },
            value: {
                type: "Text",
                content: createdAt,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Updated",
                variant: "caption",
                color: "gray",
            },
            value: {
                type: "Text",
                content: updatedAt,
                variant: "body2",
            },
        },
    ];
    // 5. Card Footer: include the data list and a link button to GitHub
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "DataList",
                childrenProps: dateListItems,
            },
            {
                type: "Button",
                variant: "text",
                size: "small",
                href: input.html_url,
                label: "View on GitHub",
                startElement: {
                    type: "Icon",
                    id: "external-link-alt",
                    size: 16,
                    color: "gray",
                },
            },
        ],
    };
    // 6. Assemble the vertical card with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=973.js.map