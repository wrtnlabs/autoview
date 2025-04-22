export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // When there are no reviews, show a friendly markdown message
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "### No reviews available\nThere are currently no reviews to display."
        };
    }
    // Helper: choose a chip color based on file format
    const getFormatColor = (format) => {
        switch (format) {
            case "html":
                return "orange";
            case "md":
                return "blue";
            case "txt":
                return "gray";
            default:
                return "secondary";
        }
    };
    // Map each review to a DataListItemProps for a clean, responsive list
    const listItems = input.data.map((review) => {
        // Format the creation date for readability
        const createdAt = new Date(review.created_at).toLocaleString();
        // Generate star icons based on the numeric score
        // We round the score to the nearest integer for display
        const stars = [];
        const starCount = Math.round(review.score);
        for (let i = 0; i < starCount; i++) {
            stars.push({
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16
            });
        }
        return {
            type: "DataListItem",
            // Label section: title and date
            label: [
                {
                    type: "Text",
                    variant: "subtitle1",
                    content: review.title
                },
                {
                    type: "Text",
                    variant: "caption",
                    content: createdAt
                }
            ],
            // Value section: format chip + star rating
            value: [
                {
                    type: "Chip",
                    label: review.format.toUpperCase(),
                    color: getFormatColor(review.format),
                    size: "small",
                    variant: "outlined"
                },
                // Spread star icons here
                ...stars
            ]
        };
    });
    // Return a DataList component to render all review items in a scrollable, responsive list
    return {
        type: "DataList",
        childrenProps: listItems
    };
}
//# sourceMappingURL=104.js.map