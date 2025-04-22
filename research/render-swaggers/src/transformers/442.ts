import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsDependabotSecrets {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            secrets: Schema.organization_dependabot_secret[];
        };
    }
    /**
     * Secrets for GitHub Dependabot for an organization.
     *
     * @title Dependabot Secret for an Organization
    */
    export type organization_dependabot_secret = {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * Visibility of a secret
        */
        visibility: "all" | "private" | "selected";
        selected_repositories_url?: string & tags.Format<"uri">;
    };
}
type IAutoViewTransformerInputType = Schema.IApiOrgsDependabotSecrets.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no secrets, show a friendly markdown message
  if (!input.secrets || input.secrets.length === 0) {
    return {
      type: "Markdown",
      content: "## No Dependabot secrets found for this organization."
    };
  }

  // Map visibility to chip color for quick visual distinction
  const visibilityColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    all: "green",
    private: "red",
    selected: "orange"
  };

  // Build a list item for each secret
  const listItems: IAutoView.IAutoViewListItemProps[] = input.secrets.map(secret => {
    // Format dates to a more human‑readable form
    const createdDate = new Date(secret.created_at).toLocaleDateString();
    const updatedDate = new Date(secret.updated_at).toLocaleDateString();

    // An icon to indicate this is a secret (lock icon)
    const lockIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "lock",
      color: "teal",
      size: 20
    };

    // A chip to indicate visibility status
    const visibilityChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: secret.visibility,
      color: visibilityColorMap[secret.visibility] || "gray",
      size: "small",
      variant: "outlined"
    };

    // Compose the list item
    const item: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title: secret.name,
      // Show created and updated dates in the description
      description: `Created: ${createdDate} • Updated: ${updatedDate}`,
      startElement: lockIcon,
      endElement: visibilityChip,
      // If the secret has a URL for selected repos, attach it
      ...(secret.selected_repositories_url
        ? { href: secret.selected_repositories_url }
        : {})
    };

    return item;
  });

  // Return a responsive list of secrets
  return {
    type: "List",
    childrenProps: listItems
  };
}
