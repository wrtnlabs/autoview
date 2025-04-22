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
  // If there are no keys, show a friendly message
  if (!input || input.length === 0) {
    return {
      type: "Text",
      variant: "subtitle1",
      content: "No GPG keys available.",
    } as IAutoView.IAutoViewTextProps;
  }

  // Map each GPG key to a VerticalCardProps
  const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((key) => {
    // Card header with key name, key ID, and an icon
    const header: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: key.name ?? "Unnamed Key",
      description: key.key_id,
      startElement: {
        type: "Icon",
        id: "key",
        color: "blue",
        size: 24,
      },
    };

    // Build a list of chips for each positive capability
    const capabilityChips: IAutoView.IAutoViewChipProps[] = [];
    if (key.can_sign) {
      capabilityChips.push({
        type: "Chip",
        label: "Sign",
        variant: "outlined",
        color: "success",
        size: "small",
        startElement: {
          type: "Icon",
          id: "pen",
          color: "green",
          size: 16,
        },
      });
    }
    if (key.can_encrypt_comms) {
      capabilityChips.push({
        type: "Chip",
        label: "Encrypt Comm",
        variant: "outlined",
        color: "success",
        size: "small",
        startElement: {
          type: "Icon",
          id: "envelope",
          color: "teal",
          size: 16,
        },
      });
    }
    if (key.can_encrypt_storage) {
      capabilityChips.push({
        type: "Chip",
        label: "Encrypt Storage",
        variant: "outlined",
        color: "success",
        size: "small",
        startElement: {
          type: "Icon",
          id: "lock",
          color: "cyan",
          size: 16,
        },
      });
    }
    if (key.can_certify) {
      capabilityChips.push({
        type: "Chip",
        label: "Certify",
        variant: "outlined",
        color: "success",
        size: "small",
        startElement: {
          type: "Icon",
          id: "check-circle",
          color: "green",
          size: 16,
        },
      });
    }

    // Markdown summary of creation, expiration, and revocation
    const mdLines: string[] = [
      `**Created:** ${new Date(key.created_at).toLocaleDateString()}`,
      `**Expires:** ${key.expires_at ? new Date(key.expires_at).toLocaleDateString() : "N/A"}`,
      `**Revoked:** ${key.revoked ? "Yes" : "No"}`,
    ];
    const summary: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: mdLines.join("\n\n"),
    };

    const content: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      // Show capability chips first, then the markdown summary
      childrenProps: [...capabilityChips, summary],
    };

    // Build a DataList of associated emails and their verification status
    const emailItems: IAutoView.IAutoViewDataListItemProps[] = key.emails.map((e) => ({
      type: "DataListItem",
      label: {
        type: "Text",
        content: e.email ?? "Unknown Email",
      },
      value: {
        type: "Icon",
        id: e.verified ? "check" : "times",
        color: e.verified ? "green" : "red",
        size: 16,
      },
    }));
    const emailList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: emailItems,
    };

    const footer: IAutoView.IAutoViewCardFooterProps = {
      type: "CardFooter",
      childrenProps: emailList,
    };

    // Assemble the vertical card
    return {
      type: "VerticalCard",
      childrenProps: [header, content, footer],
    };
  });

  // Wrap all cards in a carousel for responsive display
  return {
    type: "Carousel",
    navControls: true,
    indicators: true,
    infinite: false,
    childrenProps: cards,
  } as IAutoView.IAutoViewCarouselProps;
}
