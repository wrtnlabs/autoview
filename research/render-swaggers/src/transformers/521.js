export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no alerts, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No secret scanning alerts found 🎉",
        };
    }
    // Build a list of DataListItemProps for each alert
    const items = input.map((alert) => {
        var _a, _b;
        // Determine icon based on alert state
        const stateIcon = {
            type: "Icon",
            id: alert.state === "resolved" ? "check-circle" : "exclamation-triangle",
            color: alert.state === "resolved" ? "green" : "orange",
            size: 20,
        };
        // Default number text
        const numberText = alert.number != null ? `#${alert.number}` : "Unknown #";
        // Human‐readable dates or placeholders
        const createdAt = (_a = alert.created_at) !== null && _a !== void 0 ? _a : "Unknown date";
        const updatedAt = (_b = alert.updated_at) !== null && _b !== void 0 ? _b : createdAt;
        const resolvedAt = alert.resolved_at ? alert.resolved_at : null;
        // Fallbacks for secret type display
        const secretType = alert.secret_type_display_name || alert.secret_type || "Unknown secret";
        // Repository link
        const repo = alert.repository;
        const repoLine = repo && repo.html_url && repo.full_name
            ? `- **Repository:** [${repo.full_name}](${repo.html_url})`
            : "";
        // Build markdown content for the value cell
        const mdLines = [];
        mdLines.push(`- **Created:** ${createdAt}`);
        if (updatedAt !== createdAt) {
            mdLines.push(`- **Updated:** ${updatedAt}`);
        }
        mdLines.push(`- **State:** ${alert.state}${alert.resolution ? ` (${alert.resolution})` : ""}`);
        if (resolvedAt) {
            mdLines.push(`- **Resolved at:** ${resolvedAt}`);
        }
        mdLines.push(`- **Secret:** \`${secretType}\``);
        if (repoLine) {
            mdLines.push(repoLine);
        }
        // Any additional flags
        if (alert.publicly_leaked) {
            mdLines.push(`- ⚠️ Publicly leaked`);
        }
        if (alert.multi_repo) {
            mdLines.push(`- 🔗 Found in multiple repos`);
        }
        const markdownComponent = {
            type: "Markdown",
            content: mdLines.join("\n"),
        };
        return {
            type: "DataListItem",
            // Label: icon + number
            label: [
                stateIcon,
                {
                    type: "Text",
                    content: [` ${numberText}`],
                    variant: "body1",
                    color: "primary",
                },
            ],
            // Value: markdown detail
            value: [markdownComponent],
        };
    });
    // Return a DataList to display all alerts responsively
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=521.js.map