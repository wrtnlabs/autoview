export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Icon representing a Git branch
    const branchIcon = {
        type: "Icon",
        id: "code-branch",
        color: "blue",
        size: 24,
    };
    // Icon representing the protection state (lock/unlock)
    const protectionIcon = {
        type: "Icon",
        id: input["protected"] ? "lock" : "unlock",
        color: input["protected"] ? "green" : "orange",
        size: 24,
    };
    // Build the list of branch metadata as key/value pairs
    const listItems = [];
    // HTML link to GitHub branch page
    listItems.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: "Branch Page",
            },
        ],
        value: {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            href: input._links.html,
            startElement: {
                type: "Icon",
                id: "external-link-alt",
                size: 12,
            },
            label: ["Open"],
        },
    });
    // API self link
    listItems.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: "API Endpoint",
            },
        ],
        value: {
            type: "Button",
            variant: "text",
            color: "secondary",
            size: "small",
            href: input._links.self,
            startElement: {
                type: "Icon",
                id: "code",
                size: 12,
            },
            label: ["Fetch"],
        },
    });
    // Required approving review count, if specified
    if (input.required_approving_review_count !== undefined) {
        listItems.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Required Reviews",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: String(input.required_approving_review_count),
                },
            ],
        });
    }
    // Protection URL
    listItems.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: "Protection Settings",
            },
        ],
        value: {
            type: "Button",
            variant: "text",
            color: "info",
            size: "small",
            href: input.protection_url,
            startElement: {
                type: "Icon",
                id: "cog",
                size: 12,
            },
            label: ["View"],
        },
    });
    // Commit information for the footer, using markdown for rich formatting
    const shaShort = input.commit.sha.slice(0, 7);
    const commitMessage = input.commit.commit.message;
    const authorMeta = input.commit.commit.author;
    // If the GitHub API user object is present, we could extract an avatar URL,
    // but since it's typed as 'any' we avoid hard assumptions and show textual metadata.
    const authorName = (_a = authorMeta === null || authorMeta === void 0 ? void 0 : authorMeta.name) !== null && _a !== void 0 ? _a : "Unknown";
    const authorDate = (_b = authorMeta === null || authorMeta === void 0 ? void 0 : authorMeta.date) !== null && _b !== void 0 ? _b : "Unknown date";
    const commitMarkdown = [
        `### Commit [\`${shaShort}\`](${input.commit.html_url})`,
        "",
        commitMessage,
        "",
        `- **Author**: ${authorName}`,
        `- **Date**: ${authorDate}`,
    ].join("\n");
    // Compose the card header, content (data list), and footer (commit info)
    const cardHeader = {
        type: "CardHeader",
        title: input.name,
        description: input.pattern ? `Pattern: ${input.pattern}` : undefined,
        startElement: branchIcon,
        endElement: protectionIcon,
    };
    const cardContent = {
        type: "CardContent",
        // Embed the DataList as the only child of the content area
        childrenProps: {
            type: "DataList",
            childrenProps: listItems,
        },
    };
    const cardFooter = {
        type: "CardFooter",
        childrenProps: {
            type: "Markdown",
            content: commitMarkdown,
        },
    };
    // Return a vertical card wrapping header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=657.js.map