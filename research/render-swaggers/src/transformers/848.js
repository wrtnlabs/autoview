export function transform($input) {
    return visualizeData($input);
}
/**
 * Transforms a GitHub release asset into a visual AutoView component.
 * Uses a vertical card with header (asset name + uploader avatar),
 * markdown content (detailed properties + download link),
 * and footer chips (state & download count).
 */
function visualizeData(input) {
    // Helper: format bytes into human-readable form
    function humanReadableSize(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let idx = 0;
        let size = bytes;
        while (size >= 1024 && idx < units.length - 1) {
            size /= 1024;
            idx++;
        }
        // Keep one decimal if under MB, otherwise integer
        const formatted = idx < 2 ? size.toFixed(1) : Math.round(size).toString();
        return `${formatted} ${units[idx]}`;
    }
    // Map asset state to chip color
    const stateColorMap = {
        uploaded: 'success',
        open: 'warning',
    };
    // Build the card header: asset name, optional label/state, optional uploader avatar
    const header = Object.assign({ type: 'CardHeader', title: input.name, 
        // Show label if present, else fallback to state only
        description: input.label
            ? `${input.label} (${input.state})`
            : `State: ${input.state}` }, (input.uploader
        ? {
            startElement: {
                type: 'Avatar',
                src: input.uploader.avatar_url,
                name: input.uploader.login,
                variant: 'primary',
                size: 40,
            },
        }
        : {}));
    // Compose markdown details for the card content
    const markdownLines = [
        `**Asset ID:** ${input.id}`,
        `**Content-Type:** ${input.content_type}`,
        `**Size:** ${humanReadableSize(input.size)}`,
        `**Created:** ${new Date(input.created_at).toLocaleString()}`,
        `**Updated:** ${new Date(input.updated_at).toLocaleString()}`,
        '',
        // Provide a direct download link
        `[Download Asset](${input.browser_download_url})`,
    ];
    const content = {
        type: 'CardContent',
        childrenProps: {
            type: 'Markdown',
            content: markdownLines.join('\n'),
        },
    };
    // Footer chips: one for asset state, one for download count
    const stateChip = {
        type: 'Chip',
        label: input.state,
        color: stateColorMap[input.state] || 'gray',
        variant: 'filled',
        size: 'small',
    };
    const downloadChip = {
        type: 'Chip',
        label: input.download_count.toString(),
        startElement: {
            type: 'Icon',
            id: 'download',
            color: 'blue',
            size: 16,
        },
        variant: 'outlined',
        size: 'small',
    };
    const footer = {
        type: 'CardFooter',
        childrenProps: [stateChip, downloadChip],
    };
    // Return a responsive vertical card combining header, content, and footer
    return {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=848.js.map