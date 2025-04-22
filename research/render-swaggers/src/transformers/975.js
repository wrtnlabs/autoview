export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no repository data, show a simple markdown notice
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No repositories available.",
        };
    }
    // Transform each repository into a DataListItem with visual badges and chips
    const items = input.map((repo) => {
        const valueComponents = [];
        // Show the primary language as a small outlined chip
        if (repo.language) {
            valueComponents.push({
                type: "Chip",
                label: repo.language,
                variant: "outlined",
                size: "small",
            });
        }
        // Show star count with a star icon badge
        valueComponents.push({
            type: "Badge",
            count: repo.stargazers_count,
            maxCount: 999,
            childrenProps: {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16,
            },
        });
        // Show fork count with a branch icon badge
        valueComponents.push({
            type: "Badge",
            count: repo.forks_count,
            maxCount: 999,
            childrenProps: {
                type: "Icon",
                id: "code-branch",
                color: "cyan",
                size: 16,
            },
        });
        // If a license is present, render it as a chip
        if (repo.license) {
            valueComponents.push({
                type: "Chip",
                label: repo.license.name,
                variant: "outlined",
                size: "small",
            });
        }
        return {
            // Use a DataListItem so that label/value columns align nicely even on small screens
            type: "DataListItem",
            // Render the repository full name as a subtitle text
            label: [
                {
                    type: "Text",
                    variant: "subtitle1",
                    content: repo.full_name,
                },
            ],
            // Place our chips and badges in the value column
            value: valueComponents,
        };
    });
    // Return the full DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=975.js.map