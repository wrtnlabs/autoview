export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare display values, falling back to a friendly placeholder if empty
    const keyIdDisplay = input.key_id && input.key_id.trim().length > 0
        ? input.key_id
        : "Not provided";
    const publicKeyDisplay = input.key && input.key.trim().length > 0
        ? input.key
        : "Not provided";
    // Build a DataListItem for a generic field
    function buildDataListItem(label, valueComponent) {
        return {
            type: "DataListItem",
            // Use a Text component for the label
            label: {
                type: "Text",
                content: label,
                variant: "subtitle2",
                color: "tertiary",
            },
            // The value may be a Text or Markdown component
            value: valueComponent,
        };
    }
    // Use a Markdown block to nicely format the public key as code
    const publicKeyMarkdown = {
        type: "Markdown",
        content: publicKeyDisplay === "Not provided"
            // No code formatting if missing
            ? "**Public Key:** Not provided"
            : [
                "#### Public Key",
                "text",
                publicKeyDisplay,
                "```"
            ].join("\n")
    };
    // Assemble the DataList with two items: Key ID and Public Key
    const dataList = {
        type: "DataList",
        childrenProps: [
            buildDataListItem("Key ID", {
                type: "Text",
                content: keyIdDisplay,
                variant: "body1",
                color: "primary",
            }),
            buildDataListItem("Public Key", publicKeyMarkdown)
        ]
    };
    // Compose a VerticalCard to wrap the information
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with a key icon and title
                type: "CardHeader",
                title: "Codespaces Public Key",
                description: "Your GitHub Codespaces public key",
                startElement: {
                    type: "Icon",
                    id: "key",
                    color: "blue",
                    size: 32,
                }
            },
            {
                // Content holds the DataList
                type: "CardContent",
                childrenProps: dataList
            }
        ]
    };
}
//# sourceMappingURL=932.js.map