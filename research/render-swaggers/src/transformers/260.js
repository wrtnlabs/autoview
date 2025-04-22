export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    // Helper to map chat tag variants to chip colors
    const mapTagColor = (variant) => {
        switch (variant) {
            case 'red': return 'red';
            case 'orange': return 'orange';
            case 'yellow': return 'yellow';
            case 'olive': return 'lime';
            case 'green': return 'green';
            case 'cobalt': return 'indigo';
            case 'purple': return 'violet';
            case 'pink': return 'pink';
            case 'navy': return 'blue';
            default: return 'gray';
        }
    };
    // Build card header: show user avatar or fallback icon, name, and chat state
    const header = {
        type: 'CardHeader',
        title: (_b = (_a = input.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'Unknown User',
        description: (_d = (_c = input.userChat) === null || _c === void 0 ? void 0 : _c.state) !== null && _d !== void 0 ? _d : '',
        startElement: ((_e = input.user) === null || _e === void 0 ? void 0 : _e.avatarUrl)
            ? {
                type: 'Avatar',
                src: input.user.avatarUrl,
                name: input.user.name,
                size: 40,
            }
            : {
                // fallback avatar icon
                type: 'Icon',
                id: 'user',
                size: 32,
                color: 'gray',
            },
    };
    // Build card content: prefer markdown for readability
    const contentChildren = [];
    if (input.message) {
        // Use plain text if available, otherwise show empty string
        const text = (_f = input.message.plainText) !== null && _f !== void 0 ? _f : '';
        contentChildren.push({
            type: 'Markdown',
            content: text.length
                ? `**Message:**\n\n${text}`
                : '_No message content_',
        });
    }
    else if (input.oneTimeMsg) {
        // Visualize one-time message summary
        contentChildren.push({
            type: 'Markdown',
            content: `**One-Time Message:**\n\n${input.oneTimeMsg.name}`,
        });
    }
    else {
        // Fallback when there's no message
        contentChildren.push({
            type: 'Text',
            content: 'No messages to display.',
        });
    }
    const content = {
        type: 'CardContent',
        childrenProps: contentChildren,
    };
    // Build card footer: show online status icon and chat tags as chips
    const footerChildren = [];
    // Online indicator
    if (input.userOnline) {
        footerChildren.push({
            type: 'Icon',
            id: 'circle',
            color: 'green',
            size: 8,
        });
    }
    // Chat tags as chips
    if (Array.isArray(input.chatTags) && input.chatTags.length > 0) {
        input.chatTags.forEach((tag) => {
            footerChildren.push({
                type: 'Chip',
                label: tag.name,
                color: mapTagColor(tag.colorVariant),
                size: 'small',
                variant: 'outlined',
            });
        });
    }
    const footer = {
        type: 'CardFooter',
        childrenProps: footerChildren.length ? footerChildren : undefined,
    };
    // Compose the vertical card with header, content, and footer
    const card = {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=260.js.map