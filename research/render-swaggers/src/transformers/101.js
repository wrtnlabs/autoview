export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to format ISO date strings into a user‐friendly format
    const formatDate = (iso) => {
        const d = new Date(iso);
        // Fallback: if invalid date, return original string
        return isNaN(d.getTime()) ? iso : d.toLocaleDateString();
    };
    // If there are no reviews, render a simple Markdown message
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "### No reviews found.\n\nThere are no sale reviews to display at this time."
        };
    }
    // Card header with icon and summary
    const header = {
        type: "CardHeader",
        title: "Customer Reviews",
        description: `Total Reviews: ${input.data.length}`,
        startElement: {
            type: "Icon",
            id: "comments",
            color: "indigo",
            size: 24
        }
    };
    // For each review, create a DataList mapping key→value for main fields
    const reviewBlocks = input.data.map((review) => {
        const answered = review.answer != null;
        const items = [
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Score"], variant: "subtitle2" },
                value: {
                    type: "Chip",
                    label: review.score.toString(),
                    size: "small",
                    color: "yellow",
                    variant: "filled",
                    startElement: { type: "Icon", id: "star", color: "yellow", size: 16 }
                }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Title"], variant: "subtitle2" },
                value: { type: "Text", content: [review.title], variant: "body1" }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Customer ID"], variant: "subtitle2" },
                value: { type: "Text", content: [review.customer.id], variant: "body2" }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Channel"], variant: "subtitle2" },
                value: {
                    type: "Chip",
                    label: review.customer.channel.name,
                    size: "small",
                    color: "teal",
                    variant: "filled"
                }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Created At"], variant: "subtitle2" },
                value: {
                    type: "Text",
                    content: [formatDate(review.created_at)],
                    variant: "caption",
                    color: "gray"
                }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Read by Seller"], variant: "subtitle2" },
                value: {
                    type: "Icon",
                    id: review.read_by_seller ? "check-circle" : "times-circle",
                    color: review.read_by_seller ? "green" : "red",
                    size: 20
                }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Answered"], variant: "subtitle2" },
                value: {
                    type: "Icon",
                    id: answered ? "comment-dots" : "comment-slash",
                    color: answered ? "blue" : "gray",
                    size: 20
                }
            }
        ];
        return {
            type: "DataList",
            childrenProps: items
        };
    });
    // Card content wraps all the DataList blocks
    const content = {
        type: "CardContent",
        childrenProps: reviewBlocks
    };
    // Card footer with pagination info
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Text",
            content: [`Page ${input.pagination.current} of ${input.pagination.pages}`],
            variant: "caption",
            color: "secondary"
        }
    };
    // Assemble into a vertical card for a clean, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=101.js.map