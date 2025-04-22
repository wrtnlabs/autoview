export function transform($input) {
    return visualizeData($input);
}
// Transforms arbitrary input into a visualization using AutoView components.
// Heuristics:
//  - Primitives → Text
//  - Arrays → DataList of JSON‐rendered items
//  - Objects  → Card with header (detect name/avatar) + DataList of fields
//  - Strings matching URL/image → Image or Avatar
//  - Other objects → Markdown‐code blocks
function visualizeData(input) {
    // 1) Primitive fallback → simple Text
    if (input === null || typeof input !== "object") {
        return {
            type: "Text",
            content: String(input),
        };
    }
    // 2) Array → DataList of items
    if (Array.isArray(input)) {
        const items = input.map((item, idx) => ({
            type: "DataListItem",
            label: [{ type: "Text", content: `Item ${idx + 1}`, variant: "subtitle2" }],
            value: {
                type: "Markdown",
                content: "json\n" + JSON.stringify(item, null, 2) + "\n```",
            },
        }));
        return {
            type: "DataList",
            childrenProps: items,
        };
    }
    // 3) Object → build a card with header (name/avatar) + content (list of remaining fields)
    const obj = input;
    const keys = Object.keys(obj);
    // Heuristic: look for name/title and any image/avatar URL
    const nameKey = keys.find(k => /name$/i.test(k) || /title$/i.test(k));
    const imageKey = keys.find(k => /(avatar|image|uri|url)$/i.test(k) && typeof obj[k] === "string");
    // Build CardHeader
    const header = {
        type: "CardHeader",
    };
    if (nameKey) {
        header.title = String(obj[nameKey]);
    }
    if (imageKey) {
        // use Avatar for profile‐like images
        header.startElement = {
            type: "Avatar",
            src: String(obj[imageKey]),
        };
    }
    // Build DataListItems for all other keys
    const restKeys = keys.filter(k => k !== nameKey && k !== imageKey);
    const dataItems = restKeys.map(k => {
        const val = obj[k];
        let valueProp;
        // URL string → Image
        if (typeof val === "string" && /^(https?:\/\/|data:image\/)/.test(val)) {
            valueProp = { type: "Image", src: val };
        }
        // Nested object/array → JSON‐code block
        else if (typeof val === "object") {
            valueProp = {
                type: "Markdown",
                content: "```json\n" + JSON.stringify(val, null, 2) + "\n```",
            };
        }
        // Fallback primitive → Text
        else {
            valueProp = { type: "Text", content: String(val) };
        }
        return {
            type: "DataListItem",
            label: [{ type: "Text", content: k, variant: "subtitle2" }],
            value: valueProp,
        };
    });
    // Wrap items in a DataList inside CardContent
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataItems,
        },
    };
    // Final responsive card
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=298.js.map