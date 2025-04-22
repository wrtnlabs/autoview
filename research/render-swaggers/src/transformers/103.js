export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Format the creation date for display
    const createdDate = new Date(input.created_at).toLocaleString();
    // Choose a chip color based on the review score
    let scoreColor;
    if (input.score >= 8)
        scoreColor = "green";
    else if (input.score >= 5)
        scoreColor = "orange";
    else
        scoreColor = "red";
    // Build the CardHeader: title, date, and a score chip
    const header = {
        type: "CardHeader",
        title: input.title,
        description: `Reviewed on ${createdDate}`,
        startElement: {
            type: "Chip",
            label: `${input.score}`,
            color: scoreColor,
            variant: "filled",
            size: "small",
        },
    };
    // Assemble the markdown body
    // If there are attachments, append them as markdown links under an "Attachments" heading
    let markdownContent = input.body;
    if (input.files && input.files.length > 0) {
        const listItems = input.files
            .map((file) => {
            const ext = file.extension ? `.${file.extension}` : "";
            // If the filename is empty (e.g. ".gitignore"), show placeholder text
            const filename = file.name !== "" ? file.name : "(no name)";
            return `- [${filename}${ext}](${file.url})`;
        })
            .join("\n");
        markdownContent += `\n\n### Attachments\n${listItems}`;
    }
    // Build the CardContent with a Markdown component
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: markdownContent,
        },
    };
    // Return a vertical card with header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=103.js.map