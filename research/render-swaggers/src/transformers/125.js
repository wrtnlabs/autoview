export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    /**
     * Map each journey type to a font-awesome icon.
     * You can adjust icon names to match your available set.
     */
    const typeIconMap = {
        preparing: { type: 'Icon', id: 'box-open', color: 'blue', size: 24 },
        manufacturing: { type: 'Icon', id: 'industry', color: 'orange', size: 24 },
        shipping: { type: 'Icon', id: 'truck', color: 'teal', size: 24 },
        delivering: { type: 'Icon', id: 'home', color: 'green', size: 24 },
    };
    /**
     * Format an ISO date-time string into a localized human-readable form.
     * If the value is null or undefined, returns "N/A".
     */
    function formatDate(dateTime) {
        if (!dateTime)
            return 'N/A';
        const d = new Date(dateTime);
        // toLocaleString will adapt to user's locale and is responsive
        return isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleString();
    }
    /**
     * Capitalize the first letter of a word.
     */
    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    // Build the CardHeader: uses an icon, title, and optional description.
    const header = Object.assign(Object.assign({ type: 'CardHeader', title: (_a = input.title) !== null && _a !== void 0 ? _a : capitalize(input.type) }, (input.description ? { description: input.description } : {})), { startElement: (_b = typeIconMap[input.type]) !== null && _b !== void 0 ? _b : { type: 'Icon', id: 'info-circle' } });
    // Prepare a DataList of key fields: type, started_at, completed_at
    const listItems = [
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Journey Type' },
            value: { type: 'Text', content: capitalize(input.type) },
        },
        {
            type: 'DataListItem',
            label: { type: 'Icon', id: 'calendar-day', color: 'blue', size: 16 },
            value: { type: 'Text', content: formatDate(input.started_at) },
        },
        {
            type: 'DataListItem',
            label: { type: 'Icon', id: 'check-circle', color: 'green', size: 16 },
            value: { type: 'Text', content: formatDate(input.completed_at) },
        },
    ];
    const content = {
        type: 'CardContent',
        // Use a DataList for structured display; it's responsive on small screens.
        childrenProps: {
            type: 'DataList',
            childrenProps: listItems,
        },
    };
    // Assemble a vertical card: header + content.
    return {
        type: 'VerticalCard',
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=125.js.map