export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { snapshots } = input;
    // If there are no snapshots, render a simple text message
    if (!Array.isArray(snapshots) || snapshots.length === 0) {
        return {
            type: "Text",
            content: "No comment available.",
            variant: "body2",
        };
    }
    // Helper: format ISO timestamp into local date/time string
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Build a DataListItem for each snapshot record
    const dataListItems = snapshots.map((snapshot) => {
        // Render attachments (if any) as images under the snapshot body
        const attachmentImages = (snapshot.files || []).map((file) => ({
            type: "Image",
            src: file.url,
            alt: file.name || file.extension || "attachment",
        }));
        // Value section: first the markdown body, then any attachments
        const valueComponents = [
            {
                type: "Markdown",
                content: snapshot.body,
            },
            // Spread attachments images if present
            ...attachmentImages,
        ];
        return {
            type: "DataListItem",
            // Show the snapshot timestamp in the label (lighter caption style)
            label: [
                {
                    type: "Text",
                    content: formatDate(snapshot.created_at),
                    variant: "caption",
                },
            ],
            value: valueComponents,
        };
    });
    const dataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Identify the latest snapshot for the collapse header
    const latestSnapshot = snapshots[snapshots.length - 1];
    const headerMarkdown = {
        type: "Markdown",
        content: latestSnapshot.body,
    };
    const headerTimestamp = {
        type: "Text",
        content: `Last updated: ${formatDate(latestSnapshot.created_at)}`,
        variant: "caption",
    };
    // Main UI: a collapsible panel showing the latest comment,
    // with history of edits in a DataList inside the content.
    return {
        type: "Collapse",
        header: {
            type: "CollapseHeader",
            // Provide a clear toggle icon
            toggleIcon: {
                type: "Icon",
                id: "chevron-down",
                size: 16,
            },
            childrenProps: [headerMarkdown, headerTimestamp],
        },
        content: {
            type: "CollapseContent",
            // Embed the data list of snapshot history
            childrenProps: [dataListProps],
        },
    };
}
//# sourceMappingURL=25.js.map