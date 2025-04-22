export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Aggregate totals for the pie chart
    const totalAll = input.all.reduce((sum, v) => sum + v, 0);
    const totalOwner = input.owner.reduce((sum, v) => sum + v, 0);
    // Build a mermaid pie chart to summarize participation
    // Mermaid is supported in Markdown, which will render a pie chart in the browser.
    const mermaidContent = [
        'mermaid',
        'pie title Participation Summary',
        `  "Owner" : ${totalOwner}`,
        `  "Others": ${totalAll - totalOwner}`,
        '```',
    ].join('\n');
    // Build a DataList where each item shows index and two chips (All vs Owner)
    const items = input.all.map((countAll, idx) => {
        var _a;
        // If owner array is shorter, default missing values to 0
        const countOwner = (_a = input.owner[idx]) !== null && _a !== void 0 ? _a : 0;
        // Two chips: one for "All" and one for "Owner" with distinct colors
        const chipAll = {
            type: 'Chip',
            label: `All: ${countAll}`,
            color: 'blue',
            variant: 'filled',
        };
        const chipOwner = {
            type: 'Chip',
            label: `Owner: ${countOwner}`,
            color: 'green',
            variant: 'filled',
        };
        return {
            type: 'DataListItem',
            // Label shows the item index (1-based)
            label: {
                type: 'Text',
                content: [`#${idx + 1}`],
            },
            // Value is a ChipGroup displaying the two chips side by side
            value: {
                type: 'ChipGroup',
                childrenProps: [chipAll, chipOwner],
            },
        };
    });
    // Compose the overall DataList component
    const dataList = {
        type: 'DataList',
        childrenProps: items,
    };
    // Markdown component to render our pie chart
    const markdown = {
        type: 'Markdown',
        content: mermaidContent,
    };
    // Card header with an icon and title
    const header = {
        type: 'CardHeader',
        title: 'Participation Stats',
        startElement: {
            type: 'Icon',
            id: 'chart-pie', // FontAwesome pie chart icon
            color: 'teal',
            size: 24,
        },
    };
    // Card content combining the pie chart and the detailed list
    const content = {
        type: 'CardContent',
        childrenProps: [markdown, dataList],
    };
    // Return a vertical card that contains our header and content
    return {
        type: 'VerticalCard',
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=882.js.map