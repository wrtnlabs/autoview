export function transform($input) {
    return visualizeData($input);
}
/**
 * Transforms a Schema.migration object into an AutoView component tree.
 */
function visualizeData(input) {
    var _a;
    // Safely extract owner info, falling back to placeholders if absent
    const owner = input.owner;
    const avatarProps = {
        type: "Avatar",
        src: owner === null || owner === void 0 ? void 0 : owner.avatar_url,
        name: (_a = owner === null || owner === void 0 ? void 0 : owner.login) !== null && _a !== void 0 ? _a : "Unknown",
        variant: "blue",
        size: 40,
    };
    // Helper: convert snake_case flag keys into Title Case labels
    const formatFlagLabel = (key) => key
        .split("_")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");
    // Assemble boolean flags to display as chips
    const booleanFlags = [
        { key: "lock_repositories", value: !!input.lock_repositories },
        { key: "exclude_metadata", value: !!input.exclude_metadata },
        { key: "exclude_git_data", value: !!input.exclude_git_data },
        { key: "exclude_attachments", value: !!input.exclude_attachments },
        { key: "exclude_releases", value: !!input.exclude_releases },
        { key: "exclude_owner_projects", value: !!input.exclude_owner_projects },
        { key: "org_metadata_only", value: !!input.org_metadata_only },
    ];
    const activeFlags = booleanFlags.filter((f) => f.value);
    // Build chips only for active (true) flags
    const flagChips = activeFlags.map((f) => ({
        type: "Chip",
        label: formatFlagLabel(f.key),
        variant: "outlined",
        color: "blue",
        size: "small",
    }));
    // Build the list of key/value items for the migration
    const items = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "ID" },
            value: { type: "Text", content: input.id.toString() },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "GUID" },
            value: { type: "Text", content: input.guid },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "State" },
            value: { type: "Text", content: input.state },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Repositories" },
            value: {
                type: "Text",
                content: input.repositories.length.toString(),
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: {
                type: "Text",
                content: new Date(input.created_at).toLocaleString(),
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At" },
            value: {
                type: "Text",
                content: new Date(input.updated_at).toLocaleString(),
            },
        },
    ];
    // If there are any boolean flags, show them as a chip group
    if (flagChips.length > 0) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Options" },
            value: {
                type: "ChipGroup",
                // Show each active flag as an outlined chip
                childrenProps: flagChips,
            },
        });
    }
    // Always include the migration URL as an action button
    const footerButtons = [
        {
            type: "Button",
            label: "View Migration",
            href: input.url,
            variant: "outlined",
        },
    ];
    // If an archive URL is available, add a download button
    if (input.archive_url) {
        footerButtons.push({
            type: "Button",
            label: "Download Archive",
            href: input.archive_url,
            variant: "contained",
            color: "primary",
        });
    }
    // Compose the final vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with avatar, title, and GUID
                type: "CardHeader",
                title: `Migration #${input.id}`,
                description: input.guid,
                startElement: avatarProps,
            },
            {
                // Content with a data list of all key properties
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: items,
                },
            },
            {
                // Footer with action buttons
                type: "CardFooter",
                childrenProps: footerButtons,
            },
        ],
    };
}
//# sourceMappingURL=483.js.map