export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Extract repository list from the input
    const repos = Array.isArray(input.repositories) ? input.repositories : [];
    // If there are no repositories, show a friendly markdown message
    if (repos.length === 0) {
        return {
            type: "Markdown",
            content: "_No repositories available for this installation._",
        };
    }
    // Map each repository to a DataListItemProps for visualization
    const childrenProps = repos.map((repo) => {
        // Construct a clickable repository name using markdown link syntax
        const repoLinkMarkdown = `### [${repo.full_name}](${repo.html_url})`;
        // Prepare statistic chips for stars, forks, and open issues
        const statChips = [
            {
                type: "Chip",
                label: repo.stargazers_count.toString(),
                startElement: { type: "Icon", id: "star", color: "yellow", size: 16 },
                color: "yellow",
                variant: "outlined",
                size: "small",
            },
            {
                type: "Chip",
                label: repo.forks_count.toString(),
                startElement: { type: "Icon", id: "code-branch", color: "blue", size: 16 },
                color: "blue",
                variant: "outlined",
                size: "small",
            },
            {
                type: "Chip",
                label: repo.open_issues_count.toString(),
                startElement: { type: "Icon", id: "exclamation-circle", color: "red", size: 16 },
                color: "red",
                variant: "outlined",
                size: "small",
            },
        ];
        // Group the chips horizontally
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: statChips,
        };
        // Build the DataListItemProps
        const item = {
            type: "DataListItem",
            // Use markdown to render the repository link prominently
            label: { type: "Markdown", content: repoLinkMarkdown },
            // Display the stats as a ChipGroup
            value: chipGroup,
        };
        return item;
    });
    // Return a data list containing all repository items
    const dataList = {
        type: "DataList",
        childrenProps,
    };
    return dataList;
}
//# sourceMappingURL=953.js.map