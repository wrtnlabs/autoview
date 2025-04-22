export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Helper to format dates in a concise way
    const formatDate = (iso) => {
        const d = new Date(iso);
        // e.g., "Mar 3, 2023"
        return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    };
    // 1. Card Header: show avatar, title, subtitle, and state chip
    const header = {
        type: "CardHeader",
        title: input.title,
        description: `#${input.number} · opened on ${formatDate(input.created_at)}`,
        startElement: {
            type: "Avatar",
            // user may be null if nullable_simple_user is null; guard against it
            src: (_b = (_a = input.user) === null || _a === void 0 ? void 0 : _a.avatar_url) !== null && _b !== void 0 ? _b : "",
            name: (_d = (_c = input.user) === null || _c === void 0 ? void 0 : _c.login) !== null && _d !== void 0 ? _d : "",
            variant: "blue",
            size: 32
        },
        endElement: {
            type: "Chip",
            label: input.state.toUpperCase(),
            // green for open, red for closed, gray otherwise
            color: input.state === "open" ? "green" : input.state === "closed" ? "red" : "gray",
            size: "small",
            variant: "filled"
        }
    };
    // 2. Build a data list of key fields
    const listItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created" },
            value: { type: "Text", content: formatDate(input.created_at) }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated" },
            value: { type: "Text", content: formatDate(input.updated_at) }
        }
    ];
    // If the issue is closed, show closed date
    if (input.closed_at) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Closed" },
            value: { type: "Text", content: formatDate(input.closed_at) }
        });
    }
    // Labels might be strings or objects; normalize to label names
    const labelNames = [];
    for (const lbl of (_e = input.labels) !== null && _e !== void 0 ? _e : []) {
        if (typeof lbl === "string")
            labelNames.push(lbl);
        else if (lbl && typeof lbl.name === "string")
            labelNames.push(lbl.name);
    }
    if (labelNames.length > 0) {
        // Create a chip group for labels
        const chips = labelNames.map((name) => ({
            type: "Chip",
            label: name,
            size: "small",
            variant: "outlined"
        }));
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Labels" },
            value: {
                type: "ChipGroup",
                childrenProps: chips
            }
        });
    }
    // 3. Card Content: data list + optional body as markdown
    const contentChildren = [
        {
            type: "DataList",
            childrenProps: listItems
        }
    ];
    if (input.body) {
        contentChildren.push({
            type: "Markdown",
            content: input.body
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren
    };
    // 4. Card Footer: a button to view on GitHub and comment count indicator
    const footerChildren = [];
    // Comment count with icon
    footerChildren.push({
        type: "Icon",
        id: "comment",
        color: "gray",
        size: 16
    });
    footerChildren.push({
        type: "Text",
        content: `${input.comments} comments`
    });
    // "View on GitHub" button
    footerChildren.push({
        type: "Button",
        label: "View on GitHub",
        href: input.html_url,
        variant: "outlined",
        size: "small",
        color: "primary"
    });
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren
    };
    // 5. Compose a vertical card with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
    return card;
}
//# sourceMappingURL=783.js.map