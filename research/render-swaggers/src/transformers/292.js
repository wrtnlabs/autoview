export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle arrays
    if (Array.isArray(input)) {
        // If array of image URLs, render a carousel of cards with images
        if (input.every(item => typeof item === 'string' && item.startsWith('http'))) {
            const childrenProps = input.map(url => ({
                type: 'HorizontalCard',
                childrenProps: { type: 'CardMedia', src: url }
            }));
            return {
                type: 'Carousel',
                childrenProps
            };
        }
        // Fallback: list each element in a DataList
        const childrenProps = input.map((item, idx) => ({
            type: 'DataListItem',
            label: [{ type: 'Text', content: [`Item ${idx}`] }],
            value: visualizeData(item)
        }));
        return {
            type: 'DataList',
            childrenProps
        };
    }
    // Handle objects (excluding null)
    if (input !== null && typeof input === 'object') {
        const childrenProps = [];
        for (const key of Object.keys(input)) {
            const value = input[key];
            // Label component for the key
            const label = [
                { type: 'Text', content: [key] }
            ];
            // Determine how to visualize the corresponding value
            let valueComp;
            if (typeof value === 'string') {
                if (value.startsWith('http')) {
                    // URL string -> Image
                    valueComp = { type: 'Image', src: value };
                }
                else if (value.length > 100) {
                    // Long text -> Markdown (better wrapping)
                    valueComp = { type: 'Markdown', content: value };
                }
                else {
                    // Short text -> Text
                    valueComp = { type: 'Text', content: [value] };
                }
            }
            else if (typeof value === 'number') {
                // Numeric value -> Chip
                valueComp = { type: 'Chip', label: String(value) };
            }
            else if (typeof value === 'boolean') {
                // Boolean -> Icon (check or times)
                valueComp = {
                    type: 'Icon',
                    id: value ? 'check' : 'times',
                    color: value ? 'green' : 'red'
                };
            }
            else {
                // Nested structure -> collapsible section
                valueComp = {
                    type: 'Collapse',
                    header: {
                        type: 'CollapseHeader',
                        childrenProps: [{ type: 'Text', content: [`${key} details`] }]
                    },
                    content: {
                        type: 'CollapseContent',
                        // Recursively visualize nested data
                        childrenProps: [
                            visualizeData(value)
                        ]
                    }
                };
            }
            childrenProps.push({
                type: 'DataListItem',
                label,
                value: valueComp
            });
        }
        // Render the object's key/value pairs as a DataList
        return {
            type: 'DataList',
            childrenProps
        };
    }
    // Fallback for primitives (null, undefined, symbol, etc.)
    const text = input == null ? 'N/A' : String(input);
    return {
        type: 'Text',
        content: [text]
    };
}
//# sourceMappingURL=292.js.map