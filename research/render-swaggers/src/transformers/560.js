export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build header with project column name and an icon indicating it's a column.
    const header = {
        type: "CardHeader",
        title: input.name,
        // Use a simple icon to the left of the title to visually identify this as a column.
        startElement: {
            type: "Icon",
            id: "columns", // assuming FontAwesome 'columns' icon is available
            color: "blue",
            size: 24,
        },
        // Show the column ID as a small outlined chip on the right
        endElement: {
            type: "Chip",
            label: `#${input.id}`,
            variant: "outlined",
            size: "small",
            color: "gray",
        },
    };
    // Prepare a markdown block for creation and update timestamps.
    // Markdown allows simple styling and better mobile wrapping than plain text.
    const timestampsMarkdown = {
        type: "Markdown",
        content: `- **Created**: ${new Date(input.created_at).toLocaleString()}` +
            `\n- **Updated**: ${new Date(input.updated_at).toLocaleString()}`,
    };
    // Assemble action buttons; only include those URLs that are present.
    const actionButtons = [];
    if (input.url) {
        actionButtons.push({
            type: "Button",
            label: "Open Column",
            href: input.url,
            variant: "text",
            color: "primary",
        });
    }
    if (input.cards_url) {
        actionButtons.push({
            type: "Button",
            label: "View Cards",
            href: input.cards_url,
            variant: "text",
            color: "primary",
        });
    }
    if (input.project_url) {
        actionButtons.push({
            type: "Button",
            label: "Open Project",
            href: input.project_url,
            variant: "text",
            color: "primary",
        });
    }
    // Footer contains the set of action buttons. On narrow screens, buttons will wrap.
    const footer = {
        type: "CardFooter",
        childrenProps: actionButtons,
    };
    // Combine header, markdown content, and footer into a vertical card.
    const card = {
        type: "VerticalCard",
        childrenProps: [header, { type: "CardContent", childrenProps: timestampsMarkdown }, footer],
    };
    return card;
}
//# sourceMappingURL=560.js.map