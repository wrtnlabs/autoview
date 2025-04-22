export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no secrets, render a simple markdown message.
    if (!input.secrets || input.secrets.length === 0) {
        return {
            type: "Markdown",
            content: "### Dependabot Secrets\n\n_No secrets found in this repository._",
        };
    }
    // Transform each secret into a DataListItem with a label and a markdown-formatted value.
    const listItems = input.secrets.map((secret) => ({
        type: "DataListItem",
        // The secret name as the label.
        label: {
            type: "Text",
            content: secret.name,
        },
        // Render created/updated timestamps with Markdown for clearer formatting.
        value: {
            type: "Markdown",
            content: `**Created:** ${new Date(secret.created_at).toLocaleString()}` +
                `\n**Updated:** ${new Date(secret.updated_at).toLocaleString()}`,
        },
    }));
    // Compose a vertical card: header with icon/title/count, and content with the data list.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Dependabot Secrets",
                // A lock icon to indicate secret-related information.
                startElement: {
                    type: "Icon",
                    id: "lock",
                    color: "teal",
                    size: 24,
                },
                // Display the total count as a small filled chip.
                endElement: {
                    type: "Chip",
                    label: `${input.total_count}`,
                    color: "teal",
                    size: "small",
                    variant: "filled",
                },
            },
            {
                type: "CardContent",
                // Wrap the list of secrets in a DataList for a clean, responsive layout.
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=717.js.map