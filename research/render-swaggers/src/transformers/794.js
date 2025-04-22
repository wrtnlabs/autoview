export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Derive author information, handling possible null user
    const authorLogin = input.user ? input.user.login : "Unknown";
    const authorAvatar = input.user && input.user.avatar_url;
    // Prepare badge to indicate issue state (open/closed)
    const stateBadge = {
        type: "Badge",
        // Use a colored dot to represent state
        dot: true,
        color: input.state === "open" ? "yellow" : "green",
        childrenProps: {
            type: "Icon",
            id: input.state === "open" ? "circle-notch" : "check-circle",
            color: input.state === "open" ? "yellow" : "green",
            size: 16
        },
        // position the dot at the top-right of the icon
        offset: { vertical: "top", horizontal: "right" }
    };
    // Build a list of key metadata (assignee, comments, reactions)
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Assignee", variant: "subtitle2" },
            value: input.assignee
                ? {
                    type: "Avatar",
                    src: input.assignee.avatar_url,
                    name: input.assignee.login,
                    variant: "primary",
                    size: 24
                }
                : { type: "Text", content: "Unassigned", variant: "body2" }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Comments", variant: "subtitle2" },
            value: { type: "Text", content: String(input.comments), variant: "body2" }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Reactions", variant: "subtitle2" },
            value: {
                type: "Text",
                content: String((_b = (_a = input.reactions) === null || _a === void 0 ? void 0 : _a.total_count) !== null && _b !== void 0 ? _b : 0),
                variant: "body2"
            }
        }
    ];
    // Compose the vertical card with header, body (markdown + data list), and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [
            Object.assign(Object.assign({ type: "CardHeader", title: input.title, description: `#${input.number} opened by ${authorLogin}` }, (authorAvatar
                ? {
                    startElement: {
                        type: "Avatar",
                        src: authorAvatar,
                        name: authorLogin,
                        variant: "primary",
                        size: 32
                    }
                }
                : {})), { endElement: stateBadge }),
            {
                type: "CardContent",
                childrenProps: [
                    // Render the issue body as markdown if present
                    ...(input.body
                        ? [
                            {
                                type: "Markdown",
                                content: input.body
                            }
                        ]
                        : []),
                    // Always show the key metadata as a data list
                    {
                        type: "DataList",
                        childrenProps: dataListItems
                    }
                ]
            },
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        variant: "text",
                        color: "primary",
                        size: "small",
                        label: "View on GitHub",
                        href: input.html_url,
                        startElement: {
                            type: "Icon",
                            id: "github",
                            color: "gray",
                            size: 16
                        }
                    }
                ]
            }
        ]
    };
    return card;
}
//# sourceMappingURL=794.js.map