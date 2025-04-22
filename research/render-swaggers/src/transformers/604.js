export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { total_count, jobs } = input;
    // Helper to format duration between two ISO timestamps
    const formatDuration = (start, end) => {
        if (!start || !end)
            return "N/A";
        const s = new Date(start).getTime();
        const e = new Date(end).getTime();
        if (isNaN(s) || isNaN(e) || e < s)
            return "N/A";
        const diff = e - s;
        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor(diff / 1000 / 60);
        return `${minutes}m ${seconds}s`;
    };
    // Map job.status to chip color
    const statusColorMap = {
        queued: "warning",
        in_progress: "info",
        completed: "success",
        waiting: "secondary",
        requested: "secondary",
        pending: "secondary",
    };
    // Map job.conclusion to chip color
    const conclusionColorMap = {
        success: "success",
        failure: "error",
        neutral: "primary",
        cancelled: "warning",
        skipped: "info",
        timed_out: "error",
        action_required: "error",
        "null": "gray",
    };
    // Build DataListItem for each job
    const dataListItems = jobs.map((job) => {
        var _a, _b, _c;
        // Status chip
        const statusChip = {
            type: "Chip",
            label: job.status,
            color: statusColorMap[job.status] || "gray",
            variant: "filled",
            size: "small",
        };
        // Conclusion chip
        const conclusionLabel = (_a = job.conclusion) !== null && _a !== void 0 ? _a : "pending";
        const conclusionChip = {
            type: "Chip",
            label: conclusionLabel,
            color: conclusionColorMap[String(job.conclusion)] || "gray",
            variant: "outlined",
            size: "small",
        };
        // Duration text
        const durationText = {
            type: "Text",
            content: `Duration: ${formatDuration(job.started_at, (_b = job.completed_at) !== null && _b !== void 0 ? _b : undefined)}`,
            variant: "body2",
            color: "tertiary",
        };
        // View button linking to the job run in GitHub
        const viewButton = {
            type: "Button",
            label: "View",
            startElement: {
                type: "Icon",
                id: "external-link",
                size: 16,
            },
            href: (_c = job.html_url) !== null && _c !== void 0 ? _c : job.url,
            variant: "text",
            size: "small",
        };
        return {
            type: "DataListItem",
            // Label shows job name and ID
            label: [
                {
                    type: "Text",
                    content: `${job.name} (#${job.id})`,
                    variant: "subtitle1",
                },
            ],
            // Value shows status, conclusion, duration, and action button
            value: [
                statusChip,
                conclusionChip,
                durationText,
                viewButton,
            ],
        };
    });
    // If no jobs, show a markdown message
    const contentChildren = dataListItems.length
        ? { type: "DataList", childrenProps: dataListItems }
        : {
            type: "Markdown",
            content: "### No jobs found\nThere are currently no job executions to display.",
        };
    // Assemble into a VerticalCard for a responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: `Jobs Summary: ${total_count}`,
                description: `Displaying ${jobs.length} job record${jobs.length !== 1 ? "s" : ""}.`,
            },
            {
                type: "CardContent",
                childrenProps: contentChildren,
            },
        ],
    };
}
//# sourceMappingURL=604.js.map