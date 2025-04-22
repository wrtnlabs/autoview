export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format ISO timestamps to a locale-aware string. Fallback to raw if invalid.
    const formatDateTime = (iso) => {
        try {
            const d = new Date(iso);
            if (isNaN(d.getTime()))
                throw new Error("Invalid date");
            return d.toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Map visibility to a Chip color for better visual distinction.
    const visibilityColorMap = {
        all: "success",
        private: "error",
        selected: "warning",
    };
    // Assemble each field into a DataListItem.
    const dataListItems = [];
    // 1. The secret variable value: show as code block via Markdown for readability.
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Value" },
        value: {
            type: "Markdown",
            content: [
                "",
                input.value,
                "```",
            ].join("\n"),
        },
    });
    // 2. Created timestamp.
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At" },
        value: {
            type: "Text",
            content: formatDateTime(input.created_at),
        },
    });
    // 3. Updated timestamp.
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Updated At" },
        value: {
            type: "Text",
            content: formatDateTime(input.updated_at),
        },
    });
    // 4. Visibility status rendered as a colored Chip.
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Visibility" },
        value: {
            type: "Chip",
            label: input.visibility,
            color: visibilityColorMap[input.visibility],
            variant: "filled",
        },
    });
    // 5. If present, provide a link to selected repositories.
    if (input.selected_repositories_url) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Repositories" },
            value: {
                type: "Button",
                label: "View",
                href: input.selected_repositories_url,
                variant: "text",
            },
        });
    }
    // Compose the overall UI as a vertical card with header and content.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Use the variable name as the card title.
                title: input.name,
                // Provide a brief description below the title.
                description: "GitHub Actions organization variable details",
                // An icon to indicate "secret"/"key" concept.
                startElement: {
                    type: "Icon",
                    id: "key",
                    color: "indigo",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Embed a DataList to display each attribute in a structured way.
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=417.js.map