export function transform($input) {
    return visualizeData($input);
}
// Function to transform a Schema.IShoppingSaleReview into an AutoView component tree.
function visualizeData(input) {
    // Safely pick the latest snapshot or provide a minimal fallback.
    const snapshots = input.snapshots || [];
    const latestSnapshot = snapshots.length > 0
        ? snapshots[snapshots.length - 1]
        : {
            id: "",
            score: 0,
            title: "",
            body: "",
            format: "txt",
            created_at: input.created_at,
            files: [],
        };
    // Attempt to extract a human‐readable name for the reviewer.
    // If 'citizen' or 'member' objects contain a 'name' property, use it.
    // Otherwise, fall back to the raw customer ID.
    let reviewerName = input.customer.id;
    if (input.customer.citizen && input.customer.citizen.name) {
        reviewerName = input.customer.citizen.name;
    }
    else if (input.customer.member && input.customer.member.name) {
        reviewerName = input.customer.member.name;
    }
    // Format the review timestamp for display.
    const reviewDateStr = new Date(latestSnapshot.created_at).toLocaleDateString();
    // Color‐code the score: green for high, amber for medium, red for low.
    const scoreColor = latestSnapshot.score >= 4
        ? "success"
        : latestSnapshot.score >= 2
            ? "warning"
            : "error";
    // Compose a vertical card that contains:
    // 1. CardHeader with avatar, title, and date.
    // 2. CardContent showing the review body as markdown.
    // 3. CardFooter with a score chip and metadata.
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header: reviewer avatar + title + review date
            {
                type: "CardHeader",
                title: latestSnapshot.title || "No Title",
                description: `Reviewed on ${reviewDateStr}`,
                startElement: {
                    type: "Avatar",
                    name: reviewerName,
                    variant: "primary",
                    size: 40,
                },
            },
            // Content: markdown body for rich text
            {
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: latestSnapshot.body || "_No content provided_",
                },
            },
            // Footer: score chip + channel + exact timestamp
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Chip",
                        label: String(latestSnapshot.score),
                        startElement: {
                            type: "Icon",
                            id: "star",
                            color: "yellow",
                        },
                        variant: "filled",
                        color: scoreColor,
                    },
                    {
                        type: "Text",
                        variant: "caption",
                        color: "secondary",
                        content: `Channel: ${input.customer.channel.name}`,
                    },
                    {
                        type: "Text",
                        variant: "caption",
                        color: "tertiary",
                        content: `At: ${latestSnapshot.created_at}`,
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=152.js.map