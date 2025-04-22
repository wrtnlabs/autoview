export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // 1. Compose the card header: display the label name, optional description,
    //    an icon to denote "label", and a chip indicating whether it's a default label.
    const header = Object.assign(Object.assign({ type: "CardHeader", 
        // Use a tag icon to visually indicate that this is a label
        startElement: {
            type: "Icon",
            id: "tag",
            color: "gray",
            size: 24,
        }, title: input.name }, (input.description
        ? { description: input.description }
        : {})), { 
        // End element: chip indicating default vs. custom label
        endElement: {
            type: "Chip",
            label: input.default ? "Default" : "Custom",
            color: input.default ? "success" : "warning",
            variant: "filled",
        } });
    // 2. Build a data list with the rest of the properties: id, node_id, url, and color hex
    const listItems = [];
    // ID field
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "ID" },
        value: {
            type: "Text",
            content: input.id.toString(),
        },
    });
    // Node ID field
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Node ID" },
        value: {
            type: "Text",
            content: input.node_id,
        },
    });
    // URL field: render as a text-button for easy tapping on mobile
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "URL" },
        value: {
            type: "Button",
            variant: "text",
            label: input.url,
            href: input.url,
        },
    });
    // Color hex field: show the hex code; 
    // for stronger visual, we could add a colored dot via markdown or emoji, but here we stick to plain code.
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Color" },
        value: {
            type: "Text",
            content: `#${input.color}`,
        },
    });
    // 3. Wrap the items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // 4. Place the DataList inside CardContent
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // 5. Compose the full vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=801.js.map