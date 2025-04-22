export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Determine the gist owner (prefer `owner`, fallback to `user`)
    const owner = (_b = (_a = input.owner) !== null && _a !== void 0 ? _a : input.user) !== null && _b !== void 0 ? _b : null;
    // Build an avatar component if owner info is available
    const avatarElement = owner
        ? {
            type: "Avatar",
            src: owner.avatar_url,
            name: owner.login,
            variant: "primary",
            size: 40,
        }
        : undefined;
    // Badge to show number of comments, with a comment icon
    const commentBadge = {
        type: "Badge",
        count: input.comments,
        showZero: false,
        childrenProps: {
            type: "Icon",
            id: "comment",
            color: "gray",
            size: 16,
        },
    };
    // Build a list of files in the gist
    const fileNames = Object.keys(input.files);
    const fileItems = fileNames.map((filename) => {
        var _a;
        const file = input.files[filename];
        // Label: filename
        const label = {
            type: "Text",
            content: filename,
        };
        // Value: language chip (fallback to "Unknown")
        const value = {
            type: "Chip",
            label: (_a = file.language) !== null && _a !== void 0 ? _a : "Unknown",
            variant: "outlined",
            size: "small",
        };
        return {
            type: "DataListItem",
            label,
            value,
        };
    });
    const fileList = {
        type: "DataList",
        childrenProps: fileItems,
    };
    // Compose the card header
    const headerTitle = (_c = input.description) !== null && _c !== void 0 ? _c : `Gist ${input.id}`;
    const cardHeader = {
        type: "CardHeader",
        title: headerTitle,
        // show comment count on the right
        endElement: commentBadge,
    };
    if (avatarElement) {
        cardHeader.startElement = avatarElement;
    }
    if (input.description) {
        cardHeader.description = input.description;
    }
    // Compose the card content: show file count and file list
    const cardContent = {
        type: "CardContent",
        childrenProps: [
            {
                type: "Text",
                variant: "h4",
                content: `Files (${fileNames.length})`,
            },
            fileList,
        ],
    };
    // Footer with a button linking to the gist on GitHub
    const viewButton = {
        type: "Button",
        label: "Open on GitHub",
        variant: "contained",
        color: "primary",
        href: input.html_url,
    };
    const cardFooter = {
        type: "CardFooter",
        childrenProps: viewButton,
    };
    // Return a responsive vertical card composing all parts
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=353.js.map