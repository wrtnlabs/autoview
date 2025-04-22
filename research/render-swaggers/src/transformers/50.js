export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Attempt to parse and format the creation date for readability
    const parsedDate = new Date(input.created_at);
    const formattedDate = isNaN(parsedDate.getTime())
        ? input.created_at // fallback to raw string if invalid
        : parsedDate.toLocaleString();
    // Build a vertical card to present section information in a compact, mobile-friendly layout
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // CardHeader with an avatar and title/description
                type: "CardHeader",
                title: input.name,
                description: `Code: ${input.code}`,
                startElement: {
                    // Use an avatar showing the first letter of the section name
                    type: "Avatar",
                    name: input.name,
                    variant: "primary",
                    size: 40
                }
            },
            {
                // CardContent contains a Markdown component for rich text presentation
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    // Use markdown to emphasize the label and value
                    content: [
                        `**ID:** \`${input.id}\``,
                        `**Created at:** ${formattedDate}`
                    ].join("\n\n")
                }
            }
        ]
    };
}
//# sourceMappingURL=50.js.map