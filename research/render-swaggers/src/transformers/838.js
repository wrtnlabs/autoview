export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Choose an avatar for the PR author or fallback to a user icon
    const startElement = input.user && input.user.avatar_url
        ? {
            type: "Avatar",
            src: input.user.avatar_url,
            name: input.user.login,
            variant: "primary",
            size: 40,
        }
        : {
            type: "Icon",
            id: "user",
            size: 40,
            color: "gray",
        };
    // Format timestamps for display
    const createdAt = new Date(input.created_at).toLocaleString();
    const updatedAt = new Date(input.updated_at).toLocaleString();
    // Build chips for each label; we cap the displayed color palette to gray since
    // GitHub label colors are arbitrary hex strings and our UI accepts a fixed set.
    const labelChips = (input.labels || []).map((label) => ({
        type: "Chip",
        label: label.name,
        variant: "filled",
        size: "small",
        color: "gray",
    }));
    // Assemble rows of key/value pairs using a DataList
    const listItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: { type: "Text", content: createdAt },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At" },
            value: { type: "Text", content: updatedAt },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Base Branch" },
            value: { type: "Text", content: input.base.ref },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Head Branch" },
            value: { type: "Text", content: input.head.ref },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Repository" },
            value: {
                type: "Text",
                // Use full_name when available, fallback to name
                content: input.base.repo.full_name || input.base.repo.name,
            },
        },
    ];
    // Only show labels row if there are any labels
    if (labelChips.length > 0) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Labels" },
            value: {
                type: "ChipGroup",
                childrenProps: labelChips,
                maxItems: 5, // collapse if too many
            },
        });
    }
    // Construct the final VerticalCard for the pull request
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with title, number & state, and author avatar
                type: "CardHeader",
                title: input.title,
                description: `#${input.number} ${input.state.toUpperCase()}`,
                startElement,
            },
            {
                // Content: a data list of details
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: listItems,
                    },
                ],
            },
            {
                // Footer: action button to view on GitHub
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        label: "View on GitHub",
                        variant: "contained",
                        color: "primary",
                        href: input.html_url,
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=838.js.map