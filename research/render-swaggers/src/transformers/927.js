export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Convert date strings into human‐readable format
    const createdDate = new Date(input.created_at).toLocaleDateString();
    const updatedDate = new Date(input.updated_at).toLocaleDateString();
    // 1. Card media: full‐width user avatar
    const media = {
        type: "CardMedia",
        src: input.avatar_url,
    };
    // 2. Card header: avatar, name/login, bio, and a followers chip
    const header = {
        type: "CardHeader",
        // If the user has set a display name, use it; otherwise, fall back to login
        title: (_a = input.name) !== null && _a !== void 0 ? _a : input.login,
        // Include bio only when present
        description: (_b = input.bio) !== null && _b !== void 0 ? _b : undefined,
        startElement: {
            type: "Avatar",
            src: input.avatar_url,
            name: input.login,
            size: 56,
            variant: "primary",
        },
        endElement: {
            type: "Chip",
            label: `${input.followers} Followers`,
            color: "primary",
            size: "small",
            variant: "filled",
        },
    };
    // 3. Build a data list of key stats
    const statsItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Public Repos" },
            value: { type: "Text", content: input.public_repos.toString() },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Public Gists" },
            value: { type: "Text", content: input.public_gists.toString() },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Following" },
            value: { type: "Text", content: input.following.toString() },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Followers" },
            value: { type: "Text", content: input.followers.toString() },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Account Created" },
            value: { type: "Text", content: createdDate },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Last Updated" },
            value: { type: "Text", content: updatedDate },
        },
    ];
    const dataList = {
        type: "DataList",
        childrenProps: statsItems,
    };
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // 4. Card footer: a button linking to the GitHub profile
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            variant: "outlined",
            color: "primary",
            size: "medium",
            label: "View Profile",
            href: input.html_url,
            startElement: {
                type: "Icon",
                id: "github",
                color: "gray",
                size: 20,
            },
        },
    };
    // 5. Assemble a vertical card with media, header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [media, header, content, footer],
    };
}
//# sourceMappingURL=927.js.map