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
type IAutoViewTransformerInputType = Schema.gpg_key[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, render a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "## No GPG Keys Found\n\nThere are no GPG keys to display."
    };
  }

  // Map each gpg_key to a ListItem component
  const items: IAutoView.IAutoViewListItemProps[] = input.map((key) => {
    // Format the created date for human readability
    let createdLabel: string;
    try {
      createdLabel = new Date(key.created_at).toLocaleDateString();
    } catch {
      createdLabel = key.created_at; // fallback to raw string if parsing fails
    }

    // Build a description: show the optional name and the creation date
    const descriptionParts: string[] = [];
    if (key.name) descriptionParts.push(key.name);
    descriptionParts.push(`Created: ${createdLabel}`);
    const description = descriptionParts.join(" | ");

    // Icon at the start to visually represent GPG key
    const startIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "key",         // FontAwesome icon name
      color: "blue",
      size: 24
    };

    // Chips at the end to show counts of emails and subkeys
    const emailChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${key.emails.length} email${key.emails.length !== 1 ? "s" : ""}`,
      variant: "outlined",
      color: "teal",
      startElement: {
        type: "Icon",
        id: "envelope",
        color: "gray",
        size: 16
      }
    };

    const subkeyChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${key.subkeys.length} subkey${key.subkeys.length !== 1 ? "s" : ""}`,
      variant: "outlined",
      color: "green",
      startElement: {
        type: "Icon",
        id: "code-branch",
        color: "gray",
        size: 16
      }
    };

    return {
      type: "ListItem",
      title: key.key_id,
      description,
      startElement: startIcon,
      // You can pass a single component or an array of components here
      endElement: [emailChip, subkeyChip]
    };
  });

  // Compose the overall List component
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: items
  };

  return list;
}
