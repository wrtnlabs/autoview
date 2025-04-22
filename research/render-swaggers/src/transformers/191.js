export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Extract the message object, bail out if missing
    const msg = input.message;
    if (!msg) {
        return {
            type: 'Text',
            content: 'No message available',
            variant: 'body1',
        };
    }
    // ---------- Header ----------
    // Show who sent it (personId) or fallback to message ID, with timestamp
    const header = {
        type: 'CardHeader',
        title: msg.personId || msg.id || 'Message',
        description: msg.createdAt ? new Date(msg.createdAt).toLocaleString() : undefined,
        startElement: {
            type: 'Icon',
            id: 'comment',
            color: 'blue',
            size: 20,
        },
    };
    // ---------- Media Preview ----------
    // If the message has a linked webpage with an image, show it
    let media;
    if (msg.webPage && msg.webPage.imageUrl) {
        media = {
            type: 'CardMedia',
            src: msg.webPage.imageUrl,
        };
    }
    // ---------- Content ----------
    // Accumulate blocks, plain text, files, and buttons into card content
    const contentChildren = [];
    // 1) Render each block (text or code) as Markdown
    if (Array.isArray(msg.blocks)) {
        msg.blocks.forEach((block) => {
            if (!block.value)
                return;
            // Wrap code blocks in triple backticks with optional language
            const text = block.type === 'code'
                ? '' + (block.language || '') + '\n' + block.value + '\n```'
                : block.value;
            contentChildren.push({
                type: 'Markdown',
                content: text,
            });
        });
    }
    // 2) Fallback plainText as Markdown
    if (msg.plainText) {
        contentChildren.push({
            type: 'Markdown',
            content: msg.plainText,
        });
    }
    // 3) File attachments shown as outlined chips with file icon
    if (Array.isArray(msg.files) && msg.files.length > 0) {
        const fileChips = msg.files.map((file) => ({
            type: 'Chip',
            label: file.name,
            startElement: {
                type: 'Icon',
                id: 'file',
            },
            variant: 'outlined',
        }));
        contentChildren.push({
            type: 'ChipGroup',
            childrenProps: fileChips,
        });
    }
    // 4) Action buttons (e.g., call-to-action URLs)
    if (Array.isArray(msg.buttons) && msg.buttons.length > 0) {
        msg.buttons.forEach((btn) => {
            contentChildren.push({
                type: 'Button',
                label: btn.title,
                href: btn.url,
                variant: 'outlined',
                startElement: {
                    type: 'Icon',
                    id: 'link',
                },
            });
        });
    }
    const content = {
        type: 'CardContent',
        childrenProps: contentChildren,
    };
    // ---------- Footer ----------
    // Show reactions as simple chips (e.g., "smile 3")
    let footer;
    if (Array.isArray(msg.reactions) && msg.reactions.length > 0) {
        const reactionChips = msg.reactions.map((r) => ({
            type: 'Chip',
            label: r.emojiName + (r.personKeys ? ` ${r.personKeys.length}` : ''),
        }));
        footer = {
            type: 'CardFooter',
            childrenProps: {
                type: 'ChipGroup',
                childrenProps: reactionChips,
            },
        };
    }
    // ---------- Assemble Vertical Card ----------
    const children = [header];
    if (media)
        children.push(media);
    children.push(content);
    if (footer)
        children.push(footer);
    return {
        type: 'VerticalCard',
        childrenProps: children,
    };
}
//# sourceMappingURL=191.js.map