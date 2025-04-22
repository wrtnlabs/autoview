export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    // 1. Card header: show group name and description, with an avatar derived from the group name
    const header = {
        type: "CardHeader",
        title: (_b = (_a = input.group) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Group",
        description: (_c = input.group) === null || _c === void 0 ? void 0 : _c.description,
        startElement: {
            type: "Avatar",
            name: (_e = (_d = input.group) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "",
            size: 40,
        },
    };
    // 2. Card content: render a DataList of managers, or a Markdown notice if none
    let content;
    if (input.managers && input.managers.length > 0) {
        const listItems = input.managers.map((mgr) => ({
            type: "DataListItem",
            // label shows avatar + manager name
            label: [
                {
                    type: "Avatar",
                    src: mgr.avatarUrl,
                    name: mgr.name,
                    size: 32,
                },
                {
                    type: "Text",
                    content: mgr.name,
                    variant: "body1",
                },
            ],
            // value shows email in a lighter style
            value: {
                type: "Text",
                content: mgr.email,
                variant: "body2",
                color: "secondary",
            },
        }));
        content = {
            type: "CardContent",
            // DataList is itself a presentation component, so we can pass it directly
            childrenProps: {
                type: "DataList",
                childrenProps: listItems,
            },
        };
    }
    else {
        // fallback message when no managers are present
        content = {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: "⚠️ No managers available in this group.",
            },
        };
    }
    // 3. Card footer: summary chips for online count, unread session messages, bookmark status
    const footerChips = [];
    if (input.onlines) {
        footerChips.push({
            type: "Chip",
            label: `${input.onlines.length} Online`,
            color: "success",
            size: "small",
            variant: "filled",
        });
    }
    if (input.session) {
        const unread = (_f = input.session.unread) !== null && _f !== void 0 ? _f : 0;
        footerChips.push({
            type: "Chip",
            label: `Unread: ${unread}`,
            // highlight if there are unread messages
            color: unread > 0 ? "error" : "primary",
            size: "small",
            variant: "filled",
        });
    }
    if (input.bookmark) {
        footerChips.push({
            type: "Chip",
            label: "Bookmarked",
            color: "warning",
            size: "small",
            variant: "filled",
        });
    }
    const footer = {
        type: "CardFooter",
        // pass chips array directly; if empty, it's simply ignored
        childrenProps: footerChips.length > 0 ? footerChips : undefined,
    };
    // 4. Compose the VerticalCard with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=186.js.map