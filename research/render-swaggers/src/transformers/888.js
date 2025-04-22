export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle empty or missing input gracefully
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No tags available\nThere are currently no tags to display.",
        };
    }
    // Transform each tag into a DataListItem with visual elements:
    // - An icon + tag name as the label
    // - A short SHA text
    // - Buttons linking to commit, zip, and tar resources
    const childrenProps = input.map((tag) => {
        const shortSha = tag.commit.sha.slice(0, 7);
        // Button to view the full commit
        const commitButton = {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "link", // use a link icon
                color: "blue",
                size: 12,
            },
            label: "Commit",
            href: tag.commit.url,
        };
        // Button to download zip archive
        const zipButton = {
            type: "Button",
            variant: "text",
            color: "secondary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "download",
                color: "gray",
                size: 12,
            },
            label: "ZIP",
            href: tag.zipball_url,
        };
        // Button to download tar archive
        const tarButton = {
            type: "Button",
            variant: "text",
            color: "secondary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "download",
                color: "gray",
                size: 12,
            },
            label: "TAR",
            href: tag.tarball_url,
        };
        return {
            type: "DataListItem",
            // Label: tag icon + human-readable name
            label: [
                {
                    type: "Icon",
                    id: "tag",
                    color: "gray",
                    size: 16,
                },
                {
                    type: "Text",
                    content: tag.name,
                    variant: "body1",
                },
            ],
            // Value: show the short SHA and action buttons
            value: [
                {
                    type: "Text",
                    content: `SHA: ${shortSha}`,
                    variant: "caption",
                    color: "tertiary",
                },
                commitButton,
                zipButton,
                tarButton,
            ],
        };
    });
    // Wrap the items in a DataList for responsive, accessible rendering
    return {
        type: "DataList",
        childrenProps,
    };
}
//# sourceMappingURL=888.js.map