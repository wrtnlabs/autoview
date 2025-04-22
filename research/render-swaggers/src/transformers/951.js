export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to create a simple text component
    const makeText = (content) => ({
        type: "Text",
        content,
    });
    // Card header: show key name or key_id, creation date, and an icon
    const header = {
        type: "CardHeader",
        title: (_a = input.name) !== null && _a !== void 0 ? _a : input.key_id,
        description: `Created: ${new Date(input.created_at).toLocaleDateString()}`,
        // key icon in header
        startElement: {
            type: "Icon",
            id: "key", // FontAwesome key icon
            color: "blue",
            size: 24,
        },
        // display number of subkeys if any
        endElement: {
            type: "Chip",
            label: `Subkeys: ${input.subkeys.length}`,
            color: input.subkeys.length > 0 ? "success" : "gray",
            variant: "outlined",
        },
    };
    // Build a DataList of emails
    const emailItems = input.emails.length > 0
        ? input.emails.map((e) => {
            var _a;
            return ({
                type: "DataListItem",
                // label is the email address
                label: makeText((_a = e.email) !== null && _a !== void 0 ? _a : "—"),
                // value is a chip indicating verification status
                value: {
                    type: "Chip",
                    label: e.verified ? "Verified" : "Unverified",
                    color: e.verified ? "success" : "error",
                    variant: "filled",
                    startElement: {
                        type: "Icon",
                        id: e.verified ? "check-circle" : "times-circle",
                        color: e.verified ? "green" : "red",
                        size: 16,
                    },
                },
            });
        })
        : [
            {
                type: "DataListItem",
                label: makeText("No email addresses on record"),
            },
        ];
    const emailList = {
        type: "DataList",
        childrenProps: emailItems,
    };
    // Build a DataList of subkeys
    const subkeyItems = input.subkeys.length > 0
        ? input.subkeys.map((sk) => {
            var _a;
            return ({
                type: "DataListItem",
                label: makeText((_a = sk.key_id) !== null && _a !== void 0 ? _a : "Unknown"),
                // value: quick summary icon set
                value: {
                    type: "ChipGroup",
                    childrenProps: [
                        {
                            type: "Chip",
                            label: sk.can_sign ? "Sign" : "No-Sign",
                            color: sk.can_sign ? "success" : "gray",
                            size: "small",
                            startElement: {
                                type: "Icon",
                                id: sk.can_sign ? "pen" : "ban",
                                color: sk.can_sign ? "green" : "gray",
                                size: 12,
                            },
                        },
                        {
                            type: "Chip",
                            label: sk.can_encrypt_comms ? "Enc-Comms" : "No-Enc",
                            color: sk.can_encrypt_comms ? "success" : "gray",
                            size: "small",
                            startElement: {
                                type: "Icon",
                                id: sk.can_encrypt_comms ? "lock" : "unlock",
                                color: sk.can_encrypt_comms ? "green" : "gray",
                                size: 12,
                            },
                        },
                    ],
                },
            });
        })
        : [
            {
                type: "DataListItem",
                label: makeText("No subkeys"),
            },
        ];
    const subkeyList = {
        type: "DataList",
        childrenProps: subkeyItems,
    };
    // Footer stats chips for top-level capabilities
    const statsChips = [
        {
            type: "Chip",
            label: "Sign",
            color: input.can_sign ? "success" : "gray",
            startElement: {
                type: "Icon",
                id: input.can_sign ? "pen-fancy" : "ban",
                color: input.can_sign ? "green" : "gray",
                size: 16,
            },
        },
        {
            type: "Chip",
            label: "Encrypt Comms",
            color: input.can_encrypt_comms ? "info" : "gray",
            startElement: {
                type: "Icon",
                id: "comment",
                color: input.can_encrypt_comms ? "blue" : "gray",
                size: 16,
            },
        },
        {
            type: "Chip",
            label: "Encrypt Storage",
            color: input.can_encrypt_storage ? "info" : "gray",
            startElement: {
                type: "Icon",
                id: "database",
                color: input.can_encrypt_storage ? "blue" : "gray",
                size: 16,
            },
        },
        {
            type: "Chip",
            label: "Certify",
            color: input.can_certify ? "success" : "gray",
            startElement: {
                type: "Icon",
                id: input.can_certify ? "certificate" : "ban",
                color: input.can_certify ? "green" : "gray",
                size: 16,
            },
        },
    ];
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "ChipGroup",
            childrenProps: statsChips,
        },
    };
    // Compose the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: [
                    makeText("Email Addresses"),
                    emailList,
                    makeText("Subkeys"),
                    subkeyList,
                ],
            },
            footer,
        ],
    };
    return card;
}
//# sourceMappingURL=951.js.map