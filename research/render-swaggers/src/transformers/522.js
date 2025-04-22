export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to map severity to a friendly color scale name for chips/icons
    const mapSeverityColor = (severity) => {
        switch (severity) {
            case "critical":
                return "red";
            case "high":
                return "orange";
            case "medium":
                return "yellow";
            case "low":
                return "green";
            default:
                return "gray";
        }
    };
    // Helper to choose an icon name based on severity
    const mapSeverityIcon = (severity) => {
        switch (severity) {
            case "critical":
            case "high":
                return "exclamation-circle";
            case "medium":
                return "exclamation-triangle";
            case "low":
                return "info-circle";
            default:
                return "question-circle";
        }
    };
    // If there's no data, show a markdown placeholder
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "# No security advisories found\n\nThere are currently no items to display."
        };
    }
    // Build a List of advisory items
    const listItems = input.map(advisory => {
        // Use GHSA ID as title, summary as description
        // Use an Icon in the startElement (color-coded by severity)
        // Use a Chip in the endElement to label severity
        // Make the entire ListItem clickable by using the advisory URL
        const severityLabel = advisory.severity ? advisory.severity.toUpperCase() : "UNKNOWN";
        const color = mapSeverityColor(advisory.severity);
        const iconId = mapSeverityIcon(advisory.severity);
        return {
            type: "ListItem",
            title: advisory.ghsa_id,
            description: advisory.summary,
            href: advisory.html_url,
            startElement: {
                type: "Icon",
                id: iconId,
                color,
                size: 20
            },
            endElement: {
                type: "Chip",
                label: severityLabel,
                color,
                size: "small",
                variant: "outlined"
            }
        };
    });
    // Wrap all items in a responsive List
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=522.js.map