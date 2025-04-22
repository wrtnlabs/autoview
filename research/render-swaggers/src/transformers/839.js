export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no reviews are provided, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No pull request reviews found."
        };
    }
    // Map each pull request review to a ListItem component
    const items = input.map((review) => {
        // Extract user information, handling null user gracefully
        const user = review.user;
        const avatarElement = user && user.avatar_url
            ? {
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                size: 40,
                variant: "info"
            }
            : {
                // Fallback icon if user data is missing
                type: "Icon",
                id: "user",
                color: "gray",
                size: 24
            };
        // Format the submission date for display
        const submittedAt = review.submitted_at
            ? new Date(review.submitted_at).toLocaleString()
            : "Unknown date";
        // Compose title and description
        const loginOrUnknown = user && user.login ? user.login : "Unknown user";
        const title = `${loginOrUnknown} – ${review.state.toLowerCase()}`;
        const description = submittedAt;
        // Use the review's HTML URL as the clickable link for the list item, and indicate navigation with an arrow icon
        const navigationIcon = {
            type: "Icon",
            id: "arrow-right",
            size: 16,
            color: "gray"
        };
        return {
            type: "ListItem",
            title,
            description,
            startElement: avatarElement,
            endElement: navigationIcon,
            href: review.html_url
        };
    });
    // Return a List component containing all reviews
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=839.js.map