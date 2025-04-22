export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Map a check run's status and conclusion to an icon name and color.
     * Uses FontAwesome icon IDs in kebab-case.
     */
    function getStatusIconProps(status, conclusion) {
        let id;
        let color;
        if (status === "completed") {
            // Use conclusion-specific icons
            switch (conclusion) {
                case "success":
                    id = "check-circle";
                    color = "green";
                    break;
                case "failure":
                    id = "times-circle";
                    color = "red";
                    break;
                case "neutral":
                    id = "minus-circle";
                    color = "gray";
                    break;
                case "cancelled":
                    id = "ban";
                    color = "orange";
                    break;
                case "skipped":
                    id = "forward";
                    color = "cyan";
                    break;
                case "timed_out":
                    id = "hourglass-end";
                    color = "orange";
                    break;
                case "action_required":
                    id = "exclamation-circle";
                    color = "red";
                    break;
                default:
                    // conclusion null or unknown
                    id = "question-circle";
                    color = "gray";
            }
        }
        else {
            // In-flight statuses
            switch (status) {
                case "queued":
                case "waiting":
                case "requested":
                    id = "clock";
                    color = "gray";
                    break;
                case "in_progress":
                case "pending":
                    id = "spinner";
                    color = "blue";
                    break;
                default:
                    id = "question-circle";
                    color = "gray";
            }
        }
        return {
            type: "Icon",
            id,
            color,
            size: 20,
        };
    }
    // Transform each check run into a DataListItem component
    const items = input.check_runs.map((run) => {
        var _a, _b, _c;
        const icon = getStatusIconProps(run.status, run.conclusion);
        const nameText = {
            type: "Text",
            content: run.name,
            variant: "body1",
        };
        // Build markdown content: summary + link to details
        const summary = (_a = run.output.summary) !== null && _a !== void 0 ? _a : "_No summary provided._";
        const link = (_c = (_b = run.html_url) !== null && _b !== void 0 ? _b : run.details_url) !== null && _c !== void 0 ? _c : run.url;
        const markdownContent = `
**Summary**

${summary}

[View details](${link})
`;
        const valueMarkdown = {
            type: "Markdown",
            content: markdownContent.trim(),
        };
        return {
            type: "DataListItem",
            // label is an array: [icon, text]
            label: [icon, nameText],
            // value is the markdown summary + link
            value: valueMarkdown,
        };
    });
    // Return a DataList that holds all check run items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=666.js.map