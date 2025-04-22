export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Construct a DataList to present autolink fields as a responsive definition list.
    // Each item uses visual components (Chip, Icon, Markdown) for clarity and engagement.
    // ID field displayed as a labeled Chip
    const idItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "ID"
        },
        value: {
            type: "Chip",
            label: input.id.toString(),
            // Use secondary color to make the ID stand out
            color: "secondary",
            variant: "filled",
            size: "small"
        }
    };
    // Key prefix field displayed as a Chip
    const prefixItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Key Prefix"
        },
        value: {
            type: "Chip",
            label: input.key_prefix,
            color: "info",
            variant: "outlined",
            size: "small"
        }
    };
    // URL template shown as formatted code block via Markdown for readability
    const urlTemplateItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "URL Template"
        },
        value: {
            type: "Markdown",
            content: [
                "text",
                input.url_template,
                "```"
            ].join("\n")
        }
    };
    // Alphanumeric flag displayed as a green check or red cross icon
    const alnumItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Alphanumeric"
        },
        value: {
            type: "Icon",
            id: input.is_alphanumeric ? "check-circle" : "times-circle",
            color: input.is_alphanumeric ? "green" : "red",
            size: 20
        }
    };
    // Return the composed DataList component
    return {
        type: "DataList",
        childrenProps: [
            idItem,
            prefixItem,
            urlTemplateItem,
            alnumItem
        ]
    };
}
//# sourceMappingURL=625.js.map