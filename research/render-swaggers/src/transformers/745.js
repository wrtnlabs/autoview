export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Since the input type is an empty object (no payload), we treat every call as
     * an "empty state". We provide a single VerticalCard with a header and markdown
     * content that gracefully informs the user that no data is available.
     *
     * This approach:
     * - Uses an iconic representation in the CardHeader to draw the user's attention.
     * - Uses a Markdown component for the explanatory text.
     * - Is fully responsive: VerticalCard layouts collapse naturally on narrow screens.
     */
    // CardHeader with an information icon and a title.
    const header = {
        type: "CardHeader",
        title: "No Data Available",
        description: undefined, // no additional subtitle
        startElement: {
            type: "Icon",
            id: "exclamation-circle", // FontAwesome icon in kebab-case
            color: "gray",
            size: 24,
        },
    };
    // CardContent containing a Markdown message.
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: "There is currently no data to display. Please provide valid input to visualize.",
        },
    };
    // The VerticalCard itself, composed of the header and content.
    const emptyStateCard = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return emptyStateCard;
}
//# sourceMappingURL=745.js.map