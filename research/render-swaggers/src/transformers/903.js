export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure total count and list of repository items
    const { total_count, items } = input;
    // Create a list subheader displaying the total number of repositories
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            // Use markdown-like bold text to highlight the total count
            content: `**Total Repositories:** ${total_count}`
        }
    };
    // Helper to create an icon chip for a numeric metric
    function makeMetricChip(iconId, label, color) {
        return {
            type: "Chip",
            variant: "outlined",
            size: "small",
            color: color,
            label: label,
            startElement: {
                type: "Icon",
                id: iconId,
                color: color,
                size: 16
            }
        };
    }
    // Transform each repository into a ListItemProps
    const listItems = items.map((repo) => {
        const owner = repo.owner;
        // Prepare the avatar for the repository owner, if available
        const avatar = owner
            ? {
                type: "Avatar",
                src: owner.avatar_url,
                name: owner.login,
                variant: "info",
                size: 40
            }
            : undefined;
        // Collect metric chips: stars, forks, issues, watchers, language
        const metricChips = [];
        // Stargazers
        metricChips.push(makeMetricChip("star", repo.stargazers_count.toString(), "yellow"));
        // Forks
        metricChips.push(makeMetricChip("code-branch", repo.forks_count.toString(), "gray"));
        // Open issues
        metricChips.push(makeMetricChip("exclamation-circle", repo.open_issues_count.toString(), "red"));
        // Watchers
        metricChips.push(makeMetricChip("eye", repo.watchers_count.toString(), "blue"));
        // Language (if present)
        if (repo.language) {
            metricChips.push({
                type: "Chip",
                label: repo.language,
                variant: "filled",
                size: "small",
                color: "primary"
            });
        }
        // Optionally collapse extra chips to avoid overflow on small screens
        const MAX_CHIPS = 5;
        let endElements;
        if (metricChips.length > MAX_CHIPS) {
            // Show first MAX_CHIPS-1 and a "+X" chip
            const visible = metricChips.slice(0, MAX_CHIPS - 1);
            visible.push({
                type: "Chip",
                label: `+${metricChips.length - (MAX_CHIPS - 1)}`,
                variant: "outlined",
                size: "small",
                color: "gray"
            });
            endElements = visible;
        }
        else {
            endElements = metricChips;
        }
        return {
            type: "ListItem",
            title: repo.full_name,
            description: repo.description || undefined,
            startElement: avatar,
            endElement: endElements,
            href: repo.html_url
        };
    });
    // Compose the final List component
    const listProps = {
        type: "List",
        childrenProps: [
            subheader,
            // Spread each item into the childrenProps
            ...listItems
        ]
    };
    return listProps;
}
//# sourceMappingURL=903.js.map