export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Helper: map status and conclusion to an icon representation
    const statusIcon = (() => {
        if (input.status === "queued") {
            return { type: "Icon", id: "hourglass-start", color: "gray", size: 20 };
        }
        if (input.status === "in_progress") {
            // spinner from FontAwesome solid
            return { type: "Icon", id: "spinner", color: "blue", size: 20 };
        }
        if (input.status === "completed") {
            switch (input.conclusion) {
                case "success":
                    return { type: "Icon", id: "check-circle", color: "green", size: 20 };
                case "failure":
                case "timed_out":
                case "cancelled":
                case "action_required":
                    return { type: "Icon", id: "times-circle", color: "red", size: 20 };
                default:
                    return { type: "Icon", id: "question-circle", color: "gray", size: 20 };
            }
        }
        // fallback unknown status
        return { type: "Icon", id: "question-circle", color: "gray", size: 20 };
    })();
    // Helper: format date-time or show N/A
    const fmtDate = (raw) => raw ? new Date(raw).toLocaleString() : "N/A";
    // Build a list of key-value pairs to display
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Branch" },
            value: {
                type: "Chip",
                label: (_a = input.head_branch) !== null && _a !== void 0 ? _a : "N/A",
                variant: "filled",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Commit SHA" },
            value: {
                type: "Text",
                variant: "body2",
                content: input.head_sha.slice(0, 7),
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Message" },
            // Use markdown to allow code formatting or wrapping
            value: {
                type: "Markdown",
                content: `\`\`\`\n${input.head_commit.message}\n\`\`\``,
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Author" },
            value: {
                type: "Text",
                variant: "body2",
                content: (_c = (_b = input.head_commit.author) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "Unknown",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Created At" },
            value: {
                type: "Text",
                variant: "body2",
                content: fmtDate(input.created_at),
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Updated At" },
            value: {
                type: "Text",
                variant: "body2",
                content: fmtDate(input.updated_at),
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Check Runs" },
            value: {
                type: "Badge",
                count: input.latest_check_runs_count,
                maxCount: 999,
                showZero: true,
                childrenProps: { type: "Icon", id: "tasks", color: "gray", size: 16 },
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Conclusion" },
            value: {
                type: "Chip",
                label: (_d = input.conclusion) !== null && _d !== void 0 ? _d : "N/A",
                variant: "outlined",
                color: input.conclusion === "success"
                    ? "green"
                    : input.conclusion === "failure"
                        ? "red"
                        : "gray",
                size: "small",
            },
        },
    ];
    // Compose the vertical card UI
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Header with repo owner avatar and status icon
            {
                type: "CardHeader",
                title: `Check Suite #${input.id}`,
                description: input.repository.full_name,
                startElement: {
                    type: "Avatar",
                    src: input.repository.owner.avatar_url,
                    name: input.repository.owner.login,
                    size: 32,
                },
                endElement: statusIcon,
            },
            // Content: DataList of details
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
            // Footer: link back to GitHub
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    label: "View on GitHub",
                    variant: "text",
                    color: "primary",
                    startElement: {
                        type: "Icon",
                        id: "github",
                        color: "gray",
                        size: 16,
                    },
                    href: input.repository.html_url,
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=663.js.map