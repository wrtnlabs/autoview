export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    const campaign = input.campaign;
    // If there's no campaign data, show a simple text notice
    if (!campaign) {
        return {
            type: "Text",
            content: "No campaign data available.",
            variant: "body1",
        };
    }
    // Map sendMedium to a FontAwesome icon name
    const mediumIconMap = {
        email: "envelope",
        appAlimtalk: "comment",
        appLine: "comment-dots",
        inAppChat: "comments",
        xms: "sms",
    };
    const mediumIcon = mediumIconMap[campaign.sendMedium] || "bell";
    // Map campaign state to a color for the Chip
    const stateColorMap = {
        draft: "gray",
        active: "success",
        stopped: "warning",
        removed: "error",
    };
    const stateColor = (_b = stateColorMap[(_a = campaign.state) !== null && _a !== void 0 ? _a : ""]) !== null && _b !== void 0 ? _b : "gray";
    // Build the CardHeader: name + trigger event, with icons and state chip
    const header = {
        type: "CardHeader",
        title: campaign.name,
        description: campaign.triggerEventName,
        startElement: {
            type: "Icon",
            id: mediumIcon,
            size: 24,
            color: "blue",
        },
        endElement: {
            type: "Chip",
            label: (_c = campaign.state) !== null && _c !== void 0 ? _c : "unknown",
            variant: "filled",
            color: stateColor,
        },
    };
    // Helper to collect key/value pairs into DataListItems
    const details = [];
    function addDetail(label, value) {
        details.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: label,
                    variant: "subtitle2",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: value,
                    variant: "body2",
                },
            ],
        });
    }
    // Core campaign details
    addDetail("Send Medium", campaign.sendMedium);
    addDetail("Waiting Time", campaign.waitingTime);
    if (campaign.startAt !== undefined) {
        addDetail("Start At", new Date(campaign.startAt).toLocaleString());
    }
    if (campaign.endAt !== undefined) {
        addDetail("End At", new Date(campaign.endAt).toLocaleString());
    }
    if (campaign.filterEventName) {
        addDetail("Filter Event", campaign.filterEventName);
    }
    if (campaign.goalEventName) {
        addDetail("Goal Event", campaign.goalEventName);
    }
    // Aggregate stats if present
    if (campaign.sent !== undefined) {
        addDetail("Sent", campaign.sent.toString());
    }
    if (campaign.view !== undefined) {
        addDetail("Viewed", campaign.view.toString());
    }
    if (campaign.click !== undefined) {
        addDetail("Clicked", campaign.click.toString());
    }
    // CardContent with a DataList of campaign properties
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: details,
        },
    };
    // Footer: list out each message with its own stats
    const msgs = (_d = input.msgs) !== null && _d !== void 0 ? _d : [];
    let footerChildren;
    if (msgs.length > 0) {
        const msgItems = msgs.map((msg) => {
            var _a, _b, _c;
            const stats = `Sent: ${(_a = msg.sent) !== null && _a !== void 0 ? _a : 0}, View: ${(_b = msg.view) !== null && _b !== void 0 ? _b : 0}, Click: ${(_c = msg.click) !== null && _c !== void 0 ? _c : 0}`;
            return {
                type: "DataListItem",
                label: [
                    {
                        type: "Text",
                        content: msg.name,
                        variant: "body1",
                    },
                ],
                value: [
                    {
                        type: "Text",
                        content: stats,
                        variant: "body2",
                    },
                ],
            };
        });
        footerChildren = {
            type: "DataList",
            childrenProps: msgItems,
        };
    }
    else {
        footerChildren = {
            type: "Text",
            content: "No messages associated with this campaign.",
            variant: "body2",
        };
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Wrap everything in a VerticalCard for a responsive, stacked layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=226.js.map