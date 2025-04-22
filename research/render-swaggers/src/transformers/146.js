export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Transform each snapshot into a DataListItem for visual display
    const snapshotItems = (_b = (_a = input.snapshots) === null || _a === void 0 ? void 0 : _a.map((snapshot) => {
        // Header label components: timestamp and format chip
        const labelComponents = [
            {
                type: "Text",
                // Show when this snapshot was created
                content: `At ${new Date(snapshot.created_at).toLocaleString()}`,
                variant: "subtitle2",
            },
            {
                type: "Chip",
                label: snapshot.format.toUpperCase(),
                size: "small",
                variant: "outlined",
            },
        ];
        // Markdown component for the body content
        const bodyComponent = {
            type: "Markdown",
            content: snapshot.body,
        };
        // If there are attachments, render them as a group of chips
        const fileChips = snapshot.files.map((file) => ({
            type: "Chip",
            label: file.name + (file.extension ? `.${file.extension}` : ""),
            size: "small",
            variant: "outlined",
        }));
        // Only include the chip group if there are files
        const fileChipsGroup = fileChips.length > 0
            ? {
                type: "ChipGroup",
                childrenProps: fileChips,
                // Show up to 5 chips, collapse the rest
                maxItems: 5,
            }
            : undefined;
        // Compose the value section: markdown body and optional file group
        const valueComponents = [
            bodyComponent,
        ];
        if (fileChipsGroup)
            valueComponents.push(fileChipsGroup);
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    })) !== null && _b !== void 0 ? _b : [];
    // If there are no snapshots, show a friendly message
    if (snapshotItems.length === 0) {
        return {
            type: "VerticalCard",
            childrenProps: {
                type: "CardContent",
                childrenProps: {
                    type: "Text",
                    content: "No snapshots available for this comment.",
                    variant: "body2",
                },
            },
        };
    }
    // DataList wrapping all snapshot items
    const dataList = {
        type: "DataList",
        childrenProps: snapshotItems,
    };
    // Card header showing the comment ID and parent relationship
    const header = {
        type: "CardHeader",
        title: `Comment ID: ${input.id}`,
        description: input.parent_id ? `Reply to: ${input.parent_id}` : undefined,
        startElement: {
            type: "Icon",
            id: "comment",
            size: 24,
            color: "blue",
        },
    };
    // Card content embedding the DataList of snapshots
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Assemble everything into a VerticalCard for a responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=146.js.map