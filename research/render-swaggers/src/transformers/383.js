export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input for clarity
    const { total_count, platforms } = input;
    // Ensure platforms is an array and sort alphabetically for consistent display order
    const sortedPlatforms = Array.isArray(platforms) ? [...platforms].sort() : [];
    // Map each platform string into a Chip component
    const platformChips = sortedPlatforms.map((platform) => ({
        type: "Chip",
        label: platform,
        variant: "outlined",
        color: "primary",
        size: "medium",
    }));
    // If there are no platforms, fall back to a Markdown message
    const contentChild = platformChips.length > 0
        ? {
            type: "ChipGroup",
            // Display up to 8 chips, rest will be hidden under "+X" on small screens
            maxItems: 8,
            childrenProps: platformChips,
        }
        : {
            type: "Markdown",
            content: "**No supported platforms available.**",
        };
    // Compose the card header with an icon and summary
    const cardHeader = {
        type: "CardHeader",
        title: "Hosted Runners Platforms",
        description: `Total runners: ${total_count}`,
        startElement: {
            type: "Icon",
            id: "server", // Server icon from FontAwesome
            color: "blue", // Use a visible accent color
            size: 24, // 24px provides good visibility on mobile
        },
    };
    // Wrap the platform chips (or message) in CardContent
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChild,
    };
    // Return a vertical card that is responsive and mobile-friendly
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
}
//# sourceMappingURL=383.js.map