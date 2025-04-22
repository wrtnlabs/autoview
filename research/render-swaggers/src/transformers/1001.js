export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No package versions available.**",
        };
    }
    // Helper: map package_type to FontAwesome icon IDs and colors
    const typeIconMap = {
        npm: { id: "npm", color: "red" },
        maven: { id: "coffee", color: "orange" },
        rubygems: { id: "gem", color: "violet" },
        docker: { id: "docker", color: "cyan" },
        nuget: { id: "box", color: "blue" },
        container: { id: "box", color: "gray" },
    };
    // Build DataList items for each package version
    const items = input.map((v) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // Determine package type icon (fallback to archive)
        const pkgType = (_b = (_a = v.metadata) === null || _a === void 0 ? void 0 : _a.package_type) !== null && _b !== void 0 ? _b : "";
        const iconInfo = (_c = typeIconMap[pkgType]) !== null && _c !== void 0 ? _c : { id: "archive", color: "gray" };
        // Build chips for container tags (if any)
        const containerTags = (_f = (_e = (_d = v.metadata) === null || _d === void 0 ? void 0 : _d.container) === null || _e === void 0 ? void 0 : _e.tags) !== null && _f !== void 0 ? _f : [];
        const containerChips = containerTags.map((tag) => ({
            type: "Chip",
            label: tag,
            size: "small",
            variant: "outlined",
            color: "secondary",
        }));
        // Build chips for docker tags (if any)
        const dockerTags = (_j = (_h = (_g = v.metadata) === null || _g === void 0 ? void 0 : _g.docker) === null || _h === void 0 ? void 0 : _h.tag) !== null && _j !== void 0 ? _j : [];
        const dockerChips = dockerTags.map((tag) => ({
            type: "Chip",
            label: tag,
            size: "small",
            variant: "outlined",
            color: "info",
        }));
        // Format creation date to a human‐readable string
        const createdDate = (() => {
            try {
                return new Date(v.created_at).toLocaleDateString();
            }
            catch (_a) {
                return v.created_at;
            }
        })();
        // Assemble detail components (Markdown, Text, ChipGroups, Button)
        const details = [];
        // Description as markdown, if present
        if (v.description) {
            details.push({
                type: "Markdown",
                content: v.description,
            });
        }
        // Created date with calendar icon inline in a Text component
        details.push({
            type: "Text",
            variant: "caption",
            content: [
                "Created: ",
                { type: "Icon", id: "calendar", size: 16, color: "gray" },
                " " + createdDate,
            ],
        });
        // Container tags group (show up to 3)
        if (containerChips.length > 0) {
            details.push({
                type: "ChipGroup",
                childrenProps: containerChips,
                maxItems: 3,
            });
        }
        // Docker tags group (show up to 3)
        if (dockerChips.length > 0) {
            details.push({
                type: "ChipGroup",
                childrenProps: dockerChips,
                maxItems: 3,
            });
        }
        // Detail link button
        const link = (_k = v.html_url) !== null && _k !== void 0 ? _k : v.url;
        details.push({
            type: "Button",
            label: "Details",
            href: link,
            variant: "outlined",
            color: "primary",
            size: "small",
        });
        // Return a DataListItem with an icon label and detailed value
        return {
            type: "DataListItem",
            label: {
                // Show the package type icon prominently
                type: "Icon",
                id: iconInfo.id,
                size: 32,
                color: iconInfo.color,
            },
            value: details,
        };
    });
    // Finally, wrap all items in a DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=1001.js.map