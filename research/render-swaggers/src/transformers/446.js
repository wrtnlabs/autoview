export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no repositories, show a friendly markdown message.
    if (!input.repositories || input.repositories.length === 0) {
        return {
            type: "Markdown",
            content: "### No repositories found\n\n_No repositories available to display._",
        };
    }
    // Transform each repository into a DataListItemProps
    const items = input.repositories.map((repo) => {
        // Avatar for the repository owner
        const ownerAvatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 32,
            variant: "primary",
        };
        // Text showing repository full name, with fallback to name if full_name is empty
        const repoText = {
            type: "Text",
            variant: "body1",
            content: repo.full_name,
            color: "primary",
        };
        // A button linking to the repository page
        const viewButton = {
            type: "Button",
            label: ["View"],
            variant: "outlined",
            size: "small",
            color: "blue",
            startElement: {
                type: "Icon",
                id: "arrow-right",
                color: "blue",
                size: 16,
            },
            href: repo.html_url,
        };
        return {
            type: "DataListItem",
            // The label column consists of the owner's avatar and the repository name
            label: [ownerAvatar, repoText],
            // The value column is a button to view the repository
            value: viewButton,
        };
    });
    // Compose the DataListProps for all repository items
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Card header displaying the total count
    const header = {
        type: "CardHeader",
        title: "Repositories",
        description: `${input.total_count} total`,
        // Use a generic icon for the header
        endElement: {
            type: "Icon",
            id: "database",
            color: "teal",
            size: 24,
        },
    };
    // Card content containing the list of repositories
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Wrap everything in a vertical card for responsive display
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=446.js.map