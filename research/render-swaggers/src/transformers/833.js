export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each commit into a ListItem with visual decorations
    const items = input.map(commit => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        // Safely extract author name and date
        const authorName = (_b = (_a = commit.commit.author) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'Unknown';
        const rawDate = (_c = commit.commit.author) === null || _c === void 0 ? void 0 : _c.date;
        const formattedDate = rawDate ? new Date(rawDate).toLocaleString() : '';
        // Safely extract stats, defaulting to zero
        const additions = (_e = (_d = commit.stats) === null || _d === void 0 ? void 0 : _d.additions) !== null && _e !== void 0 ? _e : 0;
        const deletions = (_g = (_f = commit.stats) === null || _f === void 0 ? void 0 : _f.deletions) !== null && _g !== void 0 ? _g : 0;
        const total = (_j = (_h = commit.stats) === null || _h === void 0 ? void 0 : _h.total) !== null && _j !== void 0 ? _j : 0;
        // Prepare end elements: additions, deletions, total and a view button
        const endElements = [
            {
                type: 'Chip',
                label: `+${additions}`,
                color: 'success',
                size: 'small',
                variant: 'filled',
            },
            {
                type: 'Chip',
                label: `-${deletions}`,
                color: 'error',
                size: 'small',
                variant: 'filled',
            },
            {
                type: 'Chip',
                label: `${total}`,
                color: 'info',
                size: 'small',
                variant: 'outlined',
            },
            {
                type: 'Button',
                label: 'View',
                href: commit.html_url,
                variant: 'text',
                size: 'small',
            },
        ];
        return {
            type: 'ListItem',
            // Use the first line of the commit message as the title
            title: commit.commit.message.split('\n')[0],
            // Display author name and date
            description: formattedDate
                ? `${authorName} • ${formattedDate}`
                : authorName,
            // A git-branch icon as the leading element
            startElement: {
                type: 'Icon',
                id: 'code-branch',
                color: 'blue',
                size: 24,
            },
            // Show stats and a button to view the commit
            endElement: endElements,
        };
    });
    // Wrap all items in a responsive list
    return {
        type: 'List',
        childrenProps: items,
    };
}
//# sourceMappingURL=833.js.map