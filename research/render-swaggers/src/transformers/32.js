export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to format ISO date strings into a human-readable form
    const formatDate = (iso) => {
        try {
            const d = new Date(iso);
            return d.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }
        catch (_a) {
            // Fallback to raw string if parsing fails
            return iso;
        }
    };
    const reviews = input.data || [];
    // If there are no reviews, provide a simple text notification
    if (reviews.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No reviews found.",
        };
    }
    // Build a list of items for the List component
    const listItems = reviews.map((review) => {
        // Determine color of the score chip based on score thresholds
        let scoreColor = "primary";
        if (review.score >= 4)
            scoreColor = "success";
        else if (review.score >= 2)
            scoreColor = "warning";
        else
            scoreColor = "error";
        // Icon to indicate whether the seller has read the review
        const readIcon = {
            type: "Icon",
            id: review.read_by_seller ? "eye" : "eye-slash",
            color: review.read_by_seller ? "green" : "gray",
            size: 16,
        };
        // Avatar showing the channel as an initial or fallback text
        const channelAvatar = {
            type: "Avatar",
            name: review.customer.channel.name,
            variant: "info",
            size: 32,
        };
        // Secondary actions: score chip and read-status icon
        const endElements = [
            {
                type: "Chip",
                label: `Score: ${review.score}`,
                color: scoreColor,
                size: "small",
                variant: "filled",
            },
            readIcon,
        ];
        return {
            type: "ListItem",
            // Primary text is the review title
            title: review.title,
            // Subtitle contains customer ID and creation date
            description: `By ${review.customer.id} on ${formatDate(review.created_at)}`,
            // Show the channel avatar on the left
            startElement: channelAvatar,
            // Show score and read-status on the right
            endElement: endElements,
            // Make each item linkable if desired (could be extended)
            href: review.id ? `/reviews/${review.id}` : undefined,
        };
    });
    // Return a responsive List component containing all reviews
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=32.js.map