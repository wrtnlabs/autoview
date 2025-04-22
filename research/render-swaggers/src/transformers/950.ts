import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A unique encryption key
     *
     * @title GPG Key
    */
    export type gpg_key = {
        id: number & tags.Type<"int32">;
        name?: string | null;
        primary_key_id: (number & tags.Type<"int32">) | null;
        key_id: string;
        public_key: string;
        emails: {
            email?: string;
            verified?: boolean;
        }[];
        subkeys: {
            id?: number & tags.Type<"int32">;
            primary_key_id?: number & tags.Type<"int32">;
            key_id?: string;
            public_key?: string;
            emails?: {
                email?: string;
                verified?: boolean;
            }[];
            subkeys?: any[];
            can_sign?: boolean;
            can_encrypt_comms?: boolean;
            can_encrypt_storage?: boolean;
            can_certify?: boolean;
            created_at?: string;
            expires_at?: string | null;
            raw_key?: string | null;
            revoked?: boolean;
        }[];
        can_sign: boolean;
        can_encrypt_comms: boolean;
        can_encrypt_storage: boolean;
        can_certify: boolean;
        created_at: string & tags.Format<"date-time">;
        expires_at: (string & tags.Format<"date-time">) | null;
        revoked: boolean;
        raw_key: string | null;
    };
}
type IAutoViewTransformerInputType = Schema.gpg_key;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to format ISO date strings into user-friendly locale
    const formatDate = (iso: string | null): string =>
        iso ? new Date(iso).toLocaleString() : "Never";

    // Helper to create a Chip component for boolean flags
    const booleanChip = (label: string, flag: boolean): IAutoView.IAutoViewChipProps => ({
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
    const metadataItems: IAutoView.IAutoViewDataListItemProps[] = [];

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
    const emailItems: IAutoView.IAutoViewDataListItemProps[] = input.emails.map((e, idx) => ({
        type: "DataListItem",
        // show email text
        label: { type: "Text", content: e.email ?? "—" },
        // show a check or times icon based on verification
        value: {
            type: "Icon",
            id: e.verified ? "check" : "times",
            color: e.verified ? "green" : "gray",
        },
    }));

    // Combine metadata and emails into one DataList
    const allDataList: IAutoView.IAutoViewDataListProps = {
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
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name ?? "GPG Key",
        description: `Key ID: ${input.key_id}`,
        startElement: {
            type: "Icon",
            id: "key",
            color: "teal",
            size: 32,
        },
    };

    // CardContent wraps the combined DataList
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: allDataList,
    };

    // Return a vertical card that stacks header and content responsively
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}
