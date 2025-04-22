export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map compute_service values to color variants for Avatar and Chip components
    const serviceColorMap = {
        none: 'gray',
        actions: 'blue',
        codespaces: 'violet',
    };
    // Determine selected variant based on compute_service (fallback to 'none')
    const serviceKey = (_a = input.compute_service) !== null && _a !== void 0 ? _a : 'none';
    const serviceVariant = serviceColorMap[serviceKey] || serviceColorMap.none;
    // Avatar representing the configuration (initial letter fallback)
    const avatarProps = {
        type: 'Avatar',
        name: input.name,
        variant: serviceVariant,
        size: 40,
    };
    // Card header: show name and ID
    const header = {
        type: 'CardHeader',
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: avatarProps,
    };
    // Chip for compute_service
    const computeChip = {
        type: 'Chip',
        label: serviceKey,
        color: serviceVariant,
        variant: 'filled',
    };
    // Chip for number of network settings, with a network icon
    const settingsCount = (_c = (_b = input.network_settings_ids) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
    const settingsChip = {
        type: 'Chip',
        label: `${settingsCount} setting${settingsCount !== 1 ? 's' : ''}`,
        startElement: {
            type: 'Icon',
            id: 'network-wired',
            color: 'teal',
        },
        variant: 'outlined',
    };
    // Card content: group the two chips
    const content = {
        type: 'CardContent',
        childrenProps: {
            type: 'ChipGroup',
            childrenProps: [computeChip, settingsChip],
        },
    };
    // Format the created_on date into a human-readable string or fallback
    let createdOnText;
    if (input.created_on) {
        const date = new Date(input.created_on);
        // Use locale-aware formatting
        createdOnText = date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    }
    else {
        createdOnText = 'Unknown';
    }
    // Footer: render creation date using Markdown for emphasis
    const footer = {
        type: 'CardFooter',
        childrenProps: {
            type: 'Markdown',
            content: `**Created On:** ${createdOnText}`,
        },
    };
    // Compose the vertical card with header, content, and footer
    const card = {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=529.js.map