export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map Dependabot severity levels to UI color names
    const severityColorMap = {
        low: "green",
        medium: "yellow",
        high: "orange",
        critical: "red",
    };
    // Transform each alert into a DataListItem component
    const listItems = input.map((alert) => {
        var _a;
        const { repository, security_advisory, html_url } = alert;
        const owner = repository.owner;
        const severity = security_advisory.severity;
        const chipColor = (_a = severityColorMap[severity]) !== null && _a !== void 0 ? _a : "gray";
        // Label: avatar + repo full name
        const labelComponents = [
            {
                type: "Avatar",
                src: owner.avatar_url,
                name: owner.login,
            },
            {
                type: "Text",
                content: repository.full_name,
                variant: "body1",
                color: "primary",
            },
        ];
        // Value: severity chip, link to alert, and summary text
        const valueComponents = [
            {
                type: "Chip",
                label: severity.toUpperCase(),
                color: chipColor,
                size: "small",
                variant: "filled",
            },
            {
                type: "Markdown",
                content: `[View Alert](${html_url})`,
            },
            {
                type: "Text",
                content: security_advisory.summary,
                variant: "body2",
                // Clamp long summaries to 2 lines on mobile
                lineClamp: 2,
            },
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Compose the final DataList component
    return {
        type: "DataList",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=441.js.map