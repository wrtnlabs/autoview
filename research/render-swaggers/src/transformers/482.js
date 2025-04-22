export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of migrations into a responsive, icon‐rich list view
function visualizeData(input) {
    // Map each migration to a ListItem with visual cues: avatar, chips, badges, icons, and dates
    const items = input.map(mig => {
        var _a, _b, _c, _d;
        // Determine chip color by migration state
        const stateColor = (() => {
            switch (mig.state.toLowerCase()) {
                case "exported":
                    return "success";
                case "exporting":
                    return "info";
                case "failed":
                    return "error";
                default:
                    return "gray";
            }
        })();
        // Owner avatar (handles null owner by omitting src/name)
        const avatar = {
            type: "Avatar",
            src: (_a = mig.owner) === null || _a === void 0 ? void 0 : _a.avatar_url,
            name: (_b = mig.owner) === null || _b === void 0 ? void 0 : _b.login,
            size: 32,
            variant: "primary",
        };
        // State chip to visualize current status
        const stateChip = {
            type: "Chip",
            label: mig.state,
            color: stateColor,
            size: "small",
            variant: "filled",
        };
        // Badge showing number of repositories
        const repoBadge = {
            type: "Badge",
            count: mig.repositories.length,
            maxCount: 99,
            childrenProps: {
                type: "Icon",
                id: "code-branch",
                color: "blue",
                size: 16,
            },
        };
        // If repositories are locked, show a lock icon
        const lockIcon = mig.lock_repositories
            ? {
                type: "Icon",
                id: "lock",
                color: "red",
                size: 16,
            }
            : undefined;
        // Show creation date as a small caption
        const createdText = {
            type: "Text",
            content: [`${new Date(mig.created_at).toLocaleDateString()}`],
            variant: "caption",
        };
        // Assemble end elements (state chip, repo badge, optional lock icon, date)
        const endElements = [
            stateChip,
            repoBadge,
            ...(lockIcon ? [lockIcon] : []),
            createdText,
        ];
        return {
            type: "ListItem",
            title: `Migration #${mig.id}`,
            description: `Owner: ${(_d = (_c = mig.owner) === null || _c === void 0 ? void 0 : _c.login) !== null && _d !== void 0 ? _d : "Unknown"}`,
            startElement: avatar,
            endElement: endElements,
            // Link the list item to the migration URL for deeper inspection
            href: mig.url,
        };
    });
    // Return the complete list component
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=482.js.map