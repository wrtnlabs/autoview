export function transform($input) {
    return visualizeData($input);
}
// Transforms arbitrary input into an AutoView component tree.
// Attempts to detect error vs. “user profile” shape and renders accordingly.
function visualizeData(input) {
    var _a;
    // 1) Error handling: if input carries an `error` property or is null/undefined
    if (input === null || input === undefined || typeof input.error === "string") {
        const msg = (_a = input === null || input === void 0 ? void 0 : input.error) !== null && _a !== void 0 ? _a : "Unable to load data.";
        return {
            type: "Markdown",
            content: `# Error\n\n${msg}`
        };
    }
    // 2) Assume `input` is a user‐profile‐like shape:
    //    { name, title, avatarUrl, bio, skills: string[], social: { iconName, url }[] }
    const { name, title, avatarUrl, bio, skills, social } = input;
    // Build the CardHeader: show avatar + name + title
    const header = {
        type: "CardHeader",
        title: name,
        description: title,
        startElement: avatarUrl
            ? { type: "Avatar", src: avatarUrl, name }
            : undefined
    };
    // Build the CardContent: markdown bio + skills as chips
    const contentChildren = [];
    if (bio) {
        // Use markdown for rich formatting
        contentChildren.push({
            type: "Markdown",
            content: bio
        });
    }
    if (Array.isArray(skills) && skills.length > 0) {
        const chips = skills.map((skill) => ({
            type: "Chip",
            label: skill,
            variant: "outlined",
            size: "small",
            color: "primary"
        }));
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: chips
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren.length ? contentChildren : undefined
    };
    // Build the CardFooter: social links as icon buttons wrapped in text‐buttons
    const footerChildren = [];
    if (Array.isArray(social) && social.length > 0) {
        social.forEach((item) => {
            if (item.iconName && item.url) {
                footerChildren.push({
                    type: "Button",
                    variant: "text",
                    size: "small",
                    href: item.url,
                    startElement: {
                        type: "Icon",
                        id: item.iconName
                    }
                });
            }
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren.length ? footerChildren : undefined
    };
    // 3) Final composition: a responsive VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=297.js.map