export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No labels to display\n\nThere are no labels available at this time."
        };
    }
    // Map each label object to a DataListItem
    const listItems = input.map((lbl) => {
        var _a;
        // Construct the description text, falling back if missing
        const descriptionText = (_a = lbl.description) !== null && _a !== void 0 ? _a : "No description provided.";
        return {
            type: "DataListItem",
            // Label section: an icon + the label name
            label: [
                {
                    type: "Icon",
                    id: "tag", // FontAwesome "tag" icon
                    size: 16,
                    color: "blue"
                },
                {
                    type: "Text",
                    content: lbl.name,
                    variant: "body1",
                    color: "primary"
                }
            ],
            // Value section: the label's description
            value: {
                type: "Text",
                content: descriptionText,
                variant: "body2",
                // Use gray for neutral, red if truly missing
                color: lbl.description ? "gray" : "error"
            }
        };
    });
    // Return a DataList component containing all label items
    return {
        type: "DataList",
        childrenProps: listItems
    };
}
//# sourceMappingURL=799.js.map