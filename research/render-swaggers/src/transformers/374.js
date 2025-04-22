export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // 1. Build the card header with avatar, title (name or login), and description.
    const header = {
        type: "CardHeader",
        title: (_a = input.name) !== null && _a !== void 0 ? _a : input.login,
        description: (_b = input.description) !== null && _b !== void 0 ? _b : undefined,
        startElement: {
            type: "Avatar",
            src: input.avatar_url,
            name: input.login,
            size: 40,
            variant: "primary",
        },
    };
    // 2. Build a statistics list: repos, gists, followers, following.
    //    Each item uses an icon + label on the left, and a count on the right.
    const statsItems = [];
    // Helper to push a stat row
    function pushStat(iconId, label, value) {
        statsItems.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: iconId, size: 16, color: "gray" },
                { type: "Text", content: [label], variant: "body2" },
            ],
            value: { type: "Text", content: [String(value)], variant: "body2" },
        });
    }
    pushStat("book", "Repos", input.public_repos);
    pushStat("file", "Gists", input.public_gists);
    pushStat("users", "Followers", input.followers);
    pushStat("user-friends", "Following", input.following);
    const statsList = {
        type: "DataList",
        childrenProps: statsItems,
    };
    // 3. Build chips for optional metadata: company, location, email, twitter.
    const chips = [];
    if (input.company) {
        chips.push({
            type: "Chip",
            label: input.company,
            startElement: { type: "Icon", id: "building", size: 12, color: "gray" },
            variant: "outlined",
            size: "small",
        });
    }
    if (input.location) {
        chips.push({
            type: "Chip",
            label: input.location,
            startElement: { type: "Icon", id: "map-marker-alt", size: 12, color: "gray" },
            variant: "outlined",
            size: "small",
        });
    }
    if (input.email) {
        chips.push({
            type: "Chip",
            label: input.email,
            startElement: { type: "Icon", id: "envelope", size: 12, color: "gray" },
            variant: "outlined",
            size: "small",
        });
    }
    if (input.twitter_username) {
        chips.push({
            type: "Chip",
            label: `@${input.twitter_username}`,
            startElement: { type: "Icon", id: "twitter", size: 12, color: "blue" },
            variant: "outlined",
            size: "small",
        });
    }
    // If we have any chips, wrap them in a ChipGroup
    const chipGroup = chips.length > 0
        ? {
            type: "ChipGroup",
            childrenProps: chips,
        }
        : null;
    // 4. Build call-to-action buttons: GitHub profile, personal website, Twitter.
    const buttons = [];
    // GitHub profile
    buttons.push({
        type: "Button",
        label: "GitHub",
        href: input.html_url,
        startElement: { type: "Icon", id: "github", size: 16, color: "gray" },
    });
    // Personal website / blog
    if (input.blog) {
        buttons.push({
            type: "Button",
            label: "Website",
            href: input.blog,
            startElement: { type: "Icon", id: "globe", size: 16, color: "gray" },
        });
    }
    // Twitter link
    if (input.twitter_username) {
        buttons.push({
            type: "Button",
            label: "Twitter",
            href: `https://twitter.com/${input.twitter_username}`,
            startElement: { type: "Icon", id: "twitter", size: 16, color: "blue" },
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: buttons,
    };
    // 5. Compose all parts into a responsive vertical card.
    const children = [
        header,
        {
            type: "CardContent",
            // Include the stats list and optionally the chip group
            childrenProps: chipGroup ? [statsList, chipGroup] : [statsList],
        },
        footer,
    ];
    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
//# sourceMappingURL=374.js.map