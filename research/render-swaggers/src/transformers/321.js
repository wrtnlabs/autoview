export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Handle the case where there's no integration data
    if (input === null) {
        return {
            type: "Markdown",
            content: "### No Integration Data\nNo integration data available.",
        };
    }
    // Utility to safely format ISO date strings into locale representations
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString();
        }
        catch (_a) {
            // Fallback to original string if parsing fails
            return iso;
        }
    };
    // Build a markdown list of the integration's properties
    const detailsLines = [];
    if (input.slug) {
        detailsLines.push(`- **Slug:** \`${input.slug}\``);
    }
    detailsLines.push(`- **External URL:** [Visit](${input.external_url})`);
    detailsLines.push(`- **HTML URL:** [Repository Page](${input.html_url})`);
    detailsLines.push(`- **Created At:** ${formatDate(input.created_at)}`);
    detailsLines.push(`- **Updated At:** ${formatDate(input.updated_at)}`);
    const markdownContent = ["#### Integration Details", ...detailsLines].join("\n");
    // If there are event subscriptions, render them as a group of chips
    let footerComponent;
    if (Array.isArray(input.events) && input.events.length > 0) {
        const chips = input.events.map((evt) => ({
            type: "Chip",
            label: evt,
            variant: "outlined",
            size: "small",
            color: "teal",
        }));
        footerComponent = {
            type: "ChipGroup",
            childrenProps: chips,
        };
    }
    // Compose a vertical card summarizing the GitHub App integration
    const cardChildren = [
        {
            // Header with avatar and basic info
            type: "CardHeader",
            title: input.name,
            description: (_a = input.description) !== null && _a !== void 0 ? _a : undefined,
            startElement: {
                type: "Avatar",
                // Show the app name initials if no image is provided
                name: input.name,
                variant: "primary",
                size: 32,
            },
        },
        {
            // Main content as markdown for rich text display
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: markdownContent,
            },
        },
    ];
    // Append the footer only if we have events to display
    if (footerComponent) {
        cardChildren.push({
            type: "CardFooter",
            childrenProps: footerComponent,
        });
    }
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=321.js.map