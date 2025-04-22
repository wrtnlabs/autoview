export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to create a Text component
    const makeText = (content, variant = "body2", color) => ({
        type: "Text",
        content,
        variant,
        color,
    });
    // Helper to format ISO date strings for readability
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "—";
    // Build the DataList items, each with a label and a value component
    const listItems = [];
    // App Slug
    listItems.push({
        type: "DataListItem",
        label: [makeText("App Slug", "subtitle2")],
        value: makeText(input.app_slug, "body2"),
    });
    // Repository selection
    listItems.push({
        type: "DataListItem",
        label: [makeText("Repository Selection", "subtitle2")],
        value: makeText(input.repository_selection, "body2"),
    });
    // Target info
    listItems.push({
        type: "DataListItem",
        label: [makeText("Target", "subtitle2")],
        value: makeText(`${input.target_type} (ID: ${input.target_id})`, "body2"),
    });
    // URLs section: render as Markdown links for better UX
    listItems.push({
        type: "DataListItem",
        label: [makeText("Links", "subtitle2")],
        value: {
            type: "Markdown",
            content: `- [Access Tokens](${input.access_tokens_url})\n` +
                `- [Repositories](${input.repositories_url})\n` +
                `- [HTML Dashboard](${input.html_url})`,
        },
    });
    // Created and updated timestamps
    listItems.push({
        type: "DataListItem",
        label: [makeText("Created At", "subtitle2")],
        value: makeText(formatDate(input.created_at), "body2"),
    });
    listItems.push({
        type: "DataListItem",
        label: [makeText("Updated At", "subtitle2")],
        value: makeText(formatDate(input.updated_at), "body2"),
    });
    // Events: display as a group of Chips for quick scanning
    if (input.events && input.events.length > 0) {
        const chips = input.events.map((evt) => ({
            type: "Chip",
            label: evt,
            variant: "filled",
            size: "small",
        }));
        listItems.push({
            type: "DataListItem",
            label: [makeText("Events", "subtitle2")],
            value: {
                type: "ChipGroup",
                childrenProps: chips,
            },
        });
    }
    // Permissions: collapse large JSON into a Markdown code block
    if (input.permissions) {
        listItems.push({
            type: "DataListItem",
            label: [makeText("Permissions", "subtitle2")],
            value: {
                type: "Markdown",
                content: "json\n" +
                    JSON.stringify(input.permissions, null, 2) +
                    "\n```",
            },
        });
    }
    // Single-file info
    if (input.single_file_name) {
        listItems.push({
            type: "DataListItem",
            label: [makeText("Single File", "subtitle2")],
            value: makeText(input.single_file_name, "body2"),
        });
        if (input.has_multiple_single_files && Array.isArray(input.single_file_paths)) {
            // show additional paths as markdown list
            const mdList = input.single_file_paths
                .map((p) => `- ${p}`)
                .join("\n");
            listItems.push({
                type: "DataListItem",
                label: [makeText("Other Files", "subtitle2")],
                value: {
                    type: "Markdown",
                    content: mdList,
                },
            });
        }
    }
    // Suspension info
    if (input.suspended_by) {
        listItems.push({
            type: "DataListItem",
            label: [makeText("Suspended By", "subtitle2")],
            value: makeText(input.suspended_by.login, "body2"),
        });
        listItems.push({
            type: "DataListItem",
            label: [makeText("Suspended At", "subtitle2")],
            value: makeText(formatDate(input.suspended_at), "body2"),
        });
    }
    // Contact email if present
    if (input.contact_email) {
        listItems.push({
            type: "DataListItem",
            label: [makeText("Contact Email", "subtitle2")],
            value: makeText(input.contact_email, "body2"),
        });
    }
    // Compose the final VerticalCard with a header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: `Installation #${input.id}`,
                description: `App ID: ${input.app_id}`,
                // Use the suspended_by avatar if available, otherwise fall back to a generic user icon
                startElement: input.suspended_by
                    ? {
                        type: "Avatar",
                        src: input.suspended_by.avatar_url,
                        name: input.suspended_by.login,
                    }
                    : {
                        type: "Icon",
                        id: "user",
                    },
            },
            {
                type: "CardContent",
                // Embed a DataList for all key/value pairs
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=317.js.map