export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map codespace state to a color for visual prominence
    const stateColorMap = {
        Available: "success",
        Created: "info",
        Queued: "info",
        Provisioning: "info",
        Awaiting: "warning",
        Unavailable: "gray",
        Deleted: "darkGray",
        Moved: "info",
        Shutdown: "warning",
        Archived: "darkGray",
        Starting: "info",
        ShuttingDown: "warning",
        Failed: "error",
        Exporting: "info",
        Updating: "info",
        Rebuilding: "info",
        Unknown: "gray",
    };
    // Helper to build a DataListItem with icon+text label and text value
    const makeSimpleItem = (iconId, labelText, valueText) => ({
        type: "DataListItem",
        label: [
            { type: "Icon", id: iconId, size: 16 },
            { type: "Text", content: labelText }
        ],
        value: { type: "Text", content: valueText }
    });
    // Build Git status chips for ahead/behind/unpushed/uncommitted
    const gitChips = [];
    if (input.git_status.ahead !== undefined) {
        gitChips.push({
            type: "Chip",
            label: `↑ ${input.git_status.ahead}`,
            color: input.git_status.ahead > 0 ? "info" : "gray",
            size: "small",
        });
    }
    if (input.git_status.behind !== undefined) {
        gitChips.push({
            type: "Chip",
            label: `↓ ${input.git_status.behind}`,
            color: input.git_status.behind > 0 ? "warning" : "gray",
            size: "small",
        });
    }
    if (input.git_status.has_unpushed_changes) {
        gitChips.push({
            type: "Chip",
            label: "unpushed",
            color: "error",
            size: "small",
        });
    }
    if (input.git_status.has_uncommitted_changes) {
        gitChips.push({
            type: "Chip",
            label: "dirty",
            color: "error",
            size: "small",
        });
    }
    // Assemble the list of items to visualize
    const dataListItems = [
        // Codespace state
        {
            type: "DataListItem",
            label: { type: "Text", content: "State" },
            value: {
                type: "Chip",
                label: input.state,
                color: stateColorMap[input.state] || "gray",
                size: "small",
            }
        },
        // Location
        makeSimpleItem("map-marker-alt", "Location", input.location),
        // Last used
        makeSimpleItem("clock", "Last Used", input.last_used_at),
        // Idle timeout
        {
            type: "DataListItem",
            label: { type: "Text", content: "Idle Timeout" },
            value: {
                type: "Text",
                content: input.idle_timeout_minutes !== null
                    ? `${input.idle_timeout_minutes} min`
                    : "none"
            }
        },
        // Git status
        {
            type: "DataListItem",
            label: { type: "Text", content: "Git Status" },
            value: {
                type: "ChipGroup",
                childrenProps: gitChips.length > 0
                    ? gitChips
                    : [
                        {
                            type: "Chip",
                            label: "clean",
                            color: "success",
                            size: "small"
                        }
                    ]
            }
        }
    ];
    // Card header with owner avatar
    const cardHeader = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.display_name) !== null && _a !== void 0 ? _a : input.name,
        startElement: {
            type: "Avatar",
            src: input.owner.avatar_url,
            name: input.owner.login,
            size: 32,
            variant: "primary"
        }
    };
    // Card content containing the DataList
    const cardContent = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems
        }
    };
    // Card footer with a button to open the codespace in browser
    const cardFooter = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "Open Codespace",
            href: input.web_url,
            startElement: { type: "Icon", id: "external-link-alt", size: 16 },
            variant: "contained",
            color: "primary",
            size: "medium"
        }
    };
    // Return a vertical card combining header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter]
    };
}
//# sourceMappingURL=936.js.map