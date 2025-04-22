export function transform($input) {
    return visualizeData($input);
}
// Transforms the attestations response into a responsive list UI.
// Each attestation is rendered as a ListItem with a repository icon,
// the repository ID, and a button linking to the Sigstore bundle.
function visualizeData(input) {
    var _a;
    const attestations = (_a = input.attestations) !== null && _a !== void 0 ? _a : [];
    // If no attestations, show a friendly markdown message.
    if (attestations.length === 0) {
        return {
            type: "Markdown",
            content: "### No attestations available\nThere are currently no attestations to display.",
        };
    }
    // Map each attestation to a ListItemProps.
    const items = attestations.map((attestation, index) => {
        // Repository ID might be missing—fall back to "Unknown"
        const repoId = typeof attestation.repository_id === "number"
            ? attestation.repository_id.toString()
            : "Unknown";
        // Button to view the Sigstore bundle, if URL is provided.
        const bundleUrl = attestation.bundle_url;
        const viewButton = bundleUrl
            ? {
                type: "Button",
                href: bundleUrl,
                variant: "text",
                color: "blue",
                size: "small",
                // prepend an external-link icon to the label
                startElement: {
                    type: "Icon",
                    id: "external-link-alt",
                    color: "blue",
                    size: 16,
                },
                label: "View Bundle",
            }
            : undefined;
        return {
            type: "ListItem",
            // Display the repository ID in the title
            title: `Repository #${repoId}`,
            // Use a database icon as the leading element
            startElement: {
                type: "Icon",
                id: "database",
                color: "indigo",
                size: 24,
            },
            // If a bundle URL exists, show it as the description
            description: bundleUrl !== null && bundleUrl !== void 0 ? bundleUrl : undefined,
            // If we have a view button, attach it on the right
            endElement: viewButton,
            // For accessibility or testing, add a unique key via href or index
            href: bundleUrl !== null && bundleUrl !== void 0 ? bundleUrl : undefined,
        };
    });
    // Return a responsive List component with all items
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=623.js.map