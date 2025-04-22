export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no repositories, show a simple markdown message.
    if (!input.repositories || input.repositories.length === 0) {
        return {
            type: "Markdown",
            content: "**No repositories found.**",
        };
    }
    // Build a DataListItem for each repository.
    const items = input.repositories.map(repo => {
        // Compose the label: owner's avatar + clickable repo name + optional description.
        const labelComponents = [];
        // Owner avatar
        labelComponents.push({
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 32,
            variant: "primary",
        });
        // Repo full name as a markdown link
        labelComponents.push({
            type: "Markdown",
            content: `**[${repo.full_name}](${repo.html_url})**`,
        });
        // Optional description text
        if (repo.description) {
            labelComponents.push({
                type: "Text",
                content: repo.description,
                variant: "body2",
                color: "gray",
            });
        }
        // Prepare chips for stargazers, forks, and open issues
        const chipChildren = [];
        if (typeof repo.stargazers_count === "number") {
            chipChildren.push({
                type: "Chip",
                label: repo.stargazers_count.toString(),
                startElement: {
                    type: "Icon",
                    id: "star",
                    color: "yellow",
                    size: 12,
                },
                color: "yellow",
                size: "small",
                variant: "outlined",
            });
        }
        if (typeof repo.forks_count === "number") {
            chipChildren.push({
                type: "Chip",
                label: repo.forks_count.toString(),
                startElement: {
                    type: "Icon",
                    id: "code-branch",
                    color: "cyan",
                    size: 12,
                },
                color: "cyan",
                size: "small",
                variant: "outlined",
            });
        }
        if (typeof repo.open_issues_count === "number") {
            chipChildren.push({
                type: "Chip",
                label: repo.open_issues_count.toString(),
                startElement: {
                    type: "Icon",
                    id: "exclamation-circle",
                    color: "red",
                    size: 12,
                },
                color: "error",
                size: "small",
                variant: "outlined",
            });
        }
        // Group chips into a ChipGroup
        const statsGroup = {
            type: "ChipGroup",
            childrenProps: chipChildren,
        };
        // Return the DataListItem, using the labelComponents and statsGroup as the value.
        return {
            type: "DataListItem",
            label: labelComponents,
            value: statsGroup,
        };
    });
    // Wrap all items into a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Compose a card with a header and the data list as its content
    const header = {
        type: "CardHeader",
        title: "Repositories",
        description: `Total: ${input.total_count}`,
        startElement: {
            type: "Icon",
            id: "folder",
            color: "blue",
            size: 24,
        },
    };
    const content = {
        type: "CardContent",
        // The dataList itself is a valid presentation component
        childrenProps: dataList,
    };
    // Return a vertical card containing the header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=437.js.map