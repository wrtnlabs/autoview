export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to format ISO date strings into a human-friendly format.
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }
        catch (_a) {
            return iso;
        }
    };
    // Build a DataListItem for each registry configuration.
    const dataListItems = input.configurations.map((cfg) => {
        // Build Markdown content for the details of each configuration.
        const lines = [
            `**Type:** ${cfg.registry_type}`,
            `**Visibility:** ${cfg.visibility}`,
            cfg.username != null ? `**Username:** ${cfg.username}` : "",
            `**Created At:** ${formatDate(cfg.created_at)}`,
            `**Updated At:** ${formatDate(cfg.updated_at)}`,
        ].filter((line) => line !== "");
        return {
            type: "DataListItem",
            // Use a Text component for the item label.
            label: {
                type: "Text",
                content: cfg.name,
                variant: "body1",
                color: "primary",
            },
            // Use a Markdown component for the value to leverage bold and lists.
            value: {
                type: "Markdown",
                content: lines.join("\n\n"),
            },
        };
    });
    // Compose the final UI as a VerticalCard with a header and a data list.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Private Registry Configurations",
                description: `Total: ${input.total_count}`,
                // Prepend an icon to visually represent configurations.
                startElement: {
                    type: "Icon",
                    id: "cog",
                    color: "blue",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Embed a DataList to lay out each configuration as key-value entries.
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=499.js.map