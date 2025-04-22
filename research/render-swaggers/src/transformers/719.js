export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform ISO date strings into locale-specific, human-friendly formats.
    const createdAtLabel = new Date(input.created_at).toLocaleString();
    const updatedAtLabel = new Date(input.updated_at).toLocaleString();
    // Compose a data-list component showing the creation and update timestamps
    // with appropriate icons for visual clarity.
    const metadataList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                // Use a calendar icon to denote the creation timestamp
                label: {
                    type: "Icon",
                    id: "calendar", // FontAwesome icon name, kebab-case without fa-prefix
                    color: "blue",
                    size: 16
                },
                // Display the formatted creation date as muted body text
                value: {
                    type: "Text",
                    content: `Created: ${createdAtLabel}`,
                    variant: "body2",
                    color: "gray"
                }
            },
            {
                type: "DataListItem",
                // Use a sync icon to denote the last update timestamp
                label: {
                    type: "Icon",
                    id: "sync-alt",
                    color: "green",
                    size: 16
                },
                // Display the formatted update date as muted body text
                value: {
                    type: "Text",
                    content: `Updated: ${updatedAtLabel}`,
                    variant: "body2",
                    color: "gray"
                }
            }
        ]
    };
    // Return a vertical card that highlights the secret name in the header
    // and embeds the metadata list in its content area.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: input.name,
                // Display a key icon at the start of the header to reinforce the secret concept
                startElement: {
                    type: "Icon",
                    id: "key",
                    color: "orange",
                    size: 20
                }
            },
            {
                type: "CardContent",
                // Embed our metadata list directly; cards will render this responsively.
                childrenProps: metadataList
            }
        ]
    };
}
//# sourceMappingURL=719.js.map