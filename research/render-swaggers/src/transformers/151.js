export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no reviews, render a simple text message
    if (!input.data || input.data.length === 0) {
        return {
            type: "Text",
            content: "No reviews found.",
            variant: "body1",
        };
    }
    // Helper to map numeric score to a chip color
    const getScoreColor = (score) => {
        if (score >= 4)
            return "success";
        if (score >= 2)
            return "warning";
        return "error";
    };
    // Build a DataListItem for each review
    const items = input.data.map((review) => {
        // Label area: star icon, numeric score, and title
        const labelComponents = [
            {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16,
            },
            {
                type: "Chip",
                label: review.score.toString(),
                color: getScoreColor(review.score),
                size: "small",
                variant: "outlined",
            },
            {
                type: "Text",
                content: review.title,
                variant: "h6",
            },
        ];
        // Value area: markdown of the body, optional answer, and timestamps
        const valueComponents = [];
        // Render the review body as markdown for rich formatting
        if (review.body) {
            valueComponents.push({
                type: "Markdown",
                content: review.body,
            });
        }
        // If there's an answer, prefix with a heading in markdown
        if (review.answer !== null && review.answer !== undefined) {
            valueComponents.push({
                type: "Markdown",
                content: `**Answer:**\n\n${String(review.answer)}`,
            });
        }
        // Always include creation timestamp
        valueComponents.push({
            type: "Text",
            content: `Created at: ${review.created_at}`,
            variant: "caption",
        });
        // Include updated timestamp if it's different
        if (review.updated_at !== review.created_at) {
            valueComponents.push({
                type: "Text",
                content: `Updated at: ${review.updated_at}`,
                variant: "caption",
            });
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a DataList for display
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=151.js.map