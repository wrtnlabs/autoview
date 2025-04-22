export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no analyses, render a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No code scanning analyses available.\n\nThere are no results to display."
        };
    }
    // Map each analysis to a list item for a responsive list view
    const items = input.map(analysis => {
        var _a;
        // Safely extract tool name and version
        const toolName = (_a = analysis.tool.name) !== null && _a !== void 0 ? _a : "Unknown Tool";
        const versionSuffix = analysis.tool.version ? ` v${analysis.tool.version}` : "";
        // Shorten commit SHA for readability
        const shortSha = analysis.commit_sha.slice(0, 7);
        // Compose description with commit and creation date
        const description = `Commit: ${shortSha} | Created: ${analysis.created_at}`;
        // Prepare chips for results_count and rules_count
        const countChips = [
            {
                type: "Chip",
                label: `${analysis.results_count}`,
                color: "info",
                size: "small",
                variant: "outlined"
            },
            {
                type: "Chip",
                label: `${analysis.rules_count}`,
                color: "secondary",
                size: "small",
                variant: "outlined"
            }
        ];
        return {
            type: "ListItem",
            // Title shows tool name and version
            title: `${toolName}${versionSuffix}`,
            // Description shows commit and timestamp
            description,
            // Clicking the item navigates to the analysis URL
            href: analysis.url,
            // Use an icon to visually indicate this is a tool analysis
            startElement: {
                type: "Icon",
                id: "cog",
                color: "blue",
                size: 24
            },
            // Show the count chips on the right side
            endElement: countChips
        };
    });
    // Return a List component containing all analysis items
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=675.js.map