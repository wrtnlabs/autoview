export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no autolinks, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No autolink references found.**"
        };
    }
    // Map each autolink entry to a ListItem component
    const listItems = input.map((link) => {
        // Badge around the link icon to show the autolink ID
        const badge = {
            type: "Badge",
            count: link.id,
            // show the link icon as the badge child
            childrenProps: {
                type: "Icon",
                id: "link",
                color: "blue",
                size: 20,
            },
            // don't show zero badge, but IDs start from 1
            showZero: false,
        };
        // Chip to indicate whether this autolink matches alphanumeric or numeric-only
        const alnumChip = {
            type: "Chip",
            label: link.is_alphanumeric ? "Alphanumeric" : "Numeric Only",
            color: link.is_alphanumeric ? "success" : "info",
            size: "small",
            variant: "outlined",
        };
        // Compose the list item
        return {
            type: "ListItem",
            title: link.key_prefix,
            description: link.url_template,
            // visually emphasize the ID+icon at the start
            startElement: badge,
            // show the type of match as a chip at the end
            endElement: alnumChip,
        };
    });
    // Return the list container with all items
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=624.js.map