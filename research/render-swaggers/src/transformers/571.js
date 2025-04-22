export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Compose the card header with repository name, description, and owner's avatar
    const header = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.description) !== null && _a !== void 0 ? _a : "",
        startElement: {
            type: "Avatar",
            src: input.owner.avatar_url,
            name: input.owner.login,
            variant: "primary",
            size: 40,
        },
    };
    // Helper: create a DataListItem for a metric with icon + label + value
    const makeMetricItem = (label, value, iconId, iconColor) => ({
        type: "DataListItem",
        label: {
            type: "Text",
            content: label,
            variant: "body2",
        },
        value: [
            {
                type: "Icon",
                id: iconId,
                color: iconColor,
                size: 16,
            },
            {
                type: "Text",
                content: String(value),
                variant: "body2",
            },
        ],
    });
    // Compose metrics: stars, forks, open issues, watchers, size (KB)
    const metricsItems = [
        makeMetricItem("Stars", input.stargazers_count, "star", "yellow"),
        makeMetricItem("Forks", input.forks_count, "code-branch", "cyan"),
        makeMetricItem("Open Issues", input.open_issues_count, "exclamation-circle", "red"),
        makeMetricItem("Watchers", input.watchers_count, "eye", "teal"),
        makeMetricItem("Size (KB)", input.size, "database", "gray"),
        // Show last updated date
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Last Updated",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: new Date(input.updated_at).toLocaleDateString(),
                variant: "body2",
            },
        },
    ];
    const dataList = {
        type: "DataList",
        childrenProps: metricsItems,
    };
    // Compose topic chips if any topics are present
    const topicChips = ((_b = input.topics) !== null && _b !== void 0 ? _b : []).map((topic) => ({
        type: "Chip",
        label: topic,
        variant: "outlined",
        size: "small",
    }));
    const chipGroup = topicChips.length > 0
        ? {
            type: "ChipGroup",
            childrenProps: topicChips,
            maxItems: 8,
        }
        : undefined;
    // Compose homepage button if homepage URL is provided
    const homepageButton = input.homepage
        ? {
            type: "Button",
            label: "Homepage",
            variant: "text",
            color: "primary",
            href: input.homepage,
            startElement: {
                type: "Icon",
                id: "home",
                color: "blue",
                size: 16,
            },
        }
        : undefined;
    // Primary action: view on GitHub
    const viewButton = {
        type: "Button",
        label: "View on GitHub",
        variant: "contained",
        color: "primary",
        href: input.html_url,
        startElement: {
            type: "Icon",
            id: "github",
            color: "darkGray",
            size: 16,
        },
    };
    // Compose card content with metrics list and optional topics
    const contentChildren = [dataList];
    if (chipGroup)
        contentChildren.push(chipGroup);
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Compose card footer with action buttons
    const footerButtons = [viewButton];
    if (homepageButton)
        footerButtons.push(homepageButton);
    const footer = {
        type: "CardFooter",
        childrenProps: footerButtons,
    };
    // Final vertical card assembly
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return verticalCard;
}
//# sourceMappingURL=571.js.map