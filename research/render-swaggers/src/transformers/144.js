export function transform($input) {
    return visualizeData($input);
}
// Transforms a shopping sale inquiry answer into an AutoView component tree.
function visualizeData(input) {
    // Attempt to format the creation timestamp for readability.
    let formattedDate = input.created_at;
    try {
        const d = new Date(input.created_at);
        if (!isNaN(d.getTime()))
            formattedDate = d.toLocaleString();
    }
    catch (_a) {
        // swallow any formatting errors and fall back to raw string
    }
    // Build a list item for each snapshot in the answer's history.
    const snapshotItems = input.snapshots.map(snapshot => {
        // If there are attachments, render them as markdown links under the body.
        const attachmentsMd = snapshot.files && snapshot.files.length > 0
            ? "\n\n**Attachments:**\n" +
                snapshot.files
                    .map(file => {
                    const ext = file.extension ? `.${file.extension}` : "";
                    const name = file.name || "(no name)";
                    return `- [${name}${ext}](${file.url})`;
                })
                    .join("\n")
            : "";
        // Merge the body and attachments into one markdown string.
        const markdownBody = `${snapshot.body}${attachmentsMd}`;
        return {
            type: "DataListItem",
            // Use a heading text component to show the snapshot title.
            label: [
                {
                    type: "Text",
                    variant: "h6",
                    content: [snapshot.title],
                },
            ],
            // Render the body (and attachments) via the markdown component.
            value: [
                {
                    type: "Markdown",
                    content: markdownBody,
                },
            ],
        };
    });
    // If there are no snapshots, show a friendly placeholder.
    const dataList = {
        type: "DataList",
        childrenProps: snapshotItems.length > 0
            ? snapshotItems
            : [
                {
                    type: "DataListItem",
                    label: [
                        {
                            type: "Text",
                            variant: "body2",
                            content: ["No snapshots available."],
                        },
                    ],
                },
            ],
    };
    // Card header shows seller ID and when the answer was created.
    const cardHeader = {
        type: "CardHeader",
        title: `Seller: ${input.seller.id}`,
        description: `Answered on ${formattedDate}`,
        // A simple user icon to make the header more visual.
        startElement: {
            type: "Icon",
            id: "user",
            color: "blue",
            size: 32,
        },
    };
    // Card content holds the chronological list of snapshots.
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Card footer summarizes the answer ID and snapshot count.
    const cardFooter = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Text",
                variant: "caption",
                content: [`Answer ID: ${input.id}`],
            },
            {
                type: "Text",
                variant: "caption",
                content: [`Total snapshots: ${input.snapshots.length}`],
            },
        ],
    };
    // Assemble everything into a vertical card for responsive rendering.
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=144.js.map