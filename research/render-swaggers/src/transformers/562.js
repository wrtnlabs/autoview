export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format ISO date-time into local date string
    const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
    // Build avatar or fallback icon for the creator
    const creatorAvatar = input.creator
        ? {
            type: "Avatar",
            src: input.creator.avatar_url,
            name: input.creator.login,
            size: 40,
        }
        : {
            type: "Icon",
            id: "user",
            size: 40,
            color: "gray",
        };
    // Build an 'Archived' chip if the card is archived
    const archivedChip = input.archived
        ? {
            type: "Chip",
            label: "Archived",
            color: "error",
            size: "small",
            variant: "outlined",
        }
        : undefined;
    // Prepare markdown for notes and additional details
    const noteContent = input.note && input.note.trim() !== ""
        ? input.note.trim()
        : "_No notes provided_";
    const detailLines = [];
    if (input.column_name) {
        detailLines.push(`- **Column:** ${input.column_name}`);
    }
    if (input.project_id) {
        detailLines.push(`- **Project ID:** ${input.project_id}`);
    }
    if (input.content_url) {
        detailLines.push(`- **Content URL:** [Open](${input.content_url})`);
    }
    // Always show last updated
    detailLines.push(`- **Created:** ${formatDate(input.created_at)}`);
    detailLines.push(`- **Updated:** ${formatDate(input.updated_at)}`);
    const markdown = {
        type: "Markdown",
        content: `### Notes\n` +
            `${noteContent}\n\n` +
            `### Details\n` +
            detailLines.join("\n"),
    };
    // Build action buttons in the footer
    const buttons = [
        {
            type: "Button",
            label: "View Card",
            href: input.url,
            variant: "outlined",
            color: "primary",
            startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
        },
        {
            type: "Button",
            label: "View Project",
            href: input.project_url,
            variant: "outlined",
            color: "primary",
            startElement: { type: "Icon", id: "folder-open", size: 16, color: "blue" },
        },
    ];
    if (input.content_url) {
        buttons.push({
            type: "Button",
            label: "Open Content",
            href: input.content_url,
            variant: "text",
            color: "secondary",
            startElement: { type: "Icon", id: "file", size: 16, color: "gray" },
        });
    }
    // Compose the CardHeader
    const header = Object.assign({ type: "CardHeader", title: `Card #${input.id}`, description: formatDate(input.created_at), startElement: creatorAvatar }, (archivedChip ? { endElement: archivedChip } : {}));
    // Compose the CardContent with markdown
    const content = {
        type: "CardContent",
        childrenProps: markdown,
    };
    // Compose the CardFooter with action buttons
    const footer = {
        type: "CardFooter",
        childrenProps: buttons,
    };
    // Return a vertical card aggregating header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=562.js.map