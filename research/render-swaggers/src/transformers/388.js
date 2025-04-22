export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map statuses to human-readable labels and colors
    const repoStatus = input.enabled_repositories;
    const actionStatus = (_a = input.allowed_actions) !== null && _a !== void 0 ? _a : "all";
    const repoLabelMap = {
        all: "All Repositories",
        none: "No Repositories",
        selected: "Selected Repositories",
    };
    const actionLabelMap = {
        all: "All Actions",
        local_only: "Local Actions Only",
        selected: "Selected Actions",
    };
    const repoChipColorMap = {
        all: "green",
        none: "error",
        selected: "info",
    };
    const actionChipColorMap = {
        all: "green",
        local_only: "warning",
        selected: "info",
    };
    // Compose the repository status value: chip + optional manage button
    const repoValueComponents = [
        {
            type: "Chip",
            label: repoLabelMap[repoStatus],
            color: repoChipColorMap[repoStatus],
            variant: "filled",
            size: "small",
        },
    ];
    if (repoStatus === "selected" && input.selected_repositories_url) {
        repoValueComponents.push({
            type: "Button",
            label: "Manage Repositories",
            href: input.selected_repositories_url,
            variant: "outlined",
            size: "small",
            color: "primary",
        });
    }
    // Compose the actions status value: chip + optional manage button
    const actionValueComponents = [
        {
            type: "Chip",
            label: actionLabelMap[actionStatus],
            color: actionChipColorMap[actionStatus],
            variant: "filled",
            size: "small",
        },
    ];
    if (actionStatus === "selected" && input.selected_actions_url) {
        actionValueComponents.push({
            type: "Button",
            label: "Manage Actions",
            href: input.selected_actions_url,
            variant: "outlined",
            size: "small",
            color: "primary",
        });
    }
    // Build data list items for display
    const repoItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Allowed Repositories",
            variant: "subtitle2",
        },
        value: repoValueComponents.length === 1 ? repoValueComponents[0] : repoValueComponents,
    };
    const actionItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Allowed Actions",
            variant: "subtitle2",
        },
        value: actionValueComponents.length === 1 ? actionValueComponents[0] : actionValueComponents,
    };
    // Compose the full card view
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with icon for quick glancing
                type: "CardHeader",
                title: "GitHub Actions Permissions",
                description: "Configure which repositories and reusable workflows can run GitHub Actions in this organization.",
                startElement: {
                    type: "Icon",
                    id: "github",
                    size: 32,
                    color: "gray",
                },
            },
            {
                // Content: a structured list of settings
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: [repoItem, actionItem],
                },
            },
        ],
    };
}
//# sourceMappingURL=388.js.map