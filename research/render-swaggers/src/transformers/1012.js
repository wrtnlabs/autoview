export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If input is not an array or empty, show a friendly message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No data available to display.",
        };
    }
    // Heuristic: if items look like GitHub repositories (have 'name' property), render as a DataList
    const first = input[0];
    if (typeof first === "object" && typeof first.name === "string") {
        const items = input.map((repo) => {
            var _a;
            const name = repo.name;
            const url = repo.html_url;
            const description = repo.description;
            const ownerAvatar = (_a = repo.owner) === null || _a === void 0 ? void 0 : _a.avatar_url;
            const stars = typeof repo.stargazers_count === "number" ? repo.stargazers_count : undefined;
            const language = typeof repo.language === "string" ? repo.language : undefined;
            // Build chips for stars and language
            const chips = [];
            if (stars !== undefined) {
                chips.push({
                    type: "Chip",
                    label: stars.toLocaleString(),
                    variant: "outlined",
                    startElement: {
                        type: "Icon",
                        id: "star",
                        color: "yellow",
                        size: 16,
                    },
                });
            }
            if (language) {
                chips.push({
                    type: "Chip",
                    label: language,
                    variant: "outlined",
                });
            }
            const chipGroup = {
                type: "ChipGroup",
                childrenProps: chips,
            };
            // Compose the DataListItem
            const listItem = {
                type: "DataListItem",
                // Label: repository title with optional link
                label: [
                    {
                        type: "Text",
                        variant: "h6",
                        color: "primary",
                        content: url ? `[${name}](${url})` : name,
                    },
                ],
                // Value: description and chips
                value: [
                    // Description as markdown to allow rich text
                    description
                        ? {
                            type: "Markdown",
                            content: description,
                        }
                        : null,
                    // Show chips if any
                    chips.length > 0 ? chipGroup : null,
                ].filter(Boolean),
            };
            // If owner avatar exists, show it as leading icon
            if (ownerAvatar) {
                listItem.startElement = {
                    type: "Avatar",
                    src: ownerAvatar,
                    variant: "primary",
                    size: 32,
                };
            }
            return listItem;
        });
        return {
            type: "DataList",
            childrenProps: items,
        };
    }
    // Fallback: render raw JSON in a code block using Markdown
    const jsonStr = JSON.stringify(input, null, 2);
    return {
        type: "Markdown",
        content: "json\n" + jsonStr + "\n```",
    };
}
//# sourceMappingURL=1012.js.map