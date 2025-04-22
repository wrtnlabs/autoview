export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to build an icon-text pair for labels
    const makeLabel = (iconId, text) => [
        {
            type: "Icon",
            id: iconId,
            size: 16,
            color: "gray"
        },
        {
            type: "Text",
            content: text,
            variant: "body2",
            color: "gray"
        }
    ];
    // Build DataListItem for URL
    const urlValue = input.url
        ? {
            type: "Button",
            variant: "text",
            size: "small",
            color: "primary",
            href: input.url,
            startElement: {
                type: "Icon",
                id: "link",
                size: 16,
                color: "blue"
            },
            label: input.url
        }
        : {
            type: "Text",
            content: "Not configured",
            variant: "body2",
            color: "gray"
        };
    // Build DataListItem for Content Type
    const contentTypeValue = input.content_type
        ? {
            type: "Chip",
            label: input.content_type,
            variant: "filled",
            color: "primary",
            size: "small"
        }
        : {
            type: "Text",
            content: "Not configured",
            variant: "body2",
            color: "gray"
        };
    // Build DataListItem for Secret
    const secretValue = input.secret
        ? {
            type: "Chip",
            label: "Provided",
            variant: "outlined",
            color: "success",
            size: "small",
            startElement: {
                type: "Icon",
                id: "lock",
                size: 16,
                color: "green"
            }
        }
        : {
            type: "Chip",
            label: "Not provided",
            variant: "outlined",
            color: "gray",
            size: "small",
            startElement: {
                type: "Icon",
                id: "lock-open",
                size: 16,
                color: "gray"
            }
        };
    // Build DataListItem for Insecure SSL
    const insecureValue = input.insecure_ssl != null
        ? {
            type: "Chip",
            label: String(input.insecure_ssl),
            variant: "outlined",
            color: String(input.insecure_ssl) === "0" ? "success" : "error",
            size: "small",
            startElement: {
                type: "Icon",
                id: "exclamation-triangle",
                size: 16,
                color: String(input.insecure_ssl) === "0" ? "green" : "red"
            }
        }
        : {
            type: "Text",
            content: "Not configured",
            variant: "body2",
            color: "gray"
        };
    // Compose DataList items
    const items = [
        {
            type: "DataListItem",
            label: makeLabel("link", "Delivery URL"),
            value: urlValue
        },
        {
            type: "DataListItem",
            label: makeLabel("file-code", "Content Type"),
            value: contentTypeValue
        },
        {
            type: "DataListItem",
            label: makeLabel("key", "Secret"),
            value: secretValue
        },
        {
            type: "DataListItem",
            label: makeLabel("shield-alt", "Insecure SSL"),
            value: insecureValue
        }
    ];
    // Wrap items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Card header with title and icon
    const header = {
        type: "CardHeader",
        title: "Webhook Configuration",
        startElement: {
            type: "Icon",
            id: "rss",
            size: 24,
            color: "teal"
        }
    };
    // Card content containing the DataList
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Final responsive vertical card
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=760.js.map