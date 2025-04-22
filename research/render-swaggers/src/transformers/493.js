export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Sort versions by creation date descending (newest first)
    const sorted = [...input].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // Helper to format ISO date strings into a user-friendly form
    const formatDate = (iso) => {
        const d = new Date(iso);
        // e.g. "Jan 1, 2023"
        return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    };
    // If there are no versions, show a placeholder text
    if (sorted.length === 0) {
        return {
            type: "VerticalCard",
            childrenProps: [
                {
                    type: "CardHeader",
                    title: "Package Versions",
                    description: "No versions available",
                    startElement: {
                        type: "Icon",
                        id: "box-open", // open box icon to indicate package
                        size: 24,
                        color: "gray"
                    }
                }
            ]
        };
    }
    // Map each version to a DataListItem component
    const items = sorted.map(version => {
        var _a, _b;
        // Determine the icon id for the package type; fall back to a generic file icon
        const pkgType = (_a = version.metadata) === null || _a === void 0 ? void 0 : _a.package_type;
        const iconId = pkgType && typeof pkgType === "string" ? pkgType : "file";
        return {
            type: "DataListItem",
            // Using a Text component for the version name (label)
            label: [
                {
                    type: "Text",
                    content: version.name,
                    variant: "subtitle1"
                }
            ],
            // Using a Text component for the creation date (value)
            value: [
                {
                    type: "Text",
                    content: formatDate(version.created_at),
                    variant: "body2",
                    color: "gray"
                }
            ],
            // Show an icon representing the package type
            startElement: {
                type: "Icon",
                id: iconId,
                color: "blue",
                size: 20
            },
            // Provide a link button to the package version's HTML URL
            endElement: {
                type: "Button",
                variant: "text",
                color: "primary",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "external-link-alt", // external link icon
                    size: 16,
                    color: "primary"
                },
                label: "View",
                href: (_b = version.html_url) !== null && _b !== void 0 ? _b : version.url // fallback if html_url is missing
            }
        };
    });
    // Compose the final card with header and a data list inside the content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Package Versions",
                description: `${sorted.length} version${sorted.length > 1 ? "s" : ""}`,
                startElement: {
                    type: "Icon",
                    id: "box-open",
                    size: 24,
                    color: "blue"
                }
            },
            {
                type: "CardContent",
                // Wrap the list of versions in a DataList for a clean layout
                childrenProps: {
                    type: "DataList",
                    childrenProps: items
                }
            }
        ]
    };
}
//# sourceMappingURL=493.js.map