export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare owner avatar or fallback icon if owner is null
    const ownerElement = input.owner
        ? {
            type: "Avatar",
            src: input.owner.avatar_url,
            name: input.owner.login,
            size: 40,
        }
        : {
            type: "Icon",
            id: "user-secret",
            size: 40,
            color: "gray",
        };
    // A chip to display the migration state
    const stateChip = {
        type: "Chip",
        label: input.state,
        color: "info",
        size: "small",
        variant: "filled",
    };
    // Build a summary DataList of key migration fields
    const summaryItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "GUID", variant: "subtitle3" },
            value: { type: "Text", content: input.guid, variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At", variant: "subtitle3" },
            value: {
                type: "Text",
                // Format date-time for readability
                content: new Date(input.created_at).toLocaleString(),
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At", variant: "subtitle3" },
            value: {
                type: "Text",
                content: new Date(input.updated_at).toLocaleString(),
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Repositories", variant: "subtitle3" },
            value: { type: "Text", content: `${input.repositories.length}`, variant: "body2" },
        },
    ];
    const summaryDataList = {
        type: "DataList",
        childrenProps: summaryItems,
    };
    // Build a DataList of repositories, each with a chip group for metrics
    const repoItems = input.repositories.map((repo) => {
        // Forks chip
        const forksChip = {
            type: "Chip",
            label: repo.forks.toString(),
            startElement: { type: "Icon", id: "code-branch", size: 16, color: "green" },
            size: "small",
            variant: "outlined",
            color: "green",
        };
        // Stars chip
        const starsChip = {
            type: "Chip",
            label: repo.stargazers_count.toString(),
            startElement: { type: "Icon", id: "star", size: 16, color: "yellow" },
            size: "small",
            variant: "outlined",
            color: "yellow",
        };
        // Watchers chip
        const watchersChip = {
            type: "Chip",
            label: repo.watchers_count.toString(),
            startElement: { type: "Icon", id: "eye", size: 16, color: "blue" },
            size: "small",
            variant: "outlined",
            color: "blue",
        };
        const metricsGroup = {
            type: "ChipGroup",
            childrenProps: [forksChip, starsChip, watchersChip],
            maxItems: 3,
        };
        return {
            type: "DataListItem",
            label: { type: "Text", content: repo.name, variant: "body1" },
            value: metricsGroup,
        };
    });
    const repoDataList = {
        type: "DataList",
        childrenProps: repoItems,
    };
    // Footer buttons: archive download and GitHub link
    const footerButtons = [];
    if (input.archive_url) {
        footerButtons.push({
            type: "Button",
            label: "Download Archive",
            href: input.archive_url,
            variant: "contained",
            color: "blue",
            size: "medium",
            startElement: { type: "Icon", id: "download", size: 20, color: "blue" },
        });
    }
    footerButtons.push({
        type: "Button",
        label: "View on GitHub",
        href: input.url,
        variant: "outlined",
        color: "teal",
        size: "medium",
        startElement: { type: "Icon", id: "github", size: 20, color: "gray" },
    });
    const footer = {
        type: "CardFooter",
        childrenProps: footerButtons,
    };
    // Assemble into a vertical card for a responsive, mobile‑friendly layout
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: `Migration #${input.id}`,
                description: `State: ${input.state}`,
                startElement: ownerElement,
                endElement: stateChip,
            },
            {
                type: "CardContent",
                childrenProps: [summaryDataList, repoDataList],
            },
            footer,
        ],
    };
}
//# sourceMappingURL=966.js.map