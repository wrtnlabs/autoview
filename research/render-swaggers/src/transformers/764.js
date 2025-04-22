export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Map statuses to icons and colors for visual status indicator
    const statusIconMap = {
        complete: "check-circle",
        error: "times-circle",
        auth: "key",
        importing: "spinner",
        mapping: "cogs",
        pushing: "upload",
        detecting: "search",
    };
    const statusColorMap = {
        complete: "green",
        error: "red",
        auth_failed: "red",
        importing: "blue",
        mapping: "orange",
        pushing: "cyan",
        detecting: "gray",
    };
    const iconId = statusIconMap[input.status] || "info-circle";
    const iconColor = statusColorMap[input.status] || "gray";
    // Header: display repository URL as title, status as description, and an icon
    const header = {
        type: "CardHeader",
        title: input.vcs_url,
        description: `Status: ${input.status.replace(/_/g, " ")}`,
        startElement: {
            type: "Icon",
            id: iconId,
            color: iconColor,
            size: 24,
        },
    };
    // Build a list of key/value pairs to display in the content
    const items = [];
    // Helper to push a labelled data item
    const pushItem = (labelText, valueComp) => {
        items.push({
            type: "DataListItem",
            // Label styled as a subtitle
            label: [
                {
                    type: "Text",
                    content: labelText,
                    variant: "subtitle2",
                    color: "tertiary",
                },
            ],
            value: [valueComp],
        });
    };
    // Repository link (markdown for clickable link)
    pushItem("Repository", {
        type: "Markdown",
        content: `[🔗 Open Repo](${input.html_url})`,
    });
    // Version control system
    if (input.vcs !== null) {
        pushItem("VCS", {
            type: "Chip",
            label: input.vcs,
            variant: "outlined",
            color: "blue",
            size: "small",
        });
    }
    // Git LFS usage
    if (input.use_lfs !== undefined) {
        pushItem("Git LFS", {
            type: "Chip",
            label: input.use_lfs ? "Enabled" : "Disabled",
            variant: "outlined",
            color: input.use_lfs ? "green" : "gray",
            size: "small",
        });
    }
    // Commit count
    if (input.commit_count != null) {
        pushItem("Commits", {
            type: "Text",
            content: String(input.commit_count),
            variant: "body2",
        });
    }
    // Import progress percentage
    if (input.import_percent != null) {
        pushItem("Import Progress", {
            type: "Text",
            content: `${input.import_percent}%`,
            variant: "body2",
        });
    }
    // Push progress percentage
    if (input.push_percent != null) {
        pushItem("Push Progress", {
            type: "Text",
            content: `${input.push_percent}%`,
            variant: "body2",
        });
    }
    // Large files indicator
    if (input.has_large_files) {
        const size = (_a = input.large_files_size) !== null && _a !== void 0 ? _a : 0;
        const count = (_b = input.large_files_count) !== null && _b !== void 0 ? _b : 0;
        pushItem("Large Files", {
            type: "Chip",
            label: `Size: ${size} MB, Count: ${count}`,
            variant: "outlined",
            color: "warning",
            size: "small",
        });
    }
    // Error message, if any
    if (input.error_message) {
        pushItem("Error", {
            type: "Text",
            content: input.error_message,
            variant: "body2",
            color: "error",
        });
    }
    // Compose the data list component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Content section of the card
    const content = {
        type: "CardContent",
        // Single child is the data list
        childrenProps: dataList,
    };
    // Footer with an action button to view more details
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                label: "View Details",
                href: input.html_url,
                variant: "outlined",
                size: "small",
            },
        ],
    };
    // Assemble the final vertical card
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=764.js.map