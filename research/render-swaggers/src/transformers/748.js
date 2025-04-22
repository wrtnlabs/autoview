export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // For each repository, create a vertical card with header (avatar + title/description),
    // content (stats and language chips), and footer (action button).
    const cards = input.map((repo) => {
        var _a, _b, _c, _d;
        // Avatar component for the repository owner
        const ownerAvatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 40,
            variant: "gray"
        };
        // Accumulate chips: stars, forks, and language
        const statChips = [];
        // Star count chip
        statChips.push({
            type: "Chip",
            label: `${(_a = repo.stargazers_count) !== null && _a !== void 0 ? _a : 0}`,
            startElement: {
                type: "Icon",
                id: "star", // FontAwesome "star" icon
                color: "yellow",
                size: 16
            },
            variant: "outlined",
            size: "small",
            color: "yellow"
        });
        // Fork count chip
        statChips.push({
            type: "Chip",
            label: `${(_b = repo.forks) !== null && _b !== void 0 ? _b : 0}`,
            startElement: {
                type: "Icon",
                id: "code-branch", // FontAwesome "code-branch" icon
                color: "cyan",
                size: 16
            },
            variant: "outlined",
            size: "small",
            color: "cyan"
        });
        // Language chip (fall back to "Unknown" if missing)
        statChips.push({
            type: "Chip",
            label: (_c = repo.language) !== null && _c !== void 0 ? _c : "Unknown",
            variant: "outlined",
            size: "small",
            color: "primary"
        });
        // CardHeader: shows avatar, repository name, and description
        const header = {
            type: "CardHeader",
            title: repo.name,
            // description is optional; only include if non-null
            description: (_d = repo.description) !== null && _d !== void 0 ? _d : undefined,
            startElement: ownerAvatar
        };
        // CardContent: horizontal group of chips
        const content = {
            type: "CardContent",
            childrenProps: statChips
        };
        // CardFooter: a single "View" button that opens the repo URL
        const footer = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                label: "View",
                variant: "outlined",
                size: "small",
                color: "primary",
                href: repo.html_url,
                startElement: {
                    type: "Icon",
                    id: "external-link-alt", // FontAwesome "external-link-alt" icon
                    size: 16
                }
            }
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer]
        };
    });
    // Wrap all cards in a Carousel for responsive horizontal scrolling
    const carousel = {
        type: "Carousel",
        autoPlay: false,
        infinite: false,
        gutter: 16,
        navControls: true,
        indicators: true,
        childrenProps: cards
    };
    return carousel;
}
//# sourceMappingURL=748.js.map