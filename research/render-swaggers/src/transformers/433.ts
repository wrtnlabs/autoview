import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsCodespacesSecrets {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            secrets: Schema.codespaces_org_secret[];
        };
    }
    /**
     * Secrets for a GitHub Codespace.
     *
     * @title Codespaces Secret
    */
    export type codespaces_org_secret = {
        /**
         * The name of the secret
        */
        name: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The type of repositories in the organization that the secret is visible to
        */
        visibility: "all" | "private" | "selected";
        /**
         * The API URL at which the list of repositories this secret is visible to can be retrieved
        */
        selected_repositories_url?: string;
    };
}
type IAutoViewTransformerInputType = Schema.IApiOrgsCodespacesSecrets.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no secrets, display a friendly markdown message.
  if (!input.secrets || input.secrets.length === 0) {
    return {
      type: "Markdown",
      content: "### No secrets found"
    };
  }

  // Map visibility levels to chip colors.
  const getVisibilityColor = (
    vis: Schema.codespaces_org_secret["visibility"]
  ): IAutoView.IAutoViewChipProps["color"] => {
    switch (vis) {
      case "all":
        return "success";
      case "private":
        return "error";
      case "selected":
        return "info";
      default:
        return "gray";
    }
  };

  // Build a sticky subheader that shows the total number of secrets.
  const subheader: IAutoView.IAutoViewListSubheaderProps = {
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: [
      {
        type: "Text",
        variant: "h5",
        content: `${input.total_count} secret${input.total_count === 1 ? "" : "s"}`
      }
    ]
  };

  // Transform each secret into a ListItem with visual cues.
  const listItems: IAutoView.IAutoViewListItemProps[] = input.secrets.map(
    (secret) => {
      // A colored chip indicating visibility scope.
      const visibilityChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: secret.visibility,
        color: getVisibilityColor(secret.visibility),
        variant: "filled",
        size: "small"
      };

      // An icon to hint at the existence of a repository link (if any).
      const repoIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "link",
        color: secret.selected_repositories_url ? "blue" : "gray",
        size: 16
      };

      // Format ISO timestamps into user‐friendly strings.
      const createdAt = new Date(secret.created_at).toLocaleString();
      const updatedAt = new Date(secret.updated_at).toLocaleString();

      return {
        type: "ListItem",
        title: secret.name,
        // Show both timestamps in a concise, inline description.
        description: `Created: ${createdAt}, Updated: ${updatedAt}`,
        startElement: {
          type: "Icon",
          id: "lock",
          color: "gray",
          size: 24
        },
        endElement: [visibilityChip, repoIcon]
      };
    }
  );

  // Return the composed List component.
  return {
    type: "List",
    childrenProps: [subheader, ...listItems]
  };
}
