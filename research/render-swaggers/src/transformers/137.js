export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Utility: format ISO date to user-friendly string
    const formatDate = (iso) => {
        try {
            const d = new Date(iso);
            return d.toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Seller info as a DataList: shows seller ID and signup date
    const sellerList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: { type: "Text", content: "Seller ID", variant: "body2" },
                value: { type: "Text", content: input.seller.id, variant: "body1" },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Seller Since", variant: "body2" },
                value: {
                    type: "Text",
                    content: formatDate(input.seller.created_at),
                    variant: "body1",
                },
            },
        ],
    };
    // For each snapshot, create a DataListItem showing title, body, and attachments
    const snapshotItems = input.snapshots.map((snap) => {
        // Body component: use Markdown if format is md, else plain Text
        const bodyComponent = snap.format === "md"
            ? { type: "Markdown", content: snap.body }
            : {
                type: "Text",
                content: snap.body,
                variant: "body1",
                lineClamp: 5, // limit long text
            };
        // Attachments list under this snapshot, if any
        let attachmentsComponent;
        if (Array.isArray(snap.files) && snap.files.length > 0) {
            const items = snap.files.map((file) => {
                // Construct display name: e.g. "README.md" or ".gitignore"
                const namePart = file.name || "";
                const extPart = file.extension ? "." + file.extension : "";
                const labelName = namePart
                    ? `${namePart}${extPart}`
                    : extPart || file.url;
                // Button to download/view file
                const fileButton = {
                    type: "Button",
                    variant: "text",
                    size: "small",
                    label: labelName,
                    startElement: {
                        type: "Icon",
                        id: "link",
                        size: 12,
                        color: "blue",
                    },
                    href: file.url,
                };
                return {
                    type: "DataListItem",
                    label: { type: "Text", content: labelName, variant: "body2" },
                    value: fileButton,
                };
            });
            attachmentsComponent = {
                type: "DataList",
                childrenProps: items,
            };
        }
        // Compose the snapshot's value: first body, then attachments if present
        const valueComponents = [
            bodyComponent,
        ];
        if (attachmentsComponent)
            valueComponents.push(attachmentsComponent);
        return {
            type: "DataListItem",
            // Use title in label, with snapshot creation date
            label: {
                type: "Text",
                content: `${snap.title} (${formatDate(snap.created_at)})`,
                variant: "subtitle2",
            },
            value: valueComponents,
        };
    });
    // If no snapshots, show a placeholder text
    const snapshotsBlock = snapshotItems.length
        ? {
            type: "DataList",
            childrenProps: snapshotItems,
        }
        : {
            type: "Text",
            content: "No snapshots available.",
            variant: "body2",
            color: "#888888",
        };
    // Assemble the card: header and content sections
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: `Sale Inquiry Answer: ${input.id}`,
                description: `Answered at ${formatDate(input.created_at)}`,
                startElement: {
                    type: "Icon",
                    id: "user-circle",
                    size: 24,
                    color: "blue",
                },
            },
            {
                type: "CardContent",
                childrenProps: [
                    // Section: Seller Info
                    {
                        type: "Text",
                        content: "Seller Information",
                        variant: "subtitle1",
                    },
                    sellerList,
                    // Section: Snapshots
                    {
                        type: "Text",
                        content: "Snapshots",
                        variant: "subtitle1",
                    },
                    snapshotsBlock,
                ],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=137.js.map