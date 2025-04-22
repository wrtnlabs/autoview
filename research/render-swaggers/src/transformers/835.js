export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Derive display values based on merge status
    const title = input.merged ? "Pull Request Merged" : "Merge Failed";
    const iconId = input.merged ? "check-circle" : "times-circle";
    const iconColor = input.merged ? "green" : "red";
    // A data list to break out individual fields in a clean, vertical layout
    const detailsList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: { type: "Text", content: "Status" },
                value: {
                    type: "Icon",
                    id: iconId,
                    color: iconColor,
                    size: 20,
                },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Commit SHA" },
                value: { type: "Text", content: input.sha },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Message" },
                value: {
                    // Use Markdown to preserve any rich formatting in the merge message
                    type: "Markdown",
                    content: input.message && input.message.trim().length > 0
                        ? input.message
                        : "_No message provided_",
                },
            },
        ],
    };
    // Wrap everything in a vertical card for a concise, mobile-friendly summary
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title,
                description: `Commit: ${input.sha.substr(0, 7)}`, // Show a short SHA in header
                startElement: {
                    type: "Icon",
                    id: iconId,
                    color: iconColor,
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Embed the DataList directly in card content
                childrenProps: detailsList,
            },
        ],
    };
    return card;
}
//# sourceMappingURL=835.js.map