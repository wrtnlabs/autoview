export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Prepare chips for environment flags: production and transient
    const envChips = [];
    if (input.production_environment) {
        envChips.push({
            type: "Chip",
            label: "Production",
            color: "success",
            variant: "filled",
            size: "small",
        });
    }
    if (input.transient_environment) {
        envChips.push({
            type: "Chip",
            label: "Transient",
            color: "warning",
            variant: "filled",
            size: "small",
        });
    }
    // Build a list of key/value pairs for deployment details
    const details = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "ID" },
            value: { type: "Text", content: String(input.id) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Ref" },
            value: { type: "Text", content: input.ref },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "SHA" },
            // Show a short SHA for readability
            value: { type: "Text", content: input.sha.substring(0, 7) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Task" },
            value: { type: "Text", content: input.task },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created" },
            // Format dates to local string for legibility
            value: { type: "Text", content: new Date(input.created_at).toLocaleString() },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated" },
            value: { type: "Text", content: new Date(input.updated_at).toLocaleString() },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Statuses" },
            value: {
                type: "Button",
                label: "View statuses",
                href: input.statuses_url,
                variant: "text",
                size: "small",
                endElement: {
                    type: "Icon",
                    id: "arrow-right",
                    size: 16,
                    color: "blue",
                },
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Repository" },
            value: {
                type: "Button",
                label: "View repo",
                href: input.repository_url,
                variant: "text",
                size: "small",
                endElement: {
                    type: "Icon",
                    id: "arrow-right",
                    size: 16,
                    color: "blue",
                },
            },
        },
    ];
    // Compose the vertical card UI
    const ui = {
        type: "VerticalCard",
        childrenProps: [
            // Header: shows environment name, optional description, and creator avatar
            {
                type: "CardHeader",
                title: input.environment,
                description: (_a = input.description) !== null && _a !== void 0 ? _a : undefined,
                startElement: input.creator && input.creator.avatar_url
                    ? {
                        type: "Avatar",
                        src: input.creator.avatar_url,
                        name: input.creator.login,
                        variant: "primary",
                        size: 40,
                    }
                    : undefined,
            },
            // Content: include environment chips (if any) and a list of details
            {
                type: "CardContent",
                childrenProps: [
                    // Show environment flags
                    ...(envChips.length
                        ? [
                            {
                                type: "ChipGroup",
                                childrenProps: envChips,
                                maxItems: envChips.length,
                            },
                        ]
                        : []),
                    // Detailed data list
                    {
                        type: "DataList",
                        childrenProps: details,
                    },
                ],
            },
        ],
    };
    return ui;
}
//# sourceMappingURL=725.js.map