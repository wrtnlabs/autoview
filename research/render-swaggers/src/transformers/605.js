export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: pick an icon and color based on job status
    const mapStatusToIcon = (status) => {
        switch (status) {
            case "in_progress":
                return { type: "Icon", id: "spinner", color: "blue", size: 20 };
            case "queued":
            case "pending":
            case "waiting":
            case "requested":
                return { type: "Icon", id: "clock", color: "gray", size: 20 };
            case "completed":
                return { type: "Icon", id: "check-circle", color: "green", size: 20 };
            default:
                return { type: "Icon", id: "question-circle", color: "gray", size: 20 };
        }
    };
    // Helper: map conclusion to chip color
    const mapConclusionToColor = (conclusion) => {
        switch (conclusion) {
            case "success":
                return "green";
            case "failure":
            case "timed_out":
                return "error";
            case "cancelled":
                return "orange";
            case "skipped":
                return "warning";
            case "neutral":
                return "gray";
            case "action_required":
                return "red";
            default:
                return "gray";
        }
    };
    // Ensure we have a jobs array
    const jobs = Array.isArray(input.jobs) ? input.jobs : [];
    // Build a subheader showing total count
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            content: `Total Jobs: ${input.total_count}`,
            variant: "subtitle1",
            color: "primary",
        },
    };
    // Transform each job into a list item
    const jobItems = jobs.map((job) => {
        var _a, _b, _c;
        // Format description: branch and run id
        const branch = (_a = job.head_branch) !== null && _a !== void 0 ? _a : "unknown";
        const description = `Branch: ${branch} | Run #${job.run_id}`;
        // Icon representing status
        const statusIcon = mapStatusToIcon(job.status);
        // Chip representing conclusion
        const conclusionLabel = (_b = job.conclusion) !== null && _b !== void 0 ? _b : "unknown";
        const conclusionChip = {
            type: "Chip",
            label: conclusionLabel,
            color: mapConclusionToColor(job.conclusion),
            size: "small",
            variant: "filled",
        };
        // Compose the list item
        const listItem = {
            type: "ListItem",
            title: job.name,
            description,
            startElement: statusIcon,
            endElement: conclusionChip,
            // If html_url is null, omit href
            href: (_c = job.html_url) !== null && _c !== void 0 ? _c : undefined,
        };
        return listItem;
    });
    // Final List component combining subheader and job items
    const listProps = {
        type: "List",
        childrenProps: [subheader, ...jobItems],
    };
    return listProps;
}
//# sourceMappingURL=605.js.map