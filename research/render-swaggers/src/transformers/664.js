export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Destructure input for easier access
    const { repository, preferences: { auto_trigger_checks = [] }, } = input;
    // Build the CardHeader with repository avatar, name, and description
    const cardHeader = {
        type: "CardHeader",
        // Repository full name as title
        title: repository.full_name,
        // Use description if available, else empty string
        description: (_a = repository.description) !== null && _a !== void 0 ? _a : "",
        // Show owner's avatar and login name
        startElement: {
            type: "Avatar",
            src: repository.owner.avatar_url,
            name: repository.owner.login,
            variant: "gray",
            size: 40,
        },
    };
    // Build the list of auto_trigger_checks as a DataList or a Markdown fallback
    const checksComponent = auto_trigger_checks.length > 0
        ? {
            type: "DataList",
            childrenProps: auto_trigger_checks.map((check) => ({
                type: "DataListItem",
                // Label shows "App ID: <id>"
                label: [
                    {
                        type: "Text",
                        content: [`App ID: ${check.app_id}`],
                        variant: "body2",
                    },
                ],
                // Value is a toggle icon indicating the setting
                value: {
                    type: "Icon",
                    id: check.setting ? "toggle-on" : "toggle-off",
                    color: check.setting ? "green" : "gray",
                    size: 20,
                },
            })),
        }
        : {
            // Fallback markdown when there are no checks configured
            type: "Markdown",
            content: "### No auto-trigger checks configured",
        };
    // Wrap the checks in a CardContent
    const cardContent = {
        type: "CardContent",
        childrenProps: checksComponent,
    };
    // Build summary chips for stars, forks, and watchers
    const statsChips = [];
    if (typeof repository.stargazers_count === "number") {
        statsChips.push({
            type: "Chip",
            label: `${repository.stargazers_count}`,
            startElement: { type: "Icon", id: "star", color: "yellow", size: 16 },
            color: "yellow",
            variant: "outlined",
            size: "small",
        });
    }
    if (typeof repository.forks_count === "number") {
        statsChips.push({
            type: "Chip",
            label: `${repository.forks_count}`,
            startElement: { type: "Icon", id: "code-branch", color: "blue", size: 16 },
            color: "blue",
            variant: "outlined",
            size: "small",
        });
    }
    if (typeof repository.watchers_count === "number") {
        statsChips.push({
            type: "Chip",
            label: `${repository.watchers_count}`,
            startElement: { type: "Icon", id: "eye", color: "teal", size: 16 },
            color: "teal",
            variant: "outlined",
            size: "small",
        });
    }
    // Action button to view on GitHub
    const viewButton = {
        type: "Button",
        label: "View on GitHub",
        href: repository.html_url,
        variant: "contained",
        color: "primary",
        size: "medium",
        startElement: {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 16,
        },
    };
    // Combine stats and action in the CardFooter
    const cardFooter = {
        type: "CardFooter",
        childrenProps: [...statsChips, viewButton],
    };
    // Assemble the VerticalCard with header, content, and footer
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
    return verticalCard;
}
//# sourceMappingURL=664.js.map