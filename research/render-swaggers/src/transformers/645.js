export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Filter out any null entries gracefully
    const integrations = input.filter((item) => item != null);
    // If there's no data, show a friendly markdown message
    if (integrations.length === 0) {
        return {
            type: "Markdown",
            content: "### No GitHub integrations found.\n\nPlease check back later or install a new app."
        };
    }
    // Build a VerticalCard for each GitHub app integration
    const cards = integrations.map(integration => {
        var _a;
        // Card header: app name, slug, and GitHub icon
        const header = {
            type: "CardHeader",
            title: integration.name,
            description: integration.slug,
            startElement: {
                type: "Icon",
                id: "github", // FontAwesome brand icon for GitHub
                size: 32,
                color: "gray"
            }
        };
        // Card content: the app description rendered as Markdown
        const content = {
            type: "CardContent",
            // We pass a single Markdown child; if description is null, show placeholder
            childrenProps: {
                type: "Markdown",
                content: (_a = integration.description) !== null && _a !== void 0 ? _a : "_No description provided._"
            }
        };
        // Event chips: show up to maxItems, overflow collapses into "+N"
        const eventChips = integration.events.map(evt => ({
            type: "Chip",
            label: evt,
            variant: "outlined",
            size: "small",
            color: "primary"
        }));
        // A button to view the app on GitHub
        const viewButton = {
            type: "Button",
            label: "View on GitHub",
            href: integration.html_url,
            variant: "contained",
            color: "primary",
            startElement: {
                type: "Icon",
                id: "arrow-right",
                size: 16
            }
        };
        // Card footer: events and action button
        const footer = {
            type: "CardFooter",
            childrenProps: [
                {
                    type: "ChipGroup",
                    childrenProps: eventChips,
                    maxItems: 5
                },
                viewButton
            ]
        };
        // Assemble and return the vertical card
        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer]
        };
    });
    // Wrap all cards in a responsive carousel for mobile-friendly swiping
    const carousel = {
        type: "Carousel",
        effect: "slide",
        navControls: true,
        indicators: true,
        infinite: false,
        interval: 40,
        gutter: 16,
        childrenProps: cards
    };
    return carousel;
}
//# sourceMappingURL=645.js.map