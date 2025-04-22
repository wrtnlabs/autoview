export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Extract repository and owner info for header
    const repo = input.repository;
    // Card header with repository full name, description, and owner avatar
    const header = {
        type: "CardHeader",
        title: repo.full_name,
        description: (_a = repo.description) !== null && _a !== void 0 ? _a : "",
        startElement: {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            variant: "blue",
            size: 40,
        },
    };
    // Helper to map commit status state to an icon and color
    const mapStateToIcon = (state) => {
        switch (state) {
            case "success":
                return { id: "check-circle", color: "green" };
            case "failure":
            case "error":
                return { id: "times-circle", color: "red" };
            case "pending":
                return { id: "clock", color: "orange" };
            case "queued":
                return { id: "hourglass", color: "gray" };
            default:
                return { id: "question-circle", color: "gray" };
        }
    };
    // Build a DataListItem for each simple_commit_status
    const statusItems = input.statuses.map((status) => {
        var _a;
        const { id, color } = mapStateToIcon(status.state);
        return {
            type: "DataListItem",
            startElement: {
                type: "Icon",
                id,
                color,
                size: 20,
            },
            label: [
                {
                    type: "Text",
                    content: status.context,
                    variant: "body1",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: (_a = status.description) !== null && _a !== void 0 ? _a : "",
                    variant: "body2",
                    color: "secondary",
                },
            ],
        };
    });
    // DataList of commit statuses
    const statusesList = {
        type: "DataList",
        childrenProps: statusItems,
    };
    // Card content including summary information and the statuses list
    const content = {
        type: "CardContent",
        childrenProps: [
            // Short SHA and total count as inline text
            {
                type: "Text",
                content: [
                    "Commit SHA: ",
                    input.sha.slice(0, 7),
                ],
                variant: "body2",
                color: "tertiary",
            },
            {
                type: "Text",
                content: [
                    "Total statuses: ",
                    String(input.total_count),
                ],
                variant: "body2",
                color: "tertiary",
            },
            // Markdown link to the full commit URL
            {
                type: "Markdown",
                content: `[View commit details](${input.commit_url})`,
            },
            // The list of individual status items
            statusesList,
        ],
    };
    // Card footer with a button linking back to the repository page
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                label: ["Open Repository"],
                variant: "outlined",
                size: "small",
                color: "primary",
                href: repo.html_url,
            },
        ],
    };
    // Assemble everything into a vertical card for responsive, stacked layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=708.js.map