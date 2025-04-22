export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Extract nested commit info
    const gitCommit = input.commit;
    const authorInfo = gitCommit.author;
    const authorName = (_a = authorInfo === null || authorInfo === void 0 ? void 0 : authorInfo.name) !== null && _a !== void 0 ? _a : "Unknown Author";
    const rawDate = authorInfo === null || authorInfo === void 0 ? void 0 : authorInfo.date;
    // Format date for display
    const formattedDate = rawDate ? new Date(rawDate).toLocaleString() : "";
    // Prepare first line of commit message for header title
    const fullMessage = gitCommit.message;
    const firstLine = fullMessage.split("\n", 1)[0] || "Commit";
    // Build summary chips if stats are available
    const stats = input.stats;
    let summaryItem = null;
    if (stats) {
        const { additions = 0, deletions = 0, total = 0 } = stats;
        summaryItem = {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Summary",
                    variant: "subtitle2",
                },
            ],
            value: [
                {
                    type: "Chip",
                    label: `Additions: ${additions}`,
                    color: "green",
                    size: "small",
                    variant: "outlined",
                },
                {
                    type: "Chip",
                    label: `Deletions: ${deletions}`,
                    color: "red",
                    size: "small",
                    variant: "outlined",
                },
                {
                    type: "Chip",
                    label: `Total: ${total}`,
                    color: "blue",
                    size: "small",
                    variant: "outlined",
                },
            ],
        };
    }
    // Build a DataListItem for each changed file
    const fileItems = [];
    if (input.files && input.files.length) {
        // Map of status to chip color
        const statusColorMap = {
            added: "green",
            removed: "red",
            modified: "blue",
            renamed: "orange",
            copied: "teal",
            changed: "violet",
            unchanged: "gray",
        };
        for (const file of input.files) {
            fileItems.push({
                type: "DataListItem",
                label: [
                    {
                        type: "Text",
                        content: file.filename,
                        variant: "body2",
                    },
                ],
                value: [
                    {
                        type: "Chip",
                        label: file.status,
                        color: (_b = statusColorMap[file.status]) !== null && _b !== void 0 ? _b : "gray",
                        size: "small",
                        variant: "outlined",
                    },
                    {
                        type: "Chip",
                        label: `+${file.additions}`,
                        color: "green",
                        size: "small",
                        variant: "outlined",
                    },
                    {
                        type: "Chip",
                        label: `-${file.deletions}`,
                        color: "red",
                        size: "small",
                        variant: "outlined",
                    },
                ],
            });
        }
    }
    // If no stats and no files, show a placeholder markdown
    const dataListChildren = [];
    if (summaryItem) {
        dataListChildren.push(summaryItem);
    }
    if (fileItems.length) {
        dataListChildren.push(...fileItems);
    }
    const dataListComponent = {
        type: "DataList",
        childrenProps: dataListChildren.length
            ? dataListChildren
            : [
                {
                    type: "DataListItem",
                    label: [
                        {
                            type: "Text",
                            content: "No changes",
                            variant: "body2",
                        },
                    ],
                },
            ],
    };
    // Markdown component to render full commit message
    const markdownComponent = {
        type: "Markdown",
        content: `### Commit Message\n\n${fullMessage}`,
    };
    // Card header with commit summary
    const headerComponent = {
        type: "CardHeader",
        title: firstLine,
        description: formattedDate ? `${authorName} • ${formattedDate}` : authorName,
        // A simple code icon to represent the commit
        startElement: {
            type: "Icon",
            id: "code-branch",
            size: 24,
            color: "gray",
        },
    };
    // Card content combining message and file stats
    const contentComponent = {
        type: "CardContent",
        childrenProps: [markdownComponent, dataListComponent],
    };
    // Footer buttons linking to GitHub resources
    const footerComponent = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                label: "View on GitHub",
                variant: "text",
                color: "primary",
                size: "small",
                href: input.html_url,
                startElement: {
                    type: "Icon",
                    id: "github",
                    size: 16,
                    color: "gray",
                },
            },
            {
                type: "Button",
                label: "View Comments",
                variant: "text",
                color: "primary",
                size: "small",
                href: input.comments_url,
                startElement: {
                    type: "Icon",
                    id: "comment",
                    size: 16,
                    color: "gray",
                },
            },
        ],
    };
    // Assemble into a vertical card for responsive display
    const card = {
        type: "VerticalCard",
        childrenProps: [headerComponent, contentComponent, footerComponent],
    };
    return card;
}
//# sourceMappingURL=806.js.map