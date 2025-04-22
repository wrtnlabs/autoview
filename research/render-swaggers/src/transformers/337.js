export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // If no data provided, render a simple text message.
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No repositories found",
            variant: "body1",
        };
    }
    // Map GitHub attachment statuses to UI chip colors.
    const statusColorMap = {
        attached: "success",
        enforced: "primary",
        attaching: "info",
        updating: "info",
        removed: "warning",
        detached: "warning",
        removed_by_enterprise: "warning",
        failed: "error",
    };
    const items = [];
    for (const entry of input) {
        const repo = entry.repository;
        if (!repo) {
            // Skip entries missing repository data
            continue;
        }
        const status = (_a = entry.status) !== null && _a !== void 0 ? _a : "unknown";
        const chipColor = (_b = statusColorMap[status]) !== null && _b !== void 0 ? _b : "gray";
        // Owner avatar component
        const avatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 32,
            variant: "primary",
        };
        // Lock icon for private repositories
        const privateIcon = repo.private
            ? {
                type: "Icon",
                id: "lock",
                size: 16,
                color: "gray",
            }
            : null;
        // Main repository title text
        const titleText = {
            type: "Text",
            variant: "body1",
            content: repo.full_name,
        };
        // Optional description as smaller, gray text
        const descriptionText = repo.description
            ? {
                type: "Text",
                variant: "caption",
                color: "gray",
                content: repo.description,
            }
            : null;
        // Status chip reflecting attachment state
        const statusChip = {
            type: "Chip",
            label: status,
            color: chipColor,
            size: "small",
            variant: "filled",
        };
        // Button linking to GitHub
        const viewButton = {
            type: "Button",
            label: "View",
            href: repo.html_url,
            variant: "text",
            color: "primary",
        };
        // Assemble label and value components, omitting any nulls
        const labelComponents = [
            avatar,
            ...(privateIcon ? [privateIcon] : []),
            titleText,
            ...(descriptionText ? [descriptionText] : []),
        ];
        const valueComponents = [
            statusChip,
            viewButton,
        ];
        items.push({
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        });
    }
    // If after filtering there's nothing to display, show a fallback message
    if (items.length === 0) {
        return {
            type: "Text",
            content: "No valid repository entries to display",
            variant: "body1",
        };
    }
    // Return a DataList containing all repository items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=337.js.map