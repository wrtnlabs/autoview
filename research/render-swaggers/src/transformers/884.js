export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper: capitalize the first letter
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    // 1. Create a colored Chip to represent the state
    const stateLabel = capitalize(input.state);
    let stateColor = 'secondary';
    switch (input.state.toLowerCase()) {
        case 'success':
            stateColor = 'green';
            break;
        case 'failure':
        case 'error':
            stateColor = 'error';
            break;
        case 'pending':
            stateColor = 'yellow';
            break;
        default:
            stateColor = 'secondary';
    }
    const stateChip = {
        type: 'Chip',
        label: stateLabel,
        color: stateColor,
        variant: 'filled',
        size: 'small',
    };
    // 2. Prepare an avatar of the creator if available
    const creatorAvatar = input.creator
        ? {
            type: 'Avatar',
            src: input.creator.avatar_url,
            name: input.creator.login,
            variant: 'secondary',
            size: 32,
        }
        : undefined;
    // 3. Helper to produce a Text component
    const makeText = (content, variant = 'body2') => ({
        type: 'Text',
        content,
        variant,
    });
    // 4. Build a DataList of details: creator, timestamps, and target URL
    const details = [];
    if (input.creator) {
        details.push({
            type: 'DataListItem',
            label: makeText('Creator', 'subtitle2'),
            value: creatorAvatar,
        });
    }
    details.push({
        type: 'DataListItem',
        label: makeText('Created At', 'subtitle2'),
        value: makeText(new Date(input.created_at).toLocaleString()),
    });
    details.push({
        type: 'DataListItem',
        label: makeText('Updated At', 'subtitle2'),
        value: makeText(new Date(input.updated_at).toLocaleString()),
    });
    if (input.target_url) {
        details.push({
            type: 'DataListItem',
            label: makeText('Target URL', 'subtitle2'),
            value: {
                type: 'Button',
                label: 'View',
                href: input.target_url,
                variant: 'outlined',
                size: 'small',
            },
        });
    }
    const dataList = {
        type: 'DataList',
        childrenProps: details,
    };
    // 5. Compose CardHeader with state chip, context, optional description, and avatar
    const cardHeader = {
        type: 'CardHeader',
        startElement: stateChip,
        title: input.context,
        description: (_a = input.description) !== null && _a !== void 0 ? _a : undefined,
        endElement: creatorAvatar,
    };
    // 6. Wrap the DataList inside CardContent
    const cardContent = {
        type: 'CardContent',
        childrenProps: dataList,
    };
    // 7. Footer: link back to the GitHub status page
    const cardFooter = {
        type: 'CardFooter',
        childrenProps: {
            type: 'Button',
            label: 'Open on GitHub',
            href: input.url,
            variant: 'text',
            startElement: {
                type: 'Icon',
                id: 'github',
                size: 16,
            },
            size: 'small',
        },
    };
    // 8. Return a VerticalCard that stacks header, content, and footer
    return {
        type: 'VerticalCard',
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=884.js.map