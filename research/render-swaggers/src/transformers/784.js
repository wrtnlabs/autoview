export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Prepare header with user avatar, title, and subtitle information.
    const header = {
        type: "CardHeader",
        title: input.title,
        description: `#${input.number} opened on ${new Date(input.created_at).toLocaleDateString()} by ${((_a = input.user) === null || _a === void 0 ? void 0 : _a.login) || "unknown"}`,
        startElement: {
            type: "Avatar",
            src: (_b = input.user) === null || _b === void 0 ? void 0 : _b.avatar_url,
            name: (_c = input.user) === null || _c === void 0 ? void 0 : _c.login,
            variant: "primary",
            size: 40,
        },
    };
    // Map issue state to color-coded chips
    const stateChips = [];
    // Primary state chip: open vs closed
    stateChips.push({
        type: "Chip",
        label: input.state.toUpperCase(),
        color: input.state === "open" ? "green" : "red",
        variant: "filled",
        size: "small",
    });
    // Optional state_reason chip
    if (input.state_reason) {
        stateChips.push({
            type: "Chip",
            label: input.state_reason.replace("_", " ").toUpperCase(),
            color: "orange",
            variant: "outlined",
            size: "small",
        });
    }
    // Map labels (string or object) to chips
    const labelChips = [];
    if (Array.isArray(input.labels) && input.labels.length > 0) {
        for (const raw of input.labels) {
            const name = typeof raw === "string"
                ? raw
                : raw.name || String(raw.id) || "unknown";
            labelChips.push({
                type: "Chip",
                label: name,
                color: "primary",
                variant: "filled",
                size: "small",
            });
        }
    }
    // Prepare a markdown view of the issue body if present
    const bodyMarkdown = input.body
        ? {
            type: "Markdown",
            content: input.body,
        }
        : null;
    // Prepare a simple data list for key metrics (comments, reactions)
    const listItems = [];
    // Comments count
    listItems.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: ["Comments"],
                variant: "body2",
                color: "tertiary",
            },
        ],
        value: [
            {
                type: "Text",
                content: [String(input.comments)],
                variant: "body2",
                color: "primary",
            },
        ],
    });
    // Total reactions (if available)
    const totalReactions = (_e = (_d = input.reactions) === null || _d === void 0 ? void 0 : _d.total_count) !== null && _e !== void 0 ? _e : 0;
    listItems.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: ["Reactions"],
                variant: "body2",
                color: "tertiary",
            },
        ],
        value: [
            {
                type: "Text",
                content: [String(totalReactions)],
                variant: "body2",
                color: "primary",
            },
        ],
    });
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Footer with a link button to view the issue on GitHub
    const footerButton = {
        type: "Button",
        label: "View on GitHub",
        href: input.html_url,
        variant: "text",
        color: "primary",
        startElement: {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 16,
        },
    };
    // Compose the vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: [
                    // Show state chips in a group
                    {
                        type: "ChipGroup",
                        childrenProps: stateChips,
                    },
                    // Show label chips in a group (if any)
                    ...(labelChips.length
                        ? [
                            {
                                type: "ChipGroup",
                                childrenProps: labelChips,
                            },
                        ]
                        : []),
                    // Render markdown body (if present)
                    ...(bodyMarkdown ? [bodyMarkdown] : []),
                    // Show key metrics
                    dataList,
                ],
            },
            {
                type: "CardFooter",
                childrenProps: [footerButton],
            },
        ],
    };
}
//# sourceMappingURL=784.js.map