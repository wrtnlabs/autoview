export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Determine if a string looks like an image URL.
     */
    function isImageUrl(value) {
        return /^https?:\/\/.*\.(png|jpg|jpeg|gif|svg)(\?.*)?$/.test(value);
    }
    /**
     * Wrap a primitive or structured value into an AutoView component.
     */
    function visualizeValue(value) {
        if (value == null) {
            // Represent null/undefined as muted text
            return {
                type: "Text",
                content: "—",
                color: "gray"
            };
        }
        // Array: render as nested DataList
        if (Array.isArray(value)) {
            const children = value.map((item, index) => ({
                type: "DataListItem",
                label: [{ type: "Text", content: String(index) }],
                value: visualizeValue(item)
            }));
            return {
                type: "DataList",
                childrenProps: children
            };
        }
        // Image URL
        if (typeof value === "string" && isImageUrl(value)) {
            return {
                type: "Image",
                src: value,
                alt: ""
            };
        }
        // Plain object: render as nested VerticalCard
        if (typeof value === "object") {
            // For nested objects, fallback to markdown JSON for brevity
            const json = JSON.stringify(value, null, 2);
            return {
                type: "Markdown",
                content: "json\n" + json + "\n```"
            };
        }
        // Primitive (number/boolean/string)
        const text = String(value);
        // For long or multiline strings, use Markdown
        if (text.length > 80 || text.includes("\n")) {
            return {
                type: "Markdown",
                content: text
            };
        }
        // Short inline text
        return {
            type: "Text",
            content: text
        };
    }
    /**
     * Convert an object into DataListItemProps array.
     */
    function objectToListItems(obj) {
        return Object.keys(obj).map((key) => {
            const val = obj[key];
            return {
                type: "DataListItem",
                // Label is the property name
                label: [{ type: "Text", content: key }],
                // Value is visualized accordingly
                value: visualizeValue(val)
            };
        });
    }
    // Root visualization decision:
    // - If input is array: show a DataList
    // - If input is object: show as VerticalCard with header & content
    // - Otherwise: render as a single markdown/text component
    if (Array.isArray(input)) {
        return {
            type: "DataList",
            childrenProps: input.map((item, idx) => ({
                type: "DataListItem",
                label: [{ type: "Text", content: String(idx) }],
                value: visualizeValue(item)
            }))
        };
    }
    if (input && typeof input === "object") {
        // Attempt to derive title/description
        const title = typeof input.title === "string"
            ? input.title
            : typeof input.name === "string"
                ? input.name
                : undefined;
        const description = typeof input.description === "string"
            ? input.description
            : undefined;
        // Build card header if there is either
        const header = Object.assign(Object.assign({ type: "CardHeader" }, (title ? { title } : {})), (description ? { description } : {}));
        // Build content: a DataList of all other properties
        const listItems = objectToListItems(input);
        const content = {
            type: "CardContent",
            childrenProps: {
                type: "DataList",
                childrenProps: listItems
            }
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content]
        };
    }
    // Primitive fallback: use markdown for display
    const primitive = visualizeValue(input);
    // Wrap in a CardContent so it fits consistent container
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardContent",
                childrenProps: primitive
            }
        ]
    };
}
//# sourceMappingURL=295.js.map