export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no package versions, display a friendly message using Markdown
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### 📦 No package versions found\n\nThere are currently no versions to display."
        };
    }
    // Helper: map package_type to a chip color
    const packageTypeColorMap = {
        npm: "orange",
        maven: "indigo",
        rubygems: "red",
        docker: "cyan",
        nuget: "teal",
        container: "blue",
    };
    // Build a List of ListItems, one per package version
    const listItems = input.map(version => {
        var _a, _b, _c, _d, _e, _f, _g;
        // Format the creation date for readability
        let createdAtLabel = "";
        try {
            const date = new Date(version.created_at);
            createdAtLabel = date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }
        catch (_h) {
            // Fallback to raw string if parsing fails
            createdAtLabel = version.created_at;
        }
        // Build an array of chips: first the package_type, then any container/docker tags
        const chips = [];
        if ((_a = version.metadata) === null || _a === void 0 ? void 0 : _a.package_type) {
            chips.push({
                type: "Chip",
                label: version.metadata.package_type,
                variant: "outlined",
                size: "small",
                color: packageTypeColorMap[version.metadata.package_type] || "gray",
            });
        }
        if ((_c = (_b = version.metadata) === null || _b === void 0 ? void 0 : _b.container) === null || _c === void 0 ? void 0 : _c.tags) {
            for (const tag of version.metadata.container.tags) {
                chips.push({
                    type: "Chip",
                    label: `container:${tag}`,
                    variant: "outlined",
                    size: "small",
                    color: "secondary",
                });
            }
        }
        if ((_e = (_d = version.metadata) === null || _d === void 0 ? void 0 : _d.docker) === null || _e === void 0 ? void 0 : _e.tag) {
            for (const tag of version.metadata.docker.tag) {
                chips.push({
                    type: "Chip",
                    label: `docker:${tag}`,
                    variant: "outlined",
                    size: "small",
                    color: "secondary",
                });
            }
        }
        // Build the ListItemProps for this version
        const listItem = {
            type: "ListItem",
            title: version.name,
            description: `${(_f = version.description) !== null && _f !== void 0 ? _f : "No description"} (Created: ${createdAtLabel})`,
            // Clicking the item will navigate to the HTML URL if available, else to the API URL
            href: (_g = version.html_url) !== null && _g !== void 0 ? _g : version.url,
            // A package icon at the start
            startElement: {
                type: "Icon",
                id: "box",
                color: "blue",
                size: 24,
            },
            // Show chips at the end summarizing metadata
            endElement: chips.length > 0 ? chips : undefined,
        };
        return listItem;
    });
    // Return the List component wrapping all items
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=971.js.map