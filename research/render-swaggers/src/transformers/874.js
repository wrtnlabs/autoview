export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map advisory severity to a colored Chip
    const severityLabel = input.severity ? input.severity.toUpperCase() : "UNKNOWN";
    const severityColorMap = {
        critical: "error",
        high: "warning",
        medium: "info",
        low: "secondary",
    };
    const severityColor = input.severity ? (_a = severityColorMap[input.severity]) !== null && _a !== void 0 ? _a : "gray" : "gray";
    const severityChip = {
        type: "Chip",
        label: severityLabel,
        color: severityColor,
        variant: "filled",
        size: "medium",
    };
    // Header with GHSA ID and severity
    const header = {
        type: "CardHeader",
        title: input.ghsa_id,
        description: input.summary,
        startElement: severityChip,
    };
    // Build content section
    const contentChildren = [];
    // Use Markdown to render a detailed description if provided
    if (input.description) {
        contentChildren.push({
            type: "Markdown",
            content: input.description,
        });
    }
    // Collect key-value pairs in a data list
    const dataListItems = [];
    const pushItem = (label, value) => {
        if (value !== null && value !== undefined) {
            dataListItems.push({
                type: "DataListItem",
                label: { type: "Text", content: label, variant: "subtitle2" },
                value: { type: "Text", content: String(value), variant: "body2" },
            });
        }
    };
    pushItem("CVE ID", input.cve_id);
    pushItem("State", input.state);
    pushItem("Published At", input.published_at);
    pushItem("Updated At", input.updated_at);
    pushItem("Closed At", input.closed_at);
    pushItem("Withdrawn At", input.withdrawn_at);
    if (input.submission) {
        pushItem("Private Report Accepted", input.submission.accepted ? "Yes" : "No");
    }
    if (input.cvss) {
        pushItem("CVSS Score", input.cvss.score);
        pushItem("CVSS Vector", input.cvss.vector_string);
    }
    if (input.cwe_ids && input.cwe_ids.length > 0) {
        pushItem("CWE IDs", input.cwe_ids.join(", "));
    }
    if (dataListItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: dataListItems,
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Footer with action buttons
    const footerChildren = [];
    if (input.html_url) {
        footerChildren.push({
            type: "Button",
            label: "View on GitHub",
            variant: "contained",
            color: "primary",
            href: input.html_url,
            startElement: { type: "Icon", id: "github", size: 20 },
        });
    }
    if (input.url) {
        footerChildren.push({
            type: "Button",
            label: "API URL",
            variant: "outlined",
            color: "secondary",
            href: input.url,
            startElement: { type: "Icon", id: "link", size: 20 },
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Assemble everything into a responsive VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=874.js.map