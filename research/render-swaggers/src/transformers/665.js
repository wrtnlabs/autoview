export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map the suite status and conclusion to an icon and color for quick visual
    const deriveStatusIcon = () => {
        let iconId = "question-circle";
        let color = "gray";
        // Primary lifecycle status
        switch (input.status) {
            case "in_progress":
                iconId = "spinner";
                color = "blue";
                break;
            case "queued":
            case "waiting":
            case "requested":
            case "pending":
                iconId = "hourglass-half";
                color = "orange";
                break;
            case "completed":
                // When completed, reflect conclusion
                switch (input.conclusion) {
                    case "success":
                        iconId = "check-circle";
                        color = "green";
                        break;
                    case "failure":
                        iconId = "times-circle";
                        color = "red";
                        break;
                    case "neutral":
                        iconId = "minus-circle";
                        color = "yellow";
                        break;
                    case "cancelled":
                    case "action_required":
                    case "startup_failure":
                    case "skipped":
                    case "timed_out":
                    case "stale":
                        iconId = "ban";
                        color = "orange";
                        break;
                    default:
                        iconId = "question-circle";
                        color = "gray";
                }
                break;
            default:
                iconId = "question-circle";
                color = "gray";
        }
        return {
            type: "Icon",
            id: iconId,
            color,
            size: 24,
        };
    };
    // Build a list of key/value pairs to display suite details
    const buildDataListItems = () => {
        const items = [];
        // Helper to push a field if it's non-nullish
        const pushField = (label, value) => {
            if (value !== undefined && value !== null) {
                items.push({
                    type: "DataListItem",
                    label: {
                        type: "Text",
                        content: [label],
                        variant: "subtitle2",
                    },
                    value: {
                        type: "Markdown",
                        // Inline-code style for values
                        content: `\`${value}\``,
                    },
                });
            }
        };
        pushField("Suite ID", input.id);
        pushField("Head SHA", input.head_sha);
        if (input.head_branch !== null) {
            pushField("Branch", input.head_branch);
        }
        pushField("Runs Count", input.latest_check_runs_count);
        if (input.created_at) {
            pushField("Created At", input.created_at);
        }
        if (input.updated_at) {
            pushField("Updated At", input.updated_at);
        }
        return items;
    };
    // Header: suite title and branch, with status icon
    const header = {
        type: "CardHeader",
        title: `Check Suite #${input.id}`,
        description: input.head_branch ? `Branch: ${input.head_branch}` : undefined,
        startElement: deriveStatusIcon(),
    };
    // Main content: a DataList showing the suite's details
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: buildDataListItems(),
        },
    };
    // Footer: link to view more details on GitHub if available
    const footer = {
        type: "CardFooter",
        childrenProps: input.check_runs_url != null
            ? {
                type: "Button",
                label: ["View Details"],
                href: input.check_runs_url,
                variant: "outlined",
                size: "small",
                color: "primary",
            }
            : undefined,
    };
    // Compose as a vertical card for responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=665.js.map