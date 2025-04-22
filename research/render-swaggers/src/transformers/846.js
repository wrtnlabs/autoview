export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map each release to a ListItem for a concise, responsive overview
    const listItems = input.map(release => {
        // Build an avatar from the release author
        const authorAvatar = {
            type: "Avatar",
            src: release.author.avatar_url,
            name: release.author.login,
            // A moderate size for mobile friendliness
            size: 40,
            variant: "primary",
        };
        // Badges and chips to convey metadata visually
        const endElements = [];
        // If this is a prerelease, surface that with a Chip
        if (release.prerelease) {
            endElements.push({
                type: "Chip",
                label: "Prerelease",
                color: "warning",
                size: "small",
                variant: "outlined",
            });
        }
        // Show the asset count with an icon badge
        endElements.push({
            type: "Badge",
            count: release.assets.length,
            maxCount: 999,
            showZero: true,
            dot: false,
            childrenProps: {
                type: "Icon",
                id: "download",
                size: 16,
                color: "gray",
            },
        });
        // Compose the list item; clicking navigates to the release page
        return {
            type: "ListItem",
            title: release.tag_name,
            description: // fallback to name/body; concise for list
            release.name != null
                ? release.name
                : release.body != null
                    ? release.body.split("\n", 1)[0] // first line only
                    : "",
            startElement: authorAvatar,
            endElement: endElements,
            href: release.html_url,
        };
    });
    // Return a responsive list of releases
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=846.js.map