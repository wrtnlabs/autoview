export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Generate a list of reviews using the List component
    const items = input.data.map((review) => {
        const { title, created_at, score, read_by_seller, customer, } = review;
        // Round score to nearest integer for star icons
        const starCount = Math.max(0, Math.min(5, Math.round(score)));
        // Build star icons array
        const stars = Array.from({ length: starCount }, () => ({
            type: "Icon",
            id: "star",
            color: "yellow",
            size: 16,
        }));
        // Build a chip indicating read/unread status
        const statusChip = {
            type: "Chip",
            label: read_by_seller ? "Read" : "New",
            color: read_by_seller ? "success" : "error",
            variant: "outlined",
            size: "small",
        };
        // Combine stars and status chip for the endElement
        const endElements = [...stars, statusChip];
        // Use a user icon as the startElement
        const userIcon = {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 24,
        };
        // Build a human‐friendly date label
        let dateLabel;
        try {
            dateLabel = new Date(created_at).toLocaleDateString();
        }
        catch (_a) {
            dateLabel = created_at;
        }
        // Compose the list item
        return {
            type: "ListItem",
            title,
            description: `Posted on ${dateLabel} via ${customer.channel.name}`,
            startElement: userIcon,
            endElement: endElements,
        };
    });
    // Return the List component wrapping all the review items
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=150.js.map