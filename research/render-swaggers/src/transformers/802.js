export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Create the card header with a tag icon, the label name, and optional description.
    const header = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.description) !== null && _a !== void 0 ? _a : "",
        startElement: {
            type: "Icon",
            id: "tag", // Use the "tag" icon to represent a label
            size: 24,
            color: "gray",
        },
    };
    // Build a markdown snippet for the details of the label.
    // We include HTML for a small color swatch using a div with inline styles.
    // Markdown components generally allow basic HTML for styling.
    const markdownContent = `
**Label ID:** \`${input.id}\`  
**Node ID:** \`${input.node_id}\`  
**Default:** \`${input.default}\`  
**URL:** [View on GitHub](${input.url})  

**Description:**  
${input.description ? input.description : "_No description provided._"}

**Color Preview:**  
<div style="display:inline-block;width:24px;height:24px;border:1px solid #ccc;background-color:#${input.color};vertical-align:middle;"></div> \`#${input.color}\`
`;
    const content = {
        type: "Markdown",
        content: markdownContent,
    };
    // Assemble a vertical card with the header and content.
    // This layout will be responsive on mobile devices.
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                // CardContent accepts an array of presentation components; here we pass a single Markdown block.
                childrenProps: [content],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=802.js.map