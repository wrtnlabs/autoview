export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Map severity levels to icon colors
    const severityColorMap = {
        low: "lime",
        medium: "yellow",
        high: "orange",
        critical: "red",
    };
    // Map alert states to chip colors
    const stateColorMap = {
        auto_dismissed: "gray",
        dismissed: "darkGray",
        fixed: "green",
        open: "red",
    };
    // Format published date for display
    const publishedDate = new Date(input.security_advisory.published_at).toLocaleString();
    // Construct DataList items to show key fields
    const dataListItems = [
        {
            type: "DataListItem",
            // Label: plain text
            label: {
                type: "Text",
                content: "Severity",
                variant: "body2",
                color: "tertiary",
            },
            // Value: colored chip indicating severity
            value: {
                type: "Chip",
                label: input.security_advisory.severity,
                color: severityColorMap[input.security_advisory.severity],
                size: "small",
                variant: "filled",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "State",
                variant: "body2",
                color: "tertiary",
            },
            value: {
                type: "Chip",
                label: input.state,
                color: stateColorMap[input.state],
                size: "small",
                variant: "outlined",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Package",
                variant: "body2",
                color: "tertiary",
            },
            value: {
                type: "Text",
                content: `${(_b = (_a = input.dependency.package) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "-"} (${(_d = (_c = input.dependency.package) === null || _c === void 0 ? void 0 : _c.ecosystem) !== null && _d !== void 0 ? _d : "-"})`,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Manifest Path",
                variant: "body2",
                color: "tertiary",
            },
            value: {
                type: "Text",
                content: (_e = input.dependency.manifest_path) !== null && _e !== void 0 ? _e : "-",
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Published",
                variant: "body2",
                color: "tertiary",
            },
            value: {
                type: "Text",
                content: publishedDate,
                variant: "body1",
            },
        },
    ];
    // Build a markdown list of vulnerable version ranges and patched versions
    const vulnerabilitiesMd = input.security_advisory.vulnerabilities
        .map((v) => {
        var _a, _b;
        const pkgName = v.package.name;
        const range = v.vulnerable_version_range;
        const patched = (_b = (_a = v.first_patched_version) === null || _a === void 0 ? void 0 : _a.identifier) !== null && _b !== void 0 ? _b : "unpatched";
        return `- **${pkgName}**: ${range} → _${patched}_`;
    })
        .join("\n");
    return {
        // Use a vertical card to stack header, content, and footer
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with alert number and summary, prefixed by a bug icon colored by severity
                type: "CardHeader",
                title: `Alert #${input.number}`,
                description: input.security_advisory.summary,
                startElement: {
                    type: "Icon",
                    id: "bug",
                    color: severityColorMap[input.security_advisory.severity],
                    size: 24,
                },
            },
            {
                // Content comprising a DataList and Markdown details
                type: "CardContent",
                childrenProps: [
                    {
                        // DataList of primary properties
                        type: "DataList",
                        childrenProps: dataListItems,
                    },
                    {
                        // Full advisory description rendered in markdown
                        type: "Markdown",
                        content: `### Description\n${input.security_advisory.description}`,
                    },
                    {
                        // Vulnerability details rendered as markdown list
                        type: "Markdown",
                        content: `### Vulnerabilities\n${vulnerabilitiesMd}`,
                    },
                ],
            },
            {
                // Footer with a button linking to GitHub alert page
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    label: "View on GitHub",
                    href: input.html_url,
                    variant: "contained",
                    color: "primary",
                    startElement: {
                        type: "Icon",
                        id: "github",
                        color: "gray",
                        size: 20,
                    },
                },
            },
        ],
    };
}
//# sourceMappingURL=715.js.map