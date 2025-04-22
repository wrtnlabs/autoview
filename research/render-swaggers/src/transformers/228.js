export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    const channel = input.channel;
    // Fallback if no channel data is provided
    if (!channel) {
        return {
            type: "Text",
            content: "No channel data available",
            variant: "body1",
        };
    }
    // Helper to convert message blocks to a markdown string
    function blocksToMarkdown(blocks) {
        if (!blocks || blocks.length === 0)
            return "";
        return blocks
            .map((blk) => {
            var _a, _b, _c, _d, _e;
            switch (blk.type) {
                case "text":
                    return (_a = blk.value) !== null && _a !== void 0 ? _a : "";
                case "code":
                    // wrap code block with language if provided
                    return "" + ((_b = blk.language) !== null && _b !== void 0 ? _b : "") + "\n" + ((_c = blk.value) !== null && _c !== void 0 ? _c : "") + "\n```";
                case "bullets":
                    // flatten nested bullets if any
                    if (blk.blocks && blk.blocks.length > 0) {
                        return blk.blocks.map((b) => { var _a; return "- " + ((_a = b.value) !== null && _a !== void 0 ? _a : ""); }).join("\n");
                    }
                    return "- " + ((_d = blk.value) !== null && _d !== void 0 ? _d : "");
                default:
                    return (_e = blk.value) !== null && _e !== void 0 ? _e : "";
            }
        })
            .join("\n\n");
    }
    // Map channel.state to chip color
    const stateColorMap = {
        waiting: "orange",
        active: "green",
        restricted: "red",
        preIndebted: "warning",
        indebted: "error",
        banned: "darkGray",
        removed: "gray",
    };
    // Build CardHeader
    const header = {
        type: "CardHeader",
        title: channel.name,
        description: channel.description,
        startElement: channel.avatarUrl
            ? {
                type: "Avatar",
                src: channel.avatarUrl,
                name: channel.name,
                size: 40,
            }
            : undefined,
    };
    // Prepare CardContent children
    const contentChildren = [];
    // Show cover image if available
    if (channel.coverImageUrl) {
        contentChildren.push({
            type: "Image",
            src: channel.coverImageUrl,
            alt: channel.name,
        });
    }
    // Show welcome message as markdown
    const welcomeMd = blocksToMarkdown((_a = channel.welcomeMessage) === null || _a === void 0 ? void 0 : _a.blocks);
    if (welcomeMd) {
        contentChildren.push({
            type: "Markdown",
            content: welcomeMd,
        });
    }
    // Build a list of key/value pairs for channel metadata
    const dataItems = [];
    // Utility to push a DataListItem
    function pushItem(labelText, valueComp) {
        dataItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: labelText, variant: "subtitle2" }],
            value: valueComp,
        });
    }
    if (channel.state) {
        pushItem("State", {
            type: "Chip",
            label: channel.state,
            color: stateColorMap[channel.state] || "gray",
            variant: "outlined",
        });
    }
    if (channel.bizGrade) {
        pushItem("Business Grade", {
            type: "Chip",
            label: channel.bizGrade,
            color: "primary",
            variant: "filled",
        });
    }
    if (channel.country) {
        pushItem("Country", {
            type: "Text",
            content: channel.country,
            variant: "body2",
        });
    }
    if (channel.domain) {
        pushItem("Domain", {
            type: "Text",
            content: channel.domain,
            variant: "body2",
        });
    }
    if (channel.phoneNumber) {
        pushItem("Phone", {
            type: "Text",
            content: channel.phoneNumber,
            variant: "body2",
        });
    }
    if (channel.timeZone) {
        pushItem("Time Zone", {
            type: "Chip",
            label: channel.timeZone,
            color: "secondary",
            variant: "outlined",
        });
    }
    // Assemble DataList with the metadata
    if (dataItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: dataItems,
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Build CardFooter with manager info if present
    let footer;
    if (input.manager) {
        const mgr = input.manager;
        const badgeCount = (_c = (_b = input.managerBadge) === null || _b === void 0 ? void 0 : _b.unread) !== null && _c !== void 0 ? _c : 0;
        // Avatar wrapped in a badge showing unread count
        const avatarWithBadge = {
            type: "Badge",
            count: badgeCount,
            showZero: false,
            childrenProps: {
                type: "Avatar",
                src: mgr.avatarUrl,
                name: mgr.name,
                size: 40,
            },
        };
        // Manager name
        const nameText = {
            type: "Text",
            content: mgr.name,
            variant: "body1",
        };
        footer = {
            type: "CardFooter",
            childrenProps: [avatarWithBadge, nameText],
        };
    }
    // Compose the vertical card
    const childrenProps = [
        header,
        content,
    ];
    if (footer) {
        childrenProps.push(footer);
    }
    return {
        type: "VerticalCard",
        childrenProps,
    };
}
//# sourceMappingURL=228.js.map