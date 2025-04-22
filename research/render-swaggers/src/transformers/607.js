export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no deployments, inform the user
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No deployments available**",
        };
    }
    // Map each deployment into a vertical card
    const cards = input.map((dep) => {
        // Build the header with avatar or fallback icon, title, description, and environment chip
        const creatorElem = dep.creator &&
            dep.creator.avatar_url
            ? {
                type: "Avatar",
                src: dep.creator.avatar_url,
                name: dep.creator.login,
                variant: "blue",
                size: 40,
            }
            : {
                // Fallback to a generic user icon if no avatar URL
                type: "Icon",
                id: "user",
                color: "gray",
                size: 32,
            };
        const envChip = {
            type: "Chip",
            label: dep.environment,
            variant: "filled",
            // Color-code for production/transient environments
            color: dep.production_environment
                ? "green"
                : dep.transient_environment
                    ? "orange"
                    : "blue",
            size: "small",
        };
        const header = {
            type: "CardHeader",
            title: dep.ref,
            description: `#${dep.id}`,
            startElement: creatorElem,
            endElement: envChip,
        };
        // Content: show creation date and a markdown link to statuses
        const createdAt = new Date(dep.created_at).toLocaleString();
        const dateText = {
            type: "Text",
            content: `Created: ${createdAt}`,
            variant: "caption",
            color: "gray",
        };
        const statusesLink = {
            type: "Markdown",
            content: `[View statuses](${dep.statuses_url})`,
        };
        const content = {
            type: "CardContent",
            childrenProps: [dateText, statusesLink],
        };
        // Footer: buttons to repository and statuses
        const repoButton = {
            type: "Button",
            label: "Repository",
            variant: "contained",
            color: "primary",
            size: "small",
            href: dep.repository_url,
        };
        const statusesButton = {
            type: "Button",
            label: "Statuses",
            variant: "outlined",
            color: "secondary",
            size: "small",
            href: dep.statuses_url,
        };
        const footer = {
            type: "CardFooter",
            childrenProps: [repoButton, statusesButton],
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer],
        };
    });
    // Wrap all deployment cards in a responsive carousel
    const carousel = {
        type: "Carousel",
        infinite: true,
        navControls: true,
        indicators: true,
        // A small gutter between cards for better readability on mobile
        gutter: 16,
        childrenProps: cards,
    };
    return carousel;
}
//# sourceMappingURL=607.js.map