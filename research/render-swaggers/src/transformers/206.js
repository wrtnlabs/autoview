export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Helper to format timestamps into human‐readable strings
    const formatDate = (ts) => ts ? new Date(ts).toLocaleString() : "N/A";
    // Map legacy tag colors to AutoView chip color variants
    const tagColorMap = {
        red: "red",
        orange: "orange",
        yellow: "yellow",
        olive: "lime",
        green: "green",
        cobalt: "blue",
        purple: "violet",
        pink: "pink",
        navy: "indigo",
    };
    // Build the CardHeader: user avatar or fallback icon + summary
    const header = {
        type: "CardHeader",
        title: (_d = (_b = (_a = input.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_c = input.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : "Unknown User",
        description: input.session != null
            ? `Session Alerts: ${(_e = input.session.alert) !== null && _e !== void 0 ? _e : 0}, Unreads: ${(_f = input.session.unread) !== null && _f !== void 0 ? _f : 0}`
            : undefined,
        startElement: ((_g = input.user) === null || _g === void 0 ? void 0 : _g.avatarUrl) != null
            ? {
                type: "Avatar",
                src: input.user.avatarUrl,
                name: input.user.name,
                variant: "primary",
            }
            : {
                type: "Icon",
                id: "user",
                size: 24,
                color: "gray",
            },
    };
    // Prepare an array of presentation components for the CardContent
    const contentChildren = [];
    // If there are chat tags, display them as a ChipGroup
    if (Array.isArray(input.chatTags) && input.chatTags.length > 0) {
        const chips = input.chatTags.map((tag) => {
            var _a;
            return ({
                type: "Chip",
                label: tag.name,
                color: tag.colorVariant
                    ? (_a = tagColorMap[tag.colorVariant]) !== null && _a !== void 0 ? _a : "gray"
                    : "gray",
                variant: "outlined",
                size: "small",
            });
        });
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: chips,
        });
    }
    // If there is a session, show some key session fields in a DataList
    if (input.session != null) {
        const items = [
            {
                type: "DataListItem",
                label: [
                    {
                        type: "Text",
                        content: "Last Updated",
                        variant: "subtitle2",
                    },
                ],
                value: [
                    {
                        type: "Text",
                        content: formatDate(input.session.updatedAt),
                        variant: "body2",
                    },
                ],
            },
            {
                type: "DataListItem",
                label: [
                    {
                        type: "Text",
                        content: "Unread Count",
                        variant: "subtitle2",
                    },
                ],
                value: [
                    {
                        type: "Text",
                        content: String((_h = input.session.unread) !== null && _h !== void 0 ? _h : 0),
                        variant: "body2",
                    },
                ],
            },
        ];
        contentChildren.push({
            type: "DataList",
            childrenProps: items,
        });
    }
    // Show the latest message content, preferring plainText, then block values
    if (input.message != null) {
        let md = "";
        if (typeof input.message.plainText === "string") {
            md = input.message.plainText;
        }
        else if (Array.isArray(input.message.blocks)) {
            // Concatenate block values into markdown
            md = input.message.blocks
                .map((b) => (b.value ? b.value : ""))
                .join("\n\n");
        }
        // Only push if there's some content
        if (md.trim()) {
            contentChildren.push({
                type: "Markdown",
                content: md,
            });
        }
    }
    // If a one-time message exists, show its send state and schedule
    if (input.oneTimeMsg != null) {
        const ot = input.oneTimeMsg;
        contentChildren.push({
            type: "DataList",
            childrenProps: [
                {
                    type: "DataListItem",
                    label: [{ type: "Text", content: "OTM Name", variant: "subtitle2" }],
                    value: [{ type: "Text", content: ot.name, variant: "body2" }],
                },
                {
                    type: "DataListItem",
                    label: [{ type: "Text", content: "State", variant: "subtitle2" }],
                    value: [{ type: "Text", content: ot.state, variant: "body2" }],
                },
                {
                    type: "DataListItem",
                    label: [
                        { type: "Text", content: "Scheduled At", variant: "subtitle2" },
                    ],
                    value: [
                        {
                            type: "Text",
                            content: formatDate(ot.startAt),
                            variant: "body2",
                        },
                    ],
                },
            ],
        });
    }
    // If there's an associated campaign, show its key metrics
    if (input.campaign != null) {
        const c = input.campaign;
        contentChildren.push({
            type: "DataList",
            childrenProps: [
                {
                    type: "DataListItem",
                    label: [{ type: "Text", content: "Campaign", variant: "subtitle2" }],
                    value: [{ type: "Text", content: c.name, variant: "body2" }],
                },
                {
                    type: "DataListItem",
                    label: [{ type: "Text", content: "Sent", variant: "subtitle2" }],
                    value: [
                        { type: "Text", content: String((_j = c.sent) !== null && _j !== void 0 ? _j : 0), variant: "body2" },
                    ],
                },
                {
                    type: "DataListItem",
                    label: [{ type: "Text", content: "Views", variant: "subtitle2" }],
                    value: [
                        { type: "Text", content: String((_k = c.view) !== null && _k !== void 0 ? _k : 0), variant: "body2" },
                    ],
                },
            ],
        });
    }
    // If nothing to display, show a fallback message
    if (contentChildren.length === 0) {
        contentChildren.push({
            type: "Markdown",
            content: "No data available for this view.",
        });
    }
    // Wrap all content in a CardContent
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Assemble the VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=206.js.map