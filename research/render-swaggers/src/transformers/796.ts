import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An SSH key granting access to a single repository.
     *
     * @title Deploy Key
    */
    export type deploy_key = {
        id: number & tags.Type<"int32">;
        key: string;
        url: string;
        title: string;
        verified: boolean;
        created_at: string;
        read_only: boolean;
        added_by?: string | null;
        last_used?: string | null;
        enabled?: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.deploy_key[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Safely formats an ISO date string into a localized date.
   * Falls back to the raw value on parse failure.
   */
  const formatDate = (iso?: string | null): string | undefined => {
    if (!iso) return undefined;
    const date = new Date(iso);
    return isNaN(date.getTime())
      ? iso
      : date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  // Map each deploy key into a ListItem component
  const items: IAutoView.IAutoViewListItemProps[] = input.map((key) => {
    // Determine chip for verification status
    const verificationChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: key.verified ? "Verified" : "Unverified",
      color: key.verified ? "success" : "error",
      variant: "filled",
      size: "small",
    };

    // Determine chip for read/write status
    const accessChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: key.read_only ? "Read‑Only" : "Read/Write",
      color: key.read_only ? "warning" : "info",
      variant: "outlined",
      size: "small",
    };

    // Assemble description parts
    const created = formatDate(key.created_at);
    const lastUsed = formatDate(key.last_used);
    const enabledText =
      key.enabled === false
        ? "Disabled"
        : key.enabled === true
        ? "Enabled"
        : undefined;
    const addedBy = key.added_by ?? undefined;

    const descriptionParts: string[] = [];
    if (created) descriptionParts.push(`Created: ${created}`);
    if (lastUsed) descriptionParts.push(`Last used: ${lastUsed}`);
    if (enabledText) descriptionParts.push(enabledText);
    if (addedBy) descriptionParts.push(`Added by: ${addedBy}`);

    return {
      type: "ListItem",
      title: key.title,
      description: descriptionParts.join(" | "),
      // Make the title clickable to the URL of the deploy key
      href: key.url,
      // Use a key icon to represent the SSH key visually
      startElement: {
        type: "Icon",
        id: "key",
        color: "gray",
        size: 24,
      },
      // Show verification and access chips on the right
      endElement: [verificationChip, accessChip],
    };
  });

  // Return a responsive list component containing all items
  return {
    type: "List",
    // Stick header to top on mobile for usability
    childrenProps: items,
  };
}
