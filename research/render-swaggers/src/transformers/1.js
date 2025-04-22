export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure the system info input for easy access
    const { uid, arguments: argsArray, commit, package: pkg, created_at } = input;
    // Convert arguments array to a human-readable string
    const argsString = argsArray.length ? argsArray.join(' ') : '(none)';
    // Prepare DataList items to display key pieces of system information
    const listItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "UID",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: uid.toString(),
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Created At",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: created_at,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Arguments",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: argsString,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Commit",
                variant: "body2",
            },
            value: [
                // Commit subject with markdown styling to highlight the message
                {
                    type: "Markdown",
                    content: `**${commit.subject}**`,
                },
                // Short hash in a code-like Chip
                {
                    type: "Chip",
                    label: commit.shortHash,
                    size: "small",
                    variant: "outlined",
                    color: "secondary",
                },
            ],
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Author",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: `${commit.author.name} <${commit.author.email}>`,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Committed At",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: commit.committed_at,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Package",
                variant: "body2",
            },
            value: [
                // Package name
                {
                    type: "Text",
                    content: pkg.name,
                    variant: "body2",
                },
                // Version as a visual chip
                {
                    type: "Chip",
                    label: pkg.version,
                    size: "small",
                    variant: "outlined",
                    color: "primary",
                },
            ],
        },
    ];
    // Compose the main card structure: a vertical card with a header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "System Information",
                description: `UID: ${uid}`,
                // Use an illustrative icon for system/server
                startElement: {
                    type: "Icon",
                    id: "server",
                    size: 28,
                    color: "blue",
                },
            },
            {
                type: "CardContent",
                // Embed our data list to display the detailed info
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=1.js.map