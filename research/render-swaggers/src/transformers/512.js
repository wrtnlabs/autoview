export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Build the avatar for the repository owner
    const ownerAvatar = {
        type: "Avatar",
        src: input.owner.avatar_url,
        name: input.owner.login,
        variant: "blue",
        size: 40,
    };
    // Build a badge showing the stargazers count with a star icon
    const starBadge = {
        type: "Badge",
        childrenProps: {
            type: "Icon",
            id: "star",
            color: "yellow",
            size: 16,
        },
        count: input.stargazers_count,
        color: "yellow",
        showZero: true,
        maxCount: undefined,
    };
    // Prepare metric chips: forks, watchers, open issues
    const metricChips = [
        {
            type: "Chip",
            label: input.forks_count.toString(),
            startElement: {
                type: "Icon",
                id: "code-branch",
                color: "gray",
                size: 16,
            },
            variant: "outlined",
            size: "small",
            color: "gray",
        },
        {
            type: "Chip",
            label: input.watchers_count.toString(),
            startElement: {
                type: "Icon",
                id: "eye",
                color: "gray",
                size: 16,
            },
            variant: "outlined",
            size: "small",
            color: "gray",
        },
        {
            type: "Chip",
            label: input.open_issues_count.toString(),
            startElement: {
                type: "Icon",
                id: "exclamation-circle",
                color: "red",
                size: 16,
            },
            variant: "outlined",
            size: "small",
            color: "red",
        },
    ];
    const metricsGroup = {
        type: "ChipGroup",
        childrenProps: metricChips,
        maxItems: undefined,
    };
    // If the repository has topics, build a chip group for them
    let topicGroup;
    if (Array.isArray(input.topics) && input.topics.length > 0) {
        const topicChips = input.topics.map((topic) => ({
            type: "Chip",
            label: topic,
            variant: "filled",
            size: "small",
            color: "indigo",
        }));
        topicGroup = {
            type: "ChipGroup",
            childrenProps: topicChips,
            maxItems: undefined,
        };
    }
    // Compose the card header: title, optional description, owner avatar, star badge
    const header = {
        type: "CardHeader",
        title: input.full_name,
        description: (_a = input.description) !== null && _a !== void 0 ? _a : undefined,
        startElement: ownerAvatar,
        endElement: starBadge,
    };
    // Card content holds the key metrics chips
    const content = {
        type: "CardContent",
        childrenProps: [metricsGroup],
    };
    // Card footer shows topics if available
    const footer = {
        type: "CardFooter",
        childrenProps: topicGroup ? topicGroup : [],
    };
    // Return a vertical card composed of header, content, and optional footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, ...(topicGroup ? [footer] : [])],
    };
}
//# sourceMappingURL=512.js.map