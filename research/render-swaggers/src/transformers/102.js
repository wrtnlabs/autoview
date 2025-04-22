export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // 1. Header: show review author and creation date
    const header = {
        type: "CardHeader",
        title: `Review by ${input.customer.id}`,
        description: `Created on ${new Date(input.created_at).toLocaleDateString()}`,
        startElement: {
            type: "Icon",
            id: "user",
            size: 32,
            color: "gray"
        }
    };
    // 2. Build a DataListItem for each snapshot
    const items = input.snapshots.map(snapshot => {
        // Determine star count (rounded)
        const starCount = Math.round(snapshot.score);
        // Generate star icons
        const stars = Array(starCount)
            .fill(undefined)
            .map(() => ({
            type: "Icon",
            id: "star",
            size: 16,
            color: "yellow"
        }));
        // Main body as markdown
        const bodyMd = {
            type: "Markdown",
            content: snapshot.body
        };
        // Attachments, if any, rendered as markdown links
        let attachmentsMd;
        if (snapshot.files && snapshot.files.length) {
            const list = snapshot.files
                .map(file => {
                const ext = file.extension ? `.${file.extension}` : "";
                const name = `${file.name}${ext}`;
                return `- [${name}](${file.url})`;
            })
                .join("\n");
            attachmentsMd = {
                type: "Markdown",
                content: `**Attachments:**\n${list}`
            };
        }
        // Combine stars, body, and attachments into the value field
        const valueComponents = [
            ...stars,
            bodyMd
        ];
        if (attachmentsMd) {
            valueComponents.push(attachmentsMd);
        }
        return {
            type: "DataListItem",
            label: {
                type: "Text",
                content: snapshot.title,
                variant: "subtitle1"
            },
            value: valueComponents
        };
    });
    // 3. Wrap snapshots in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // 4. Badge to show read/unread status
    const readBadge = {
        type: "Badge",
        dot: !input.read_by_seller,
        color: input.read_by_seller ? "green" : "red",
        childrenProps: {
            type: "Icon",
            id: "eye",
            size: 16,
            color: input.read_by_seller ? "green" : "red"
        }
    };
    // 5. Compose the final vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: dataList
            },
            {
                type: "CardFooter",
                childrenProps: [readBadge]
            }
        ]
    };
    return card;
}
//# sourceMappingURL=102.js.map