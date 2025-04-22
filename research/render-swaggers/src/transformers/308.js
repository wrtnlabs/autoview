export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map advisory severity to icon colors
    const severityColorMap = {
        critical: "red",
        high: "orange",
        medium: "yellow",
        low: "green",
        unknown: "gray",
    };
    // Transform each advisory into a ListItem component
    const listItems = input.map((advisory) => {
        var _a, _b;
        const severity = (_a = advisory.severity) !== null && _a !== void 0 ? _a : "unknown";
        const color = severityColorMap[severity] || "gray";
        // Round CVSS score to one decimal
        const cvssScore = ((_b = advisory.cvss) === null || _b === void 0 ? void 0 : _b.score) != null
            ? Math.round(advisory.cvss.score * 10) / 10
            : null;
        // Build endElement array: a link button and (optionally) a CVSS badge
        const endElements = [
            {
                type: "Button",
                label: "View",
                href: advisory.html_url,
                variant: "text",
                size: "small",
                color: "primary",
            },
            cvssScore != null && {
                type: "Badge",
                count: cvssScore,
                maxCount: 10,
                showZero: false,
                // Use an info icon inside the badge
                childrenProps: {
                    type: "Icon",
                    id: "info-circle",
                    color: "blue",
                    size: 16,
                },
            },
        ].filter(Boolean);
        return {
            type: "ListItem",
            title: advisory.ghsa_id,
            description: advisory.summary || advisory.description || "No summary available.",
            // Use an exclamation icon to reflect severity
            startElement: {
                type: "Icon",
                id: "exclamation-triangle",
                color,
                size: 20,
            },
            endElement: endElements,
        };
    });
    // Compose the final List component
    const list = {
        type: "List",
        // Responsive list of advisories
        childrenProps: listItems,
    };
    return list;
}
//# sourceMappingURL=308.js.map