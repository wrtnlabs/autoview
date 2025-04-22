export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Helper: Given a field name, return a suitable FontAwesome icon id.
     */
    function iconForKey(key) {
        switch (key.toLowerCase()) {
            case "limit":
                return "hourglass"; // indicates a limit
            case "remaining":
                return "battery-full"; // indicates remaining quota
            case "reset":
            case "reset_at":
            case "resetAt":
                return "clock"; // indicates a reset time
            default:
                return "info-circle"; // generic info icon
        }
    }
    /**
     * If the input is not an object (or is null), we fall back to rendering the raw JSON
     * as markdown, so the user can inspect whatever came back.
     */
    if (input === null || typeof input !== "object" || Array.isArray(input)) {
        return {
            type: "Markdown",
            content: "json\n" + JSON.stringify(input, null, 2) + "\n```",
        };
    }
    // Build DataListItem components for each top-level field
    const items = [];
    for (const key of Object.keys(input)) {
        // @ts-ignore: we don't know the exact shape, so index into input dynamically
        const rawValue = input[key];
        // Primitive values or Date objects: display directly
        let displayValue;
        if (rawValue instanceof Date) {
            displayValue = rawValue.toISOString();
        }
        else if (typeof rawValue === "string" ||
            typeof rawValue === "number" ||
            typeof rawValue === "boolean") {
            displayValue = String(rawValue);
        }
        else {
            // For nested objects/arrays, stringify compactly
            try {
                displayValue = JSON.stringify(rawValue);
            }
            catch (_a) {
                displayValue = String(rawValue);
            }
        }
        // Compose a label containing an icon + the field name
        const labelIcon = {
            type: "Icon",
            id: iconForKey(key),
            size: 16,
            color: "gray",
        };
        const labelText = {
            type: "Text",
            content: key,
            variant: "body2",
            color: "primary",
        };
        // Compose a chip to show the value
        const valueChip = {
            type: "Chip",
            label: displayValue,
            variant: "outlined",
            size: "small",
            color: "info",
        };
        // Assemble the DataListItem
        const item = {
            type: "DataListItem",
            // DataListItem.label can be either a single component or an array
            label: [
                labelIcon,
                {
                    type: "Text",
                    content: key.charAt(0).toUpperCase() + key.slice(1),
                    variant: "body1",
                    color: "secondary",
                },
            ],
            // Put the chip in the value slot
            value: valueChip,
        };
        items.push(item);
    }
    // If there were no fields (empty object), show a markdown note
    if (items.length === 0) {
        return {
            type: "Markdown",
            content: "> No data to display.",
        };
    }
    // Finally, return a DataList wrapping all items
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=771.js.map