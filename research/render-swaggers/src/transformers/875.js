export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Map severity to an icon and color for visual emphasis.
    const severityMap = {
        critical: { icon: "bomb", color: "red" },
        high: { icon: "fire", color: "orange" },
        medium: { icon: "exclamation-triangle", color: "yellow" },
        low: { icon: "info-circle", color: "green" },
        "null": { icon: "question-circle", color: "gray" },
    };
    const sevKey = (_a = input.severity) !== null && _a !== void 0 ? _a : "null";
    const { icon: severityIcon, color: severityColor } = severityMap[sevKey] || severityMap["null"];
    // Map state to a chip color
    const stateColorMap = {
        published: "success",
        closed: "gray",
        withdrawn: "error",
        draft: "info",
        triage: "warning",
    };
    const stateColor = stateColorMap[input.state] || "secondary";
    // Build the header with summary, GHSA ID, severity icon and state chip.
    const header = {
        type: "CardHeader",
        title: input.summary,
        // Show GHSA ID under the title
        description: input.ghsa_id,
        startElement: {
            type: "Icon",
            id: severityIcon,
            color: severityColor,
            size: 24,
        },
        endElement: {
            type: "Chip",
            label: input.state,
            variant: "filled",
            color: stateColor,
        },
    };
    // Prepare DataList items for key fields
    const listItems = [];
    // CVE ID
    if (input.cve_id) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "CVE ID", variant: "subtitle2" },
            value: { type: "Text", content: input.cve_id, variant: "body2" },
        });
    }
    // Identifiers (join all values)
    if (input.identifiers && input.identifiers.length) {
        const vals = input.identifiers.map((i) => i.value).join(", ");
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Identifiers", variant: "subtitle2" },
            value: { type: "Text", content: vals, variant: "body2" },
        });
    }
    // CVSS score
    if (input.cvss && input.cvss.score != null) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "CVSS Score", variant: "subtitle2" },
            value: { type: "Text", content: input.cvss.score.toFixed(1), variant: "body2" },
        });
    }
    // CWE IDs
    if (input.cwe_ids && input.cwe_ids.length) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "CWE IDs", variant: "subtitle2" },
            value: { type: "Text", content: input.cwe_ids.join(", "), variant: "body2" },
        });
    }
    // Submission accepted
    if (input.submission) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Submission", variant: "subtitle2" },
            // Use a chip to visualize boolean accepted status
            value: {
                type: "Chip",
                label: input.submission.accepted ? "Accepted" : "Not Accepted",
                variant: "filled",
                color: input.submission.accepted ? "success" : "error",
            },
        });
    }
    // Dates (created & published)
    const humanDate = (dt) => dt ? new Date(dt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : null;
    if (input.created_at) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Created", variant: "subtitle2" },
            value: { type: "Text", content: humanDate(input.created_at), variant: "body2" },
        });
    }
    if (input.published_at) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Published", variant: "subtitle2" },
            value: { type: "Text", content: humanDate(input.published_at), variant: "body2" },
        });
    }
    // Assemble the DataList component
    const detailList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Use Markdown to render the detailed description if available
    const descriptionPane = {
        type: "Markdown",
        content: (_b = input.description) !== null && _b !== void 0 ? _b : "_No detailed description available._",
    };
    // Footer with a call-to-action button
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View Advisory",
            href: input.html_url,
            variant: "contained",
            color: "primary",
        },
    };
    // Compose the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, { type: "CardContent", childrenProps: [descriptionPane, detailList] }, footer],
    };
    return card;
}
//# sourceMappingURL=875.js.map