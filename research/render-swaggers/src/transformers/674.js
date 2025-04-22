export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no alerts, show a friendly message
    if (input.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: ["No code scanning alerts found."],
        };
    }
    // Mapping of alert state to an icon name and color
    const stateIconMap = {
        open: { id: "exclamation-triangle", color: "red" },
        dismissed: { id: "ban", color: "gray" },
        fixed: { id: "check-circle", color: "green" },
        null: { id: "question-circle", color: "gray" },
    };
    // Classification chips color map
    const classificationColor = {
        source: "blue",
        generated: "orange",
        test: "green",
        library: "gray",
        null: "darkGray",
    };
    // Build DataListItem for each alert
    const items = input.map((alert) => {
        var _a, _b, _c, _d, _e, _f;
        // Determine icon for state
        const stateKey = (_a = alert.state) !== null && _a !== void 0 ? _a : "null";
        const stateMeta = stateIconMap[stateKey] || stateIconMap["null"];
        const stateIcon = {
            type: "Icon",
            id: stateMeta.id,
            color: stateMeta.color,
            size: 20,
        };
        // Build a short location string: "file.ts:12-15"
        const loc = alert.location;
        const locationText = loc && loc.path
            ? `${loc.path}:${(_b = loc.start_line) !== null && _b !== void 0 ? _b : ""}-${(_c = loc.end_line) !== null && _c !== void 0 ? _c : ""}`
            : "Unknown location";
        // Header label: icon + location text
        const labelComponents = [
            stateIcon,
            {
                type: "Text",
                variant: "body1",
                content: [` ${locationText}`],
            },
        ];
        // Primary message content in markdown
        const messageText = (_e = (_d = alert.message) === null || _d === void 0 ? void 0 : _d.text) !== null && _e !== void 0 ? _e : "*No message provided*";
        const markdownContent = `**Message:**\n\n${messageText}`;
        const messageMarkdown = {
            type: "Markdown",
            content: markdownContent,
        };
        // Build details chips: analysis key, category, environment
        const detailChips = [];
        if (alert.analysis_key) {
            detailChips.push({
                type: "Chip",
                label: alert.analysis_key,
                color: "teal",
                size: "small",
            });
        }
        if (alert.category) {
            detailChips.push({
                type: "Chip",
                label: alert.category,
                color: "violet",
                size: "small",
            });
        }
        if (alert.environment) {
            detailChips.push({
                type: "Chip",
                label: alert.environment,
                color: "cyan",
                size: "small",
            });
        }
        const detailsGroup = {
            type: "ChipGroup",
            childrenProps: detailChips,
            maxItems: detailChips.length,
        };
        // Build classification chips
        const classificationChips = ((_f = alert.classifications) !== null && _f !== void 0 ? _f : [])
            .filter((c) => c != null)
            .map((c) => ({
            type: "Chip",
            label: c,
            color: classificationColor[c],
            size: "small",
            variant: "outlined",
        }));
        const classificationGroup = {
            type: "ChipGroup",
            childrenProps: classificationChips,
            maxItems: classificationChips.length,
        };
        // Compose value area: markdown + detail chips + classification chips + link icon
        const valueComponents = [
            messageMarkdown,
            detailsGroup,
            classificationGroup,
        ];
        // If there is an HTML URL, add an icon button linking to it
        if (alert.html_url) {
            valueComponents.push({
                type: "IconButton",
                icon: "external-link-alt",
                href: alert.html_url,
                color: "primary",
                variant: "text",
                size: "medium",
            });
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Return the DataList containing all alert items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=674.js.map