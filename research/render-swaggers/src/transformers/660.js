export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: capitalize a string
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    // Map statuses and conclusions to FontAwesome icon names
    const statusIconMap = {
        queued: "hourglass-half",
        in_progress: "spinner",
        waiting: "hourglass-start",
        requested: "paper-plane",
        pending: "clock",
        completed: "check-circle",
    };
    const conclusionIconMap = {
        success: "check-circle",
        failure: "times-circle",
        neutral: "minus-circle",
        cancelled: "ban",
        skipped: "forward",
        timed_out: "hourglass-end",
        action_required: "exclamation-circle",
    };
    // Determine which icon and color to show in the header
    let iconId = statusIconMap[input.status] || "question-circle";
    let iconColor = "gray";
    if (input.status === "in_progress") {
        iconColor = "blue";
    }
    else if (input.status === "completed") {
        const concl = input.conclusion || "neutral";
        iconId = conclusionIconMap[concl] || statusIconMap.completed;
        iconColor = concl === "success" ? "green" : "red";
    }
    else if (input.status === "queued" || input.status === "waiting") {
        iconColor = "orange";
    }
    // Format dates for display
    const formatDate = (dt) => dt ? new Date(dt).toLocaleString() : "—";
    // Compute duration if both timestamps exist
    let durationDisplay = "—";
    if (input.started_at && input.completed_at) {
        const started = new Date(input.started_at).getTime();
        const completed = new Date(input.completed_at).getTime();
        const ms = completed - started;
        if (!isNaN(ms) && ms >= 0) {
            const secs = Math.round(ms / 1000);
            if (secs < 60)
                durationDisplay = `${secs}s`;
            else {
                const mins = Math.floor(secs / 60);
                const rem = secs % 60;
                durationDisplay = rem
                    ? `${mins}m ${rem}s`
                    : `${mins}m`;
            }
        }
    }
    // Build the data list items
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "ID" },
            value: { type: "Text", content: input.id.toString() },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Status" },
            value: {
                type: "Text",
                content: capitalize(input.status),
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Started" },
            value: { type: "Text", content: formatDate(input.started_at) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Completed" },
            value: { type: "Text", content: formatDate(input.completed_at) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Duration" },
            value: { type: "Text", content: durationDisplay },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Annotations" },
            value: {
                type: "Text",
                content: input.output.annotations_count.toString(),
            },
        },
    ];
    // Optionally add markdown summary if present
    const markdownContentParts = [];
    if (input.output.title) {
        markdownContentParts.push(`## ${input.output.title}`);
    }
    if (input.output.summary) {
        markdownContentParts.push(input.output.summary);
    }
    if (input.output.text) {
        markdownContentParts.push(input.output.text);
    }
    const markdown = markdownContentParts.length > 0
        ? {
            type: "Markdown",
            content: markdownContentParts.join("\n\n"),
        }
        : null;
    // Action buttons for details and annotations
    const footerButtons = [
        {
            type: "Button",
            variant: "outlined",
            size: "small",
            label: "View on GitHub",
            href: input.html_url || input.url,
            startElement: {
                type: "Icon",
                id: "link",
                size: 16,
                color: "blue",
            },
        },
        {
            type: "Button",
            variant: "outlined",
            size: "small",
            label: "Annotations",
            href: input.output.annotations_url,
            startElement: {
                type: "Icon",
                id: "align-left",
                size: 16,
                color: "teal",
            },
        },
    ];
    // Compose the vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with status icon
            {
                type: "CardHeader",
                title: input.name,
                description: input.status === "completed" && input.conclusion
                    ? `${capitalize(input.status)} (${capitalize(input.conclusion)})`
                    : capitalize(input.status),
                startElement: {
                    type: "Icon",
                    id: iconId,
                    color: iconColor,
                    size: 24,
                },
            },
            // Main content: data list + optional markdown
            {
                type: "CardContent",
                childrenProps: markdown
                    ? [
                        { type: "DataList", childrenProps: dataListItems },
                        markdown,
                    ]
                    : [{ type: "DataList", childrenProps: dataListItems }],
            },
            // Footer with action buttons
            {
                type: "CardFooter",
                childrenProps: footerButtons,
            },
        ],
    };
}
//# sourceMappingURL=660.js.map