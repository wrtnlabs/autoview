export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no data, inform the user via a simple markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No authors available\n\nThere is no author data to display."
        };
    }
    // Sort authors by display name for consistent ordering
    const sorted = [...input].sort((a, b) => a.name.localeCompare(b.name));
    // Map each author record into a DataListItem component
    const items = sorted.map(author => {
        // Construct an avatar; if no image URL is provided, the initials will be shown
        const avatar = {
            type: "Avatar",
            name: author.name,
            // we omit src if it's not an image URL to allow initials fallback
            variant: "primary",
            size: 40,
        };
        // Main label: avatar + author's name and remote handle
        const labelComponents = [
            avatar,
            {
                type: "Text",
                // Use an arrayable content: bold name followed by remote handle
                content: [
                    `**${author.name}**`,
                    { type: "Icon", id: "user", color: "gray", size: 12 },
                    ` ${author.remote_name}`
                ],
                variant: "body1",
                color: "primary",
            }
        ];
        // Action buttons: email and website link
        const actionButtons = [
            {
                type: "Button",
                label: "Email",
                variant: "text",
                color: "info",
                startElement: { type: "Icon", id: "envelope", color: "blue", size: 16 },
                // mailto link
                href: `mailto:${author.email}`
            },
            {
                type: "Button",
                label: "Website",
                variant: "text",
                color: "info",
                startElement: { type: "Icon", id: "external-link-alt", color: "blue", size: 16 },
                href: author.url
            }
        ];
        return {
            type: "DataListItem",
            // label is a horizontal row of avatar+text
            label: labelComponents,
            // value is the row of action buttons
            value: actionButtons
        };
    });
    // Wrap all items in a DataList container
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=766.js.map