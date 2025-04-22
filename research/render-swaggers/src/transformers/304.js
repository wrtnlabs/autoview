export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Render any value as an AutoView component (or array of components).
     * Handles primitives, arrays, URLs, images, objects recursively.
     */
    function renderValue(value) {
        // Null or undefined
        if (value === null || value === undefined) {
            return {
                type: "Text",
                content: ["—"], // em dash for missing
                variant: "body2",
                color: "tertiary",
            };
        }
        // Array handling
        if (Array.isArray(value)) {
            // Array of objects? Render each as nested DataList
            if (value.every((item) => item && typeof item === "object")) {
                return value.map((item) => ({
                    type: "DataList",
                    childrenProps: toDataListItems(item),
                }));
            }
            // Primitive array: show as ChipGroup
            const chips = value.map((v) => ({
                type: "Chip",
                label: String(v),
                variant: "filled",
                size: "small",
            }));
            return {
                type: "ChipGroup",
                childrenProps: chips,
            };
        }
        // Object handling: nested list
        if (typeof value === "object") {
            return {
                type: "DataList",
                childrenProps: toDataListItems(value),
            };
        }
        // Primitive handling
        const text = String(value);
        // Boolean as icon
        if (typeof value === "boolean") {
            return {
                type: "Icon",
                id: value ? "check" : "times",
                color: value ? "green" : "red",
                size: 16,
            };
        }
        // Number as text
        if (typeof value === "number") {
            return {
                type: "Text",
                content: [text],
                variant: "body1",
                color: "primary",
            };
        }
        // String: detect image URL
        if (typeof value === "string") {
            // ISO date detection
            const isoDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(text);
            if (isoDate) {
                // format date for display
                const date = new Date(text);
                return {
                    type: "Text",
                    content: [date.toLocaleString()],
                    variant: "body2",
                    color: "secondary",
                };
            }
            // Image extension detection
            const imgExt = /\.(jpeg|jpg|gif|png|svg|webp)(\?.*)?$/i;
            const isUrl = /^https?:\/\//i.test(text);
            if (isUrl && imgExt.test(text)) {
                return {
                    type: "Image",
                    src: text,
                    alt: "",
                };
            }
            // URL but not image: render as link button
            if (isUrl) {
                return {
                    type: "Button",
                    href: text,
                    label: text,
                    variant: "text",
                    color: "primary",
                };
            }
            // Long or multi-line text: markdown
            if (text.includes("\n") || text.length > 100) {
                return {
                    type: "Markdown",
                    content: text,
                };
            }
            // Fallback simple text
            return {
                type: "Text",
                content: [text],
                variant: "body1",
                color: "primary",
            };
        }
        // Fallback for any other type
        return {
            type: "Text",
            content: [String(value)],
            variant: "body1",
            color: "tertiary",
        };
    }
    /**
     * Convert an object into DataListItemProps[]
     */
    function toDataListItems(obj) {
        const items = [];
        for (const key of Object.keys(obj)) {
            try {
                const value = obj[key];
                // Label for field name
                const labelComponent = {
                    type: "Text",
                    content: [key],
                    variant: "subtitle2",
                    color: "tertiary",
                };
                items.push({
                    type: "DataListItem",
                    label: [labelComponent],
                    value: renderValue(value),
                });
            }
            catch (_a) {
                // In case of unexpected errors rendering this field
                items.push({
                    type: "DataListItem",
                    label: [
                        {
                            type: "Text",
                            content: [key],
                            variant: "subtitle2",
                            color: "error",
                        },
                    ],
                    value: {
                        type: "Text",
                        content: ["<render error>"],
                        variant: "body2",
                        color: "error",
                    },
                });
            }
        }
        return items;
    }
    // Top-level: if input is not object, just render its value
    if (input === null || input === undefined || typeof input !== "object") {
        const single = renderValue(input);
        // wrap single in a DataList for consistency
        return {
            type: "DataList",
            childrenProps: [
                {
                    type: "DataListItem",
                    label: [
                        {
                            type: "Text",
                            content: ["Value"],
                            variant: "subtitle2",
                            color: "tertiary",
                        },
                    ],
                    value: single,
                },
            ],
        };
    }
    // Main object: render as DataList
    return {
        type: "DataList",
        childrenProps: toDataListItems(input),
    };
}
//# sourceMappingURL=304.js.map