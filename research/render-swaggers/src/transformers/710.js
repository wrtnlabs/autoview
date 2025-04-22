export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Determine health chip color based on percentage thresholds
    const health = input.health_percentage;
    const healthColor = health >= 80 ? "green" :
        health >= 50 ? "yellow" :
            "red";
    // Format updated date for display
    const updatedDate = input.updated_at
        ? new Date(input.updated_at).toLocaleDateString()
        : "Unknown";
    // Prepare list items for the DataList component
    const items = [];
    // Health Score entry
    items.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Health Score" }],
        value: {
            type: "Chip",
            label: `${health}%`,
            color: healthColor,
            variant: "filled"
        }
    });
    // Description (rendered as Markdown for better readability)
    if (input.description !== null) {
        items.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Description" }],
            value: {
                type: "Markdown",
                content: input.description
            }
        });
    }
    // Link to external documentation
    if (input.documentation) {
        items.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Documentation" }],
            value: {
                type: "Button",
                label: "Open Docs",
                href: input.documentation
            }
        });
    }
    // Last updated timestamp
    items.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Last Updated" }],
        value: {
            type: "Text",
            content: updatedDate
        }
    });
    // Content reports feature flag
    if (typeof input.content_reports_enabled !== "undefined") {
        items.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Content Reports" }],
            value: {
                type: "Chip",
                label: input.content_reports_enabled ? "Enabled" : "Disabled",
                color: input.content_reports_enabled ? "green" : "gray",
                variant: "filled"
            }
        });
    }
    // Human-readable labels for the various community health files
    const fileKeyMap = {
        code_of_conduct: "Code of Conduct",
        code_of_conduct_file: "CoC File",
        license: "License",
        contributing: "Contributing",
        readme: "README",
        issue_template: "Issue Template",
        pull_request_template: "PR Template"
    };
    // Iterate through each file entry and create a link button if present
    for (const key in input.files) {
        const fileData = input.files[key];
        if (fileData) {
            // Prefer html_url when available, otherwise fallback to url
            const url = "html_url" in fileData && fileData.html_url
                ? fileData.html_url
                : fileData.url;
            const displayName = fileKeyMap[key] || key;
            items.push({
                type: "DataListItem",
                label: [{ type: "Text", content: displayName }],
                value: {
                    type: "Button",
                    label: "View",
                    href: url
                }
            });
        }
    }
    // Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Card header with a health chip and update info
    const cardHeader = {
        type: "CardHeader",
        title: "Community Profile",
        description: `Last updated: ${updatedDate}`,
        startElement: {
            type: "Chip",
            label: `${health}%`,
            color: healthColor,
            variant: "filled"
        }
    };
    // Card content wrapping our DataList
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Return a vertical card combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };
}
//# sourceMappingURL=710.js.map