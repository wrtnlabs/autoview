export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a simple message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No organizations found.",
        };
    }
    // Transform each organization into a VerticalCard
    const cards = input.map((org) => {
        // Build the CardHeader with avatar on the left and link icon on the right
        const header = {
            type: "CardHeader",
            title: org.login,
            description: org.id.toString(),
            startElement: {
                type: "Avatar",
                src: org.avatar_url,
                name: org.login,
                variant: "primary",
                size: 40,
            },
            endElement: {
                type: "Icon",
                id: "external-link",
                color: "blue",
                size: 20,
            },
        };
        // If the org has a description, render it as Markdown to allow rich text
        const contentChildren = [];
        if (org.description) {
            contentChildren.push({
                type: "Markdown",
                content: org.description,
            });
        }
        const content = {
            type: "CardContent",
            // Use markdown component for description; skip if absent
            childrenProps: contentChildren.length > 0 ? contentChildren : undefined,
        };
        // Footer with a button linking to the organization's GitHub page
        const footer = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                label: "View on GitHub",
                href: org.url,
                variant: "contained",
                color: "primary",
                size: "medium",
            },
        };
        return {
            type: "VerticalCard",
            // Compose header, content, and footer in order
            childrenProps: [header, content, footer],
        };
    });
    // Wrap all cards in a horizontal, swipeable carousel for better mobile UX
    return {
        type: "Carousel",
        // Show one card at a time, allow navigation and indicators
        childrenProps: cards,
        navControls: true,
        indicators: true,
        infinite: false,
        autoPlay: false,
        // Comfortable spacing between cards
        gutter: 16,
        // A modest slide effect
        effect: "slide",
    };
}
//# sourceMappingURL=998.js.map