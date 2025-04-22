export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map severity levels to UI chip colors
    const severityColorMap = {
        critical: "red",
        high: "orange",
        medium: "yellow",
        low: "lime",
    };
    const severityLabel = input.severity ? input.severity.toUpperCase() : "UNKNOWN";
    const severityColor = input.severity
        ? severityColorMap[input.severity] || "gray"
        : "gray";
    // Compose the card header showing GHSA ID, summary and severity
    const cardHeader = {
        type: "CardHeader",
        title: input.ghsa_id,
        description: input.summary,
        startElement: {
            type: "Chip",
            label: severityLabel,
            color: severityColor,
            variant: "filled",
            size: "medium",
        },
    };
    // Helper to push a label/value pair into the details list
    const details = [];
    const pushDetail = (label, content) => {
        // Wrap primitive content into a Text component if needed
        const valueComponent = typeof content === "string"
            ? { type: "Text", content }
            : content;
        details.push({
            type: "DataListItem",
            label: { type: "Text", content: label },
            value: valueComponent,
        });
    };
    // Date fields
    if (input.published_at) {
        pushDetail("Published", input.published_at.split("T")[0]);
    }
    if (input.created_at) {
        pushDetail("Created", input.created_at.split("T")[0]);
    }
    if (input.updated_at) {
        pushDetail("Updated", input.updated_at.split("T")[0]);
    }
    // Advisory state
    pushDetail("State", input.state);
    // CVSS score & vector
    if (input.cvss && input.cvss.score != null) {
        const md = `**Score:** ${input.cvss.score}\n**Vector:** ${(_a = input.cvss.vector_string) !== null && _a !== void 0 ? _a : "N/A"}`;
        details.push({
            type: "DataListItem",
            label: { type: "Text", content: "CVSS" },
            value: { type: "Markdown", content: md },
        });
    }
    // CWE identifiers as a chip group
    if (input.cwes && input.cwes.length) {
        details.push({
            type: "DataListItem",
            label: { type: "Text", content: "CWEs" },
            value: {
                type: "ChipGroup",
                childrenProps: input.cwes.map(cwe => ({
                    type: "Chip",
                    label: `${cwe.cwe_id}: ${cwe.name}`,
                    variant: "outlined",
                    size: "small",
                })),
            },
        });
    }
    // Submission acceptance indicator
    if (input.submission) {
        details.push({
            type: "DataListItem",
            label: { type: "Text", content: "Private Report Accepted" },
            value: {
                type: "Icon",
                id: input.submission.accepted ? "check-circle" : "times-circle",
                color: input.submission.accepted ? "green" : "red",
                size: 16,
            },
        });
    }
    // Build the data list
    const dataList = {
        type: "DataList",
        childrenProps: details,
    };
    // Assemble card content: description + details
    const contentChildren = [];
    if (input.description) {
        contentChildren.push({
            type: "Markdown",
            content: input.description,
        });
    }
    contentChildren.push(dataList);
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Footer: link to the GitHub advisory page
    const cardFooter = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View Advisory",
            href: input.html_url,
            variant: "outlined",
            color: "primary",
            startElement: { type: "Icon", id: "external-link-alt", size: 16 },
        },
    };
    // Final vertical card encapsulating the entire advisory view
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=876.js.map