export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Helper to convert bytes into human-readable string.
     * E.g. 1024 => "1.00 KB", 1048576 => "1.00 MB"
     */
    function formatBytes(bytes) {
        const thresholds = [
            { unit: 'GB', value: 1024 ** 3 },
            { unit: 'MB', value: 1024 ** 2 },
            { unit: 'KB', value: 1024 },
        ];
        for (const { unit, value } of thresholds) {
            if (bytes >= value) {
                return `${(bytes / value).toFixed(2)} ${unit}`;
            }
        }
        return `${bytes} B`;
    }
    // Build a list of DataListItemProps to display various fields.
    const listItems = [];
    // ID
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Database ID",
        },
        value: {
            type: "Text",
            variant: "body2",
            content: input.id.toString(),
        },
    });
    // Size
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Size",
        },
        value: {
            type: "Text",
            variant: "body2",
            content: formatBytes(input.size),
        },
    });
    // Created at
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Created",
        },
        value: {
            type: "Text",
            variant: "body2",
            content: new Date(input.created_at).toLocaleString(),
        },
    });
    // Updated at
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Updated",
        },
        value: {
            type: "Text",
            variant: "body2",
            content: new Date(input.updated_at).toLocaleString(),
        },
    });
    // Commit OID, if present
    if (input.commit_oid) {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "body2",
                content: "Commit SHA",
            },
            value: {
                type: "Text",
                variant: "body2",
                content: input.commit_oid,
            },
        });
    }
    // Download URL as a button
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Download",
        },
        value: {
            type: "Button",
            variant: "contained",
            color: "primary",
            size: "small",
            label: "Download",
            href: input.url,
            startElement: {
                type: "Icon",
                id: "download",
                color: "blue",
                size: 16,
            },
        },
    });
    // Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Compose the card header: name, language, and uploader avatar
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Language: ${input.language}`,
        startElement: {
            type: "Avatar",
            src: input.uploader.avatar_url,
            name: input.uploader.login,
            size: 40,
        },
        // Show content type as a chip on the header's end
        endElement: {
            type: "Chip",
            label: input.content_type,
            variant: "outlined",
            size: "small",
        },
    };
    // Card content holds the detailed list
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Finally, return a vertical card presenting all the information
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=677.js.map