export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to build a markdown list of categories recursively.
    function buildCategoryList(categories, indent = 0) {
        let md = "";
        for (const cat of categories) {
            // Prefix each line with spaces to indicate hierarchy.
            const prefix = "  ".repeat(indent);
            md += `${prefix}- **${cat.name}** (code: \`${cat.code}\`)\n`;
            if (cat.children && cat.children.length > 0) {
                md += buildCategoryList(cat.children, indent + 1);
            }
        }
        return md;
    }
    // If there are no channels, show a friendly markdown message.
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "### No shopping channels found.\nPlease check back later.",
        };
    }
    // Compose a VerticalCard per channel.
    const channelCards = input.data.map((channel) => {
        // Build markdown representation of the category tree.
        const categoryMd = channel.categories && channel.categories.length > 0
            ? buildCategoryList(channel.categories)
            : "- _No categories available_\n";
        // CardHeader: show channel name and code.
        const header = {
            type: "CardHeader",
            title: channel.name,
            description: `Created: ${new Date(channel.created_at).toLocaleDateString()} • Code: ${channel.code}`,
            // Use a list icon to visually represent a channel.
            startElement: {
                type: "Icon",
                id: "list",
                color: "blue",
                size: 24,
            },
            // Show the top-level count of categories as a chip.
            endElement: {
                type: "Chip",
                label: String(channel.categories.length),
                color: "primary",
                variant: "filled",
                size: "small",
            },
        };
        // CardContent: display the nested categories as markdown.
        const content = {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: `#### Categories\n${categoryMd}`,
            },
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content],
        };
    });
    // Wrap channel cards in a carousel for responsive swipe/scroll on mobile.
    return {
        type: "Carousel",
        // Display one card per view; users can swipe to see others.
        childrenProps: channelCards,
        navControls: true,
        indicators: true,
        infinite: false,
    };
}
//# sourceMappingURL=163.js.map