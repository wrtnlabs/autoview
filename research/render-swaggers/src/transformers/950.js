export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to format ISO date strings into user-friendly locale
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "Never";
    // Helper to create a Chip component for boolean flags
    const booleanChip = (label, flag) => ({
        type: "Chip",
        label,
        color: flag ? "green" : "gray",
        variant: "filled",
        size: "small",
    });
    // Build the list of capability chips
    const capabilityChips = [
        booleanChip("Sign", input.can_sign),
        booleanChip("Encrypt Comms", input.can_encrypt_comms),
        booleanChip("Encrypt Storage", input.can_encrypt_storage),
        booleanChip("Certify", input.can_certify),
    ];
    // Build DataListItems for key metadata
    const metadataItems = [];
    // Created at
    metadataItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At" },
        value: { type: "Text", content: formatDate(input.created_at) },
    });
    // Expires at
    metadataItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Expires At" },
        value: { type: "Text", content: formatDate(input.expires_at) },
    });
    // Revoked
    metadataItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Revoked" },
        value: booleanChip(input.revoked ? "Yes" : "No", !input.revoked),
    });
    // Capabilities
    metadataItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Capabilities" },
        value: {
            type: "ChipGroup",
            childrenProps: capabilityChips,
        },
    });
    // Subkeys count
    metadataItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Subkeys" },
        value: { type: "Text", content: `${input.subkeys.length}` },
    });
    // Build DataList for emails with verification icons
    const emailItems = input.emails.map((e, idx) => {
        var _a;
        return ({
            type: "DataListItem",
            // show email text
            label: { type: "Text", content: (_a = e.email) !== null && _a !== void 0 ? _a : "—" },
            // show a check or times icon based on verification
            value: {
                type: "Icon",
                id: e.verified ? "check" : "times",
                color: e.verified ? "green" : "gray",
            },
        });
    });
    // Combine metadata and emails into one DataList
    const allDataList = {
        type: "DataList",
        childrenProps: [
            ...metadataItems,
            {
                type: "DataListItem",
                label: { type: "Text", content: `Emails (${emailItems.length})` },
                value: {
                    type: "DataList",
                    childrenProps: emailItems,
                },
            },
        ],
    };
    // CardHeader with key icon and basic info
    const header = {
        type: "CardHeader",
        title: (_a = input.name) !== null && _a !== void 0 ? _a : "GPG Key",
        description: `Key ID: ${input.key_id}`,
        startElement: {
            type: "Icon",
            id: "key",
            color: "teal",
            size: 32,
        },
    };
    // CardContent wraps the combined DataList
    const content = {
        type: "CardContent",
        childrenProps: allDataList,
    };
    // Return a vertical card that stacks header and content responsively
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=950.js.map