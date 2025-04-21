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
  // Helper to create a simple text component
  const makeText = (content: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content,
  });

  // Card header: show key name or key_id, creation date, and an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name ?? input.key_id,
    description: `Created: ${new Date(input.created_at).toLocaleDateString()}`,
    // key icon in header
    startElement: {
      type: "Icon",
      id: "key",      // FontAwesome key icon
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
  const emailItems: IAutoView.IAutoViewDataListItemProps[] = 
    input.emails.length > 0
      ? input.emails.map((e) => ({
          type: "DataListItem",
          // label is the email address
          label: makeText(e.email ?? "—"),
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
        }))
      : [
          {
            type: "DataListItem",
            label: makeText("No email addresses on record"),
          },
        ];

  const emailList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: emailItems,
  };

  // Build a DataList of subkeys
  const subkeyItems: IAutoView.IAutoViewDataListItemProps[] =
    input.subkeys.length > 0
      ? input.subkeys.map((sk) => ({
          type: "DataListItem",
          label: makeText(sk.key_id ?? "Unknown"),
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
        }))
      : [
          {
            type: "DataListItem",
            label: makeText("No subkeys"),
          },
        ];

  const subkeyList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: subkeyItems,
  };

  // Footer stats chips for top-level capabilities
  const statsChips: IAutoView.IAutoViewChipProps[] = [
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

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "ChipGroup",
      childrenProps: statsChips,
    },
  };

  // Compose the vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
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
