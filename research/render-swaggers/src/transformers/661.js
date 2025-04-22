export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no annotations, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No code annotations found\nYour codebase is clean! 🎉",
        };
    }
    // Helper to map annotation levels to chip colors
    const levelToColor = (level) => {
        switch (level === null || level === void 0 ? void 0 : level.toLowerCase()) {
            case "error":
                return "error";
            case "warning":
                return "warning";
            case "info":
            case "notice":
                return "info";
            case "success":
                return "success";
            default:
                return "gray";
        }
    };
    // Build a DataListItem for each annotation
    const childrenProps = input.map((annotation) => {
        var _a, _b, _c, _d;
        // Construct a path + location label
        const locationText = `${annotation.path} [${annotation.start_line}:${(_a = annotation.start_column) !== null && _a !== void 0 ? _a : 0} - ${annotation.end_line}:${(_b = annotation.end_column) !== null && _b !== void 0 ? _b : 0}]`;
        // Use a chip to highlight the annotation level/severity
        const severityChip = {
            type: "Chip",
            label: annotation.annotation_level ? annotation.annotation_level.toUpperCase() : "UNKNOWN",
            color: levelToColor(annotation.annotation_level),
            variant: "filled",
        };
        // Prepare markdown content for the detailed message
        const details = annotation.message
            ? `**${(_c = annotation.title) !== null && _c !== void 0 ? _c : "Annotation"}**\n\n${annotation.message}`
            : `**${(_d = annotation.title) !== null && _d !== void 0 ? _d : "Annotation"}**\n\n_No additional details provided._`;
        const markdown = {
            type: "Markdown",
            content: details,
        };
        return {
            // Discriminator for DataListItem
            type: "DataListItem",
            // Label side: show file path and lines
            label: [
                {
                    type: "Icon",
                    id: "file",
                    color: "gray",
                    size: 16,
                },
                {
                    type: "Text",
                    content: ` ${locationText}`,
                    variant: "body2",
                    color: "primary",
                },
            ],
            // Value side: show severity chip and markdown details
            value: [
                severityChip,
                markdown,
            ],
        };
    });
    // Return the top-level DataList component
    return {
        type: "DataList",
        childrenProps,
    };
}
//# sourceMappingURL=661.js.map