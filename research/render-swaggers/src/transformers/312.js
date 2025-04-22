export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: build a label consisting of an icon and a text component
    const createLabel = (text, iconId) => [
        {
            type: "Icon",
            id: iconId,
            size: 16,
            color: "blue",
        },
        {
            type: "Text",
            content: text,
            variant: "body1",
            color: "primary",
        },
    ];
    // Build list items for each field in the webhook config
    const items = [];
    // URL field: clickable link if provided, otherwise fallback text
    if (input.url) {
        items.push({
            type: "DataListItem",
            label: createLabel("URL", "link"),
            value: {
                type: "Button",
                variant: "text",
                href: input.url,
                label: input.url,
                size: "small",
                color: "blue",
            },
        });
    }
    else {
        items.push({
            type: "DataListItem",
            label: createLabel("URL", "link"),
            value: {
                type: "Text",
                content: "Not Configured",
                variant: "body2",
                color: "gray",
            },
        });
    }
    // Content type: styled chip or fallback text
    if (input.content_type) {
        items.push({
            type: "DataListItem",
            label: createLabel("Content Type", "file-alt"),
            value: {
                type: "Chip",
                label: input.content_type,
                variant: "outlined",
                color: "teal",
                size: "small",
            },
        });
    }
    else {
        items.push({
            type: "DataListItem",
            label: createLabel("Content Type", "file-alt"),
            value: {
                type: "Text",
                content: "Not Configured",
                variant: "body2",
                color: "gray",
            },
        });
    }
    // Secret: mask all characters for security, fallback if absent
    if (input.secret) {
        const masked = "*".repeat(input.secret.length);
        items.push({
            type: "DataListItem",
            label: createLabel("Secret", "key"),
            value: {
                type: "Text",
                content: masked,
                variant: "body2",
                color: "gray",
            },
        });
    }
    else {
        items.push({
            type: "DataListItem",
            label: createLabel("Secret", "key"),
            value: {
                type: "Text",
                content: "Not Configured",
                variant: "body2",
                color: "gray",
            },
        });
    }
    // Insecure SSL: interpret numeric or string flags; display as a colored chip
    if (input.insecure_ssl !== undefined) {
        const flag = input.insecure_ssl === 1 || input.insecure_ssl === "1";
        const enabled = flag;
        items.push({
            type: "DataListItem",
            label: createLabel("Insecure SSL", "shield-alt"),
            value: {
                type: "Chip",
                label: enabled ? "Enabled" : "Disabled",
                variant: "filled",
                color: enabled ? "warning" : "secondary",
                size: "small",
            },
        });
    }
    else {
        items.push({
            type: "DataListItem",
            label: createLabel("Insecure SSL", "shield-alt"),
            value: {
                type: "Text",
                content: "Not Configured",
                variant: "body2",
                color: "gray",
            },
        });
    }
    // Wrap the items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Compose the full UI as a vertical card with header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Webhook Configuration",
                startElement: {
                    type: "Icon",
                    id: "cog",
                    size: 20,
                    color: "indigo",
                },
            },
            {
                type: "CardContent",
                childrenProps: dataList,
            },
        ],
    };
}
//# sourceMappingURL=312.js.map