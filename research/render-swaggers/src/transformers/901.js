export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    /**
     * If there are no issues, show a simple markdown message.
     */
    if (input.items.length === 0) {
        return {
            type: "Markdown",
            content: "**No issues found**",
        };
    }
    // Build an array of list children: a header + optional partial-result chip + one item per issue.
    const children = [];
    // 1) Top subheader showing total count.
    children.push({
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            variant: "h6",
            content: `Total Issues: ${input.total_count}`,
        },
    });
    // 2) If results are incomplete, show a warning chip.
    if (input.incomplete_results) {
        children.push({
            type: "ListSubheader",
            childrenProps: {
                type: "Chip",
                label: "Partial results",
                color: "warning",
                variant: "outlined",
            },
        });
    }
    // 3) One list item per GitHub issue.
    for (const issue of input.items) {
        const user = issue.user;
        const userLogin = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "unknown";
        const avatar = user
            ? {
                type: "Avatar",
                src: user.avatar_url,
                name: userLogin,
                size: 32,
            }
            : undefined;
        // Convert created_at to a simple date string (YYYY-MM-DD).
        const createdDate = issue.created_at
            ? issue.created_at.substring(0, 10)
            : "N/A";
        // Badge for number of comments: uses an icon as its child.
        const commentBadge = {
            type: "Badge",
            count: issue.comments,
            showZero: false,
            childrenProps: {
                type: "Icon",
                id: "comment",
                size: 20,
                color: "gray",
            },
        };
        // A button linking to the issue page.
        const viewButton = {
            type: "Button",
            label: "View",
            variant: "outlined",
            size: "small",
            href: issue.html_url,
        };
        // Chips for each label on the issue.
        const labelChips = (issue.labels || []).map((lbl) => {
            var _a;
            return ({
                type: "Chip",
                label: (_a = lbl.name) !== null && _a !== void 0 ? _a : "",
                variant: "outlined",
                color: "info",
                size: "small",
            });
        });
        // Assemble the list item.
        const listItem = Object.assign(Object.assign({ type: "ListItem", title: issue.title, description: `#${issue.number} opened on ${createdDate}` }, (avatar ? { startElement: avatar } : {})), { 
            // on the right: labels, comment count, and a view button
            endElement: [...labelChips, commentBadge, viewButton] });
        children.push(listItem);
    }
    // Return the top-level List component.
    return {
        type: "List",
        childrenProps: children,
    };
}
//# sourceMappingURL=901.js.map