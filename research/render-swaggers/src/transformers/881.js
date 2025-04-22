export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle empty or undefined input gracefully
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No contributor activity data available."
        };
    }
    // Transform each contributor's data into a DataListItemProps
    const items = input.map(contributor => {
        var _a;
        const author = contributor.author;
        // Sum up additions and deletions across all weeks
        const additions = contributor.weeks.reduce((sum, week) => { var _a; return sum + ((_a = week.a) !== null && _a !== void 0 ? _a : 0); }, 0);
        const deletions = contributor.weeks.reduce((sum, week) => { var _a; return sum + ((_a = week.d) !== null && _a !== void 0 ? _a : 0); }, 0);
        const commits = contributor.total;
        // Build the label: an avatar/icon plus the user's display name
        const label = [];
        if (author) {
            label.push({
                type: "Avatar",
                src: author.avatar_url,
                name: author.login,
                size: 32
            });
            label.push({
                type: "Text",
                content: (_a = author.name) !== null && _a !== void 0 ? _a : author.login,
                variant: "body1",
                color: "primary"
            });
        }
        else {
            // Fallback for null author
            label.push({
                type: "Icon",
                id: "user-secret",
                color: "gray",
                size: 32
            });
            label.push({
                type: "Text",
                content: "Unknown Contributor",
                variant: "body1",
                color: "gray"
            });
        }
        // Build a group of chips for commits, additions, and deletions
        const chips = [
            {
                type: "Chip",
                label: `${commits} commits`,
                variant: "outlined",
                color: "blue",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "code-branch",
                    color: "blue",
                    size: 12
                }
            },
            {
                type: "Chip",
                label: `+${additions}`,
                variant: "outlined",
                color: "green",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "plus",
                    color: "green",
                    size: 12
                }
            },
            {
                type: "Chip",
                label: `-${deletions}`,
                variant: "outlined",
                color: "red",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "minus",
                    color: "red",
                    size: 12
                }
            }
        ];
        return {
            type: "DataListItem",
            label,
            // Wrap chips in a ChipGroup for a clean, responsive layout
            value: {
                type: "ChipGroup",
                childrenProps: chips,
                maxItems: chips.length
            }
        };
    });
    // Compose the final DataList component
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=881.js.map