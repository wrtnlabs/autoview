export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map job status to FontAwesome icon names
    const statusIconMap = {
        queued: "hourglass-start",
        in_progress: "spinner",
        waiting: "pause",
        requested: "question-circle",
        pending: "hourglass-half",
        completed: "check-circle", // falls back to conclusion coloring
    };
    // Determine icon color based on status and conclusion
    const getStatusColor = () => {
        if (input.status === "completed") {
            return input.conclusion === "success" ? "green" : "red";
        }
        // in-progress/status colors
        switch (input.status) {
            case "in_progress":
                return "blue";
            case "queued":
            case "pending":
                return "orange";
            case "waiting":
                return "gray";
            case "requested":
                return "teal";
            default:
                return "gray";
        }
    };
    // Build timestamp markdown
    const timestampMd = [
        "### Timestamps",
        `- **Created:** ${input.created_at}`,
        `- **Started:** ${input.started_at}`,
        `- **Completed:** ${(_a = input.completed_at) !== null && _a !== void 0 ? _a : "N/A"}`,
    ].join("\n");
    // Build steps markdown if any
    const stepsMd = input.steps && input.steps.length > 0
        ? [
            "### Steps",
            ...input.steps.map((step) => `- **${step.number}. ${step.name}**: ${step.status}${step.conclusion ? ` (${step.conclusion})` : ""}`),
        ].join("\n")
        : "";
    // Build label chips if any labels
    const labelChips = (input.labels || []).map((lbl) => ({
        type: "Chip",
        label: lbl,
        size: "small",
        variant: "outlined",
    }));
    // Compose the VerticalCard with header, content, and optional footer
    const cardChildren = [];
    // Header: job name, id/run summary, and status icon
    cardChildren.push({
        type: "CardHeader",
        title: input.name,
        description: `Job #${input.id} in run ${input.run_id}`,
        startElement: {
            type: "Icon",
            id: statusIconMap[input.status] || "question-circle",
            color: getStatusColor(),
            size: 24,
        },
    });
    // Content: timestamps and steps as markdown (responsive and easy to read)
    const contentChildren = [
        {
            type: "Markdown",
            content: timestampMd,
        },
    ];
    if (stepsMd) {
        contentChildren.push({
            type: "Markdown",
            content: stepsMd,
        });
    }
    cardChildren.push({
        type: "CardContent",
        childrenProps: contentChildren,
    });
    // Footer: chip group of labels if present
    if (labelChips.length > 0) {
        cardChildren.push({
            type: "CardFooter",
            childrenProps: {
                type: "ChipGroup",
                childrenProps: labelChips,
            },
        });
    }
    // Return as VerticalCard, which is one of IAutoViewComponentProps
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=577.js.map