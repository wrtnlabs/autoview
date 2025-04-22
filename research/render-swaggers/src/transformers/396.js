export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map runner statuses to chip colors for quick visual cues
    const statusColorMap = {
        Ready: 'success',
        Provisioning: 'warning',
        Shutdown: 'gray',
        Deleting: 'error',
        Stuck: 'pink',
    };
    // For each runner, build a small card with header and detailed content
    const cards = input.runners.map(runner => {
        var _a, _b;
        // Format the last active timestamp or fall back to a placeholder
        const lastActive = runner.last_active_on
            ? new Date(runner.last_active_on).toLocaleString()
            : 'Never active';
        // Status chip
        const statusChip = {
            type: 'Chip',
            label: runner.status,
            color: statusColorMap[runner.status] || 'gray',
            size: 'small',
        };
        // Platform chip with an icon inferred from the platform string
        const platformLower = runner.platform.toLowerCase();
        const platformIconId = platformLower.includes('win') ? 'windows' :
            platformLower.includes('linux') ? 'linux' :
                'desktop';
        const platformChip = {
            type: 'Chip',
            label: runner.platform,
            size: 'small',
            startElement: {
                type: 'Icon',
                id: platformIconId,
                size: 16,
            },
        };
        // Resource chips: CPU, RAM, and Storage
        const cpuChip = {
            type: 'Chip',
            label: `${runner.machine_size_details.cpu_cores} CPU`,
            size: 'small',
            startElement: {
                type: 'Icon',
                id: 'microchip',
                size: 16,
            },
        };
        const memoryChip = {
            type: 'Chip',
            label: `${runner.machine_size_details.memory_gb} GB RAM`,
            size: 'small',
            startElement: {
                type: 'Icon',
                id: 'memory',
                size: 16,
            },
        };
        const storageChip = {
            type: 'Chip',
            label: `${runner.machine_size_details.storage_gb} GB SSD`,
            size: 'small',
            startElement: {
                type: 'Icon',
                id: 'hdd',
                size: 16,
            },
        };
        // Badge to show how many public IPs are available (omit if zero)
        const ipCount = (_b = (_a = runner.public_ips) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        const ipBadge = {
            type: 'Badge',
            childrenProps: {
                type: 'Icon',
                id: 'globe',
                size: 16,
            },
            count: ipCount,
            showZero: false,
            color: 'info',
        };
        // Markdown to render the last active timestamp, which handles wrapping nicely on mobile
        const lastActiveMd = {
            type: 'Markdown',
            content: `**Last Active:** ${lastActive}`,
        };
        return {
            type: 'VerticalCard',
            childrenProps: [
                {
                    // Header with runner name and ID, plus a server icon
                    type: 'CardHeader',
                    title: runner.name,
                    description: `ID: ${runner.id}`,
                    startElement: {
                        type: 'Icon',
                        id: 'server',
                        color: 'blue',
                        size: 24,
                    },
                },
                {
                    // Body content: status/platform chips, resource specs, public IP badge, last active info
                    type: 'CardContent',
                    childrenProps: [
                        {
                            type: 'ChipGroup',
                            childrenProps: [statusChip, platformChip],
                        },
                        {
                            type: 'ChipGroup',
                            childrenProps: [cpuChip, memoryChip, storageChip],
                        },
                        ipBadge,
                        lastActiveMd,
                    ],
                },
            ],
        };
    });
    // Wrap all runner cards into a swipeable carousel for mobile-friendly navigation
    const carousel = {
        type: 'Carousel',
        autoPlay: false,
        infinite: true,
        effect: 'slide',
        navControls: true,
        indicators: true,
        childrenProps: cards,
    };
    return carousel;
}
//# sourceMappingURL=396.js.map