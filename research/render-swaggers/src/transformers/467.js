export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure all relevant fields from the input for clarity.
    const { id, account, repository_selection, app_id, target_id, target_type, permissions, events, created_at, updated_at, single_file_name, has_multiple_single_files, single_file_paths, app_slug, suspended_by, suspended_at, contact_email, } = input;
    // Helper to render simple text
    const makeText = (value) => ({
        type: "Text",
        content: value,
    });
    // Header: shows the application slug and installation number, with an avatar if available.
    const header = {
        type: "CardHeader",
        title: `App: ${app_slug}`,
        description: `Installation #${id}`,
        // If the account has an avatar_url and login, show it.
        startElement: account && typeof account.avatar_url === "string"
            ? {
                type: "Avatar",
                src: account.avatar_url,
                name: account.login,
            }
            : undefined,
        // Show repository selection as a chip (all vs selected).
        endElement: {
            type: "Chip",
            label: repository_selection,
            variant: "outlined",
        },
    };
    // Build the list of data items for the main body.
    const dataItems = [];
    // Installation & App identifiers
    dataItems.push({
        type: "DataListItem",
        label: [makeText("Installation ID")],
        value: makeText(id.toString()),
    });
    dataItems.push({
        type: "DataListItem",
        label: [makeText("GitHub App ID")],
        value: makeText(app_id.toString()),
    });
    // Target scope (user/org) information
    dataItems.push({
        type: "DataListItem",
        label: [makeText("Target")],
        value: makeText(`${target_type} #${target_id}`),
    });
    // Dates
    dataItems.push({
        type: "DataListItem",
        label: [makeText("Created At")],
        value: makeText(new Date(created_at).toLocaleString()),
    });
    dataItems.push({
        type: "DataListItem",
        label: [makeText("Updated At")],
        value: makeText(new Date(updated_at).toLocaleString()),
    });
    // Suspension info, if present
    if (suspended_at) {
        dataItems.push({
            type: "DataListItem",
            label: [makeText("Suspended At")],
            value: makeText(new Date(suspended_at).toLocaleString()),
        });
    }
    if (suspended_by && typeof suspended_by === "object") {
        dataItems.push({
            type: "DataListItem",
            label: [makeText("Suspended By")],
            // Represent suspended_by as an avatar with login
            value: {
                type: "Avatar",
                src: suspended_by.avatar_url,
                name: suspended_by.login,
            },
        });
    }
    // Single file or multiple files info
    if (single_file_name != null) {
        dataItems.push({
            type: "DataListItem",
            label: [makeText("Single File")],
            value: makeText(single_file_name),
        });
    }
    else if (has_multiple_single_files && Array.isArray(single_file_paths)) {
        dataItems.push({
            type: "DataListItem",
            label: [makeText("Files")],
            value: makeText(`${single_file_paths.length} files selected`),
        });
    }
    // Contact email, if any
    if (contact_email) {
        dataItems.push({
            type: "DataListItem",
            label: [makeText("Contact Email")],
            value: makeText(contact_email),
        });
    }
    // Permissions: render as a markdown code block for readability
    dataItems.push({
        type: "DataListItem",
        label: [makeText("Permissions")],
        value: {
            type: "Markdown",
            content: "json\n" + JSON.stringify(permissions, null, 2) + "\n```",
        },
    });
    // Events: show as a group of chips
    if (Array.isArray(events) && events.length > 0) {
        const eventChips = events.map((evt) => ({
            type: "Chip",
            label: evt,
            variant: "filled",
            size: "small",
        }));
        dataItems.push({
            type: "DataListItem",
            label: [makeText("Events")],
            value: {
                type: "ChipGroup",
                childrenProps: eventChips,
            },
        });
    }
    // Compose the DataList component with all items
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Wrap the data list in a CardContent
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Final layout: a vertical card with header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=467.js.map