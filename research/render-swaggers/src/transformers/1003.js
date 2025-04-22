export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no projects, show a simple markdown message.
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "*No projects to display.*",
        };
    }
    // Helper: format ISO date string into a user‐friendly date.
    const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    // Map each project into a VerticalCard component.
    const cards = input.map((project) => {
        // CardHeader: show project title, state, and owner's avatar if available.
        const header = {
            type: "CardHeader",
            title: project.name,
            description: project.state === "open" ? "Open" : "Closed",
            // Only include avatar if creator is not null
            startElement: project.creator !== null && project.creator !== undefined
                ? {
                    type: "Avatar",
                    src: project.creator.avatar_url,
                    name: project.creator.login,
                    // fixed size for consistency
                    size: 32,
                }
                : undefined,
        };
        // Build a list of key‐value pairs about the project.
        const dataListItems = [
            {
                type: "DataListItem",
                label: [
                    {
                        type: "Text",
                        content: "ID",
                        variant: "body2",
                        color: "secondary",
                    },
                ],
                value: [
                    {
                        type: "Text",
                        content: project.id.toString(),
                        variant: "body2",
                    },
                ],
            },
            {
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Number", variant: "body2", color: "secondary" },
                ],
                value: [
                    { type: "Text", content: project.number.toString(), variant: "body2" },
                ],
            },
            {
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Created", variant: "body2", color: "secondary" },
                ],
                value: [
                    {
                        type: "Text",
                        content: formatDate(project.created_at),
                        variant: "body2",
                    },
                ],
            },
            {
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Updated", variant: "body2", color: "secondary" },
                ],
                value: [
                    {
                        type: "Text",
                        content: formatDate(project.updated_at),
                        variant: "body2",
                    },
                ],
            },
        ];
        // Optionally include the project body as markdown, if present.
        const contentChildren = [];
        if (project.body) {
            contentChildren.push({
                type: "Markdown",
                content: project.body,
            });
        }
        // Insert the DataList of raw fields.
        contentChildren.push({
            type: "DataList",
            childrenProps: dataListItems,
        });
        // Footer: a button to view the project on GitHub.
        const footer = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                variant: "contained",
                color: "primary",
                size: "medium",
                href: project.html_url,
                startElement: {
                    type: "Icon",
                    id: "github",
                    color: "gray",
                    size: 16,
                },
                label: "View on GitHub",
            },
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, { type: "CardContent", childrenProps: contentChildren }, footer],
        };
    });
    // Compose all cards into a responsive carousel.
    return {
        type: "Carousel",
        autoPlay: false,
        infinite: false,
        gutter: 16,
        navControls: true,
        indicators: true,
        childrenProps: cards,
    };
}
//# sourceMappingURL=1003.js.map