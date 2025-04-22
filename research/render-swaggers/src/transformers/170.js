export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const result = input.result;
    // Handle missing or null result gracefully with markdown fallback
    if (result == null) {
        return {
            type: "Markdown",
            content: "### No Result Available\n\nThe integer result could not be retrieved."
        };
    }
    // Determine a sensible badge maxCount to abbreviate large numbers
    const MAX_BADGE_COUNT = 9999;
    const badgeMax = result > MAX_BADGE_COUNT ? MAX_BADGE_COUNT : undefined;
    // Use a vertical card to structure the UI: header, main content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            // Card header with icon and title
            {
                type: "CardHeader",
                title: "Integer Result",
                startElement: {
                    type: "Icon",
                    id: "hashtag", // fa-hashtag icon for numeric context
                    size: 24,
                    color: "blue"
                }
            },
            // Card content: badge with icon and large text display
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Badge",
                        count: result,
                        maxCount: badgeMax,
                        color: "info",
                        childrenProps: {
                            type: "Icon",
                            id: "calculator", // calculator icon to emphasize computation
                            size: 32,
                            color: "cyan"
                        }
                    },
                    {
                        type: "Text",
                        variant: "h4",
                        content: `${result}` // large text for easy reading on small screens
                    }
                ]
            },
            // Card footer with explanatory caption
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Text",
                    variant: "caption",
                    color: "gray",
                    content: "Retrieved integer value"
                }
            }
        ]
    };
}
//# sourceMappingURL=170.js.map