export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of repository advisories into an AutoView list,
// with icons for severity and chips for state.
// Falls back to a Markdown notice if the input is empty.
function visualizeData(input) {
    // If there are no advisories, show a simple markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No security advisories available."
        };
    }
    // Map advisory severity to a FontAwesome icon and color.
    const mapSeverityIcon = (severity) => {
        let id = "question-circle";
        let color = "gray";
        switch (severity) {
            case "critical":
                id = "exclamation-triangle";
                color = "red";
                break;
            case "high":
                id = "exclamation-triangle";
                color = "orange";
                break;
            case "medium":
                id = "exclamation-circle";
                color = "yellow";
                break;
            case "low":
                id = "info-circle";
                color = "blue";
                break;
            // null or unknown → generic question icon
        }
        return {
            type: "Icon",
            id,
            color,
            size: 20
        };
    };
    // Map advisory state to a colored chip.
    const mapStateChip = (state) => {
        let color = "gray";
        switch (state) {
            case "published":
                color = "green";
                break;
            case "closed":
                color = "gray";
                break;
            case "withdrawn":
                color = "darkGray";
                break;
            case "draft":
                color = "blue";
                break;
            case "triage":
                color = "orange";
                break;
        }
        return {
            type: "Chip",
            label: state,
            color,
            variant: "outlined",
            size: "small"
        };
    };
    // Build a ListItem for each advisory, showing ID, summary,
    // severity icon on the left, and state chip on the right.
    const childrenProps = input.map(advisory => ({
        type: "ListItem",
        title: advisory.ghsa_id,
        description: advisory.summary,
        startElement: mapSeverityIcon(advisory.severity),
        // wrap in an array so that ListItem will render correctly on small screens
        endElement: [mapStateChip(advisory.state)]
    }));
    // Return a responsive list of advisories.
    return {
        type: "List",
        childrenProps
    };
}
//# sourceMappingURL=873.js.map