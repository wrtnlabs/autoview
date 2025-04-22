export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Construct a DataListItem for each devcontainer
    const dataListItems = input.devcontainers.map((dc) => {
        var _a, _b;
        // Derive a display name: prefer display_name, then name, then fallback to path
        const displayName = (_b = (_a = dc.display_name) !== null && _a !== void 0 ? _a : dc.name) !== null && _b !== void 0 ? _b : dc.path;
        return {
            type: 'DataListItem',
            // Left column: friendly name
            label: {
                type: 'Text',
                content: displayName,
            },
            // Right column: the actual filesystem path
            value: {
                type: 'Text',
                content: dc.path,
            },
        };
    });
    // Wrap the items in a DataList component
    const devcontainerList = {
        type: 'DataList',
        childrenProps: dataListItems,
    };
    // Header showing total count with a badge+icon
    const header = {
        type: 'CardHeader',
        title: `Devcontainers (${input.total_count})`,
        startElement: {
            type: 'Badge',
            count: input.total_count,
            showZero: true,
            childrenProps: {
                type: 'Icon',
                id: 'folder',
                color: 'blue',
                size: 20,
            },
        },
    };
    // If there are no devcontainers, show a friendly markdown message
    if (input.devcontainers.length === 0) {
        const emptyMessage = {
            type: 'Markdown',
            content: '### No devcontainers found.',
        };
        return {
            type: 'VerticalCard',
            childrenProps: [
                header,
                { type: 'CardContent', childrenProps: emptyMessage },
            ],
        };
    }
    // Return a vertical card with header and list of devcontainers
    return {
        type: 'VerticalCard',
        childrenProps: [
            header,
            { type: 'CardContent', childrenProps: devcontainerList },
        ],
    };
}
//# sourceMappingURL=688.js.map