export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    /**
     * Helper to create a DataListItem with an icon and text.
     * iconId: FontAwesome icon name (kebab-case, without prefix).
     * label: Label text.
     * value: String value to display.
     */
    function createDataListItem(iconId, label, value) {
        return {
            type: "DataListItem",
            // Label cell: icon + text
            label: [
                {
                    type: "Icon",
                    id: iconId,
                    color: "teal",
                    size: 20,
                },
                {
                    type: "Text",
                    content: label,
                },
            ],
            // Value cell: plain text
            value: {
                type: "Text",
                content: value,
            },
        };
    }
    // Build list items for fields that exist
    const dataItems = [];
    // Always display key_id
    dataItems.push(createDataListItem("fingerprint", "Key ID", input.key_id));
    // Optional numeric ID (converted to string)
    if (input.id !== undefined) {
        dataItems.push(createDataListItem("hashtag", "Record ID", String(input.id)));
    }
    // Optional URL (clickable link)
    if (input.url) {
        dataItems.push(createDataListItem("link", "API URL", input.url));
    }
    // Optional creation timestamp (formatted)
    if (input.created_at) {
        // Try to parse into a human-readable form; fallback to raw
        let createdAtText;
        try {
            const date = new Date(input.created_at);
            createdAtText = isNaN(date.getTime())
                ? input.created_at
                : date.toLocaleString();
        }
        catch (_b) {
            createdAtText = input.created_at;
        }
        dataItems.push(createDataListItem("calendar", "Created At", createdAtText));
    }
    // Card header: show title or default, plus creation date subtitle
    const cardHeader = {
        type: "CardHeader",
        title: (_a = input.title) !== null && _a !== void 0 ? _a : "Public Key Details",
        description: input.created_at ? new Date(input.created_at).toLocaleDateString() : undefined,
        startElement: {
            type: "Icon",
            id: "key",
            color: "blue",
            size: 24,
        },
    };
    // DataList component to show structured fields
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Markdown component to display the Base64 key in a code block
    const keyMarkdown = {
        type: "Markdown",
        content: [
            "#### Public Key\n",
            "base64\n",
            input.key,
            "\n```",
        ].join(""),
    };
    // Card content aggregates the DataList and the key code block
    const cardContent = {
        type: "CardContent",
        childrenProps: [dataList, keyMarkdown],
    };
    // Wrap everything in a vertical card for a responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return card;
}
//# sourceMappingURL=411.js.map