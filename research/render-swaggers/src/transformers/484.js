export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Header: show migration title, state, and owner avatar
    const header = {
        type: "CardHeader",
        title: `Migration #${input.id}`,
        description: `State: ${input.state}`,
        startElement: input.owner
            ? {
                type: "Avatar",
                src: input.owner.avatar_url,
                name: input.owner.login,
                variant: "blue",
                size: 40,
            }
            : undefined,
        // show a lock/unlock badge for repository locking status
        endElement: {
            type: "Badge",
            color: input.lock_repositories ? "error" : "success",
            count: input.lock_repositories ? 1 : 0,
            showZero: !input.lock_repositories,
            childrenProps: {
                type: "Icon",
                id: input.lock_repositories ? "lock" : "lock-open",
                color: input.lock_repositories ? "red" : "green",
                size: 16,
            },
        },
    };
    // Build a DataList for core migration metadata
    const detailItems = [
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "GUID" }],
            value: [{ type: "Text", content: input.guid }],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Created At" }],
            value: [{ type: "Text", content: input.created_at }],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Updated At" }],
            value: [{ type: "Text", content: input.updated_at }],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "URL" }],
            value: [
                {
                    type: "Button",
                    label: ["Open Link"],
                    href: input.url,
                    variant: "text",
                    color: "primary",
                    size: "small",
                },
            ],
        },
    ];
    // Collect exclusion flags to display as Chips
    const exclusions = [
        input.exclude_metadata && "Metadata",
        input.exclude_git_data && "Git Data",
        input.exclude_attachments && "Attachments",
        input.exclude_releases && "Releases",
        input.exclude_owner_projects && "Owner Projects",
        input.org_metadata_only && "Org Metadata Only",
    ].filter(Boolean);
    if (exclusions.length) {
        detailItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Exclusions" }],
            value: [
                {
                    type: "ChipGroup",
                    childrenProps: exclusions.map((name) => ({
                        type: "Chip",
                        label: name,
                        variant: "outlined",
                        size: "small",
                    })),
                },
            ],
        });
    }
    const detailsList = {
        type: "DataList",
        childrenProps: detailItems,
    };
    // Build a repository list; if empty, show a markdown notice
    let repoSection;
    if (input.repositories && input.repositories.length > 0) {
        const repoItems = input.repositories.map((repo) => ({
            type: "ListItem",
            title: repo.name,
            href: repo.html_url,
            startElement: {
                type: "Icon",
                id: "github",
                color: "gray",
                size: 20,
            },
            endElement: [
                {
                    type: "Badge",
                    count: repo.stargazers_count,
                    maxCount: 9999,
                    childrenProps: {
                        type: "Icon",
                        id: "star",
                        color: "yellow",
                        size: 12,
                    },
                },
            ],
        }));
        repoSection = {
            type: "List",
            childrenProps: repoItems,
        };
    }
    else {
        repoSection = {
            type: "Markdown",
            content: "## Repositories\n\n_No repositories included in this migration._",
        };
    }
    // Footer: action button to view migration on GitHub
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: ["View Migration"],
            href: input.url,
            variant: "contained",
            color: "primary",
        },
    };
    // Compose the VerticalCard for overall layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, { type: "CardContent", childrenProps: [detailsList] }, footer],
    };
    // If repositories exist, insert the repo section after details
    if (input.repositories && input.repositories.length > 0) {
        card.childrenProps.splice(2, 0, { type: "CardContent", childrenProps: [{ type: "Markdown", content: "## Repositories" }] }, { type: "CardContent", childrenProps: [repoSection] });
    }
    return card;
}
//# sourceMappingURL=484.js.map