import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiUserCodespacesSecrets {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            secrets: Schema.codespaces_secret[];
        };
    }
    /**
     * Secrets for a GitHub Codespace.
     *
     * @title Codespaces Secret
    */
    export type codespaces_secret = {
        /**
         * The name of the secret
        */
        name: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the secret was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The type of repositories in the organization that the secret is visible to
        */
        visibility: "all" | "private" | "selected";
        /**
         * The API URL at which the list of repositories this secret is visible to can be retrieved
        */
        selected_repositories_url: string;
    };
}
type IAutoViewTransformerInputType = Schema.IApiUserCodespacesSecrets.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map visibility to a corresponding icon and color for better visual cues
  const visibilityIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    all:    { id: "globe", color: "blue" },
    private:{ id: "lock",  color: "red" },
    selected: { id: "users", color: "orange" },
  };

  // Transform each secret into a ListItem with icon, title, description, and Chips for timestamps
  const listItems: IAutoView.IAutoViewListItemProps[] = input.secrets.map(secret => {
    // Choose icon/color based on visibility, fallback to a generic icon
    const vis = secret.visibility;
    const iconSpec = visibilityIconMap[vis] || { id: "question-circle", color: "gray" };

    // Format dates into human-readable local strings
    const createdAt = new Date(secret.created_at).toLocaleString();
    const updatedAt = new Date(secret.updated_at).toLocaleString();

    // Compose two chips: one for created time, one for updated time
    const timestampChips: IAutoView.IAutoViewChipProps[] = [
      {
        type: "Chip",
        label: `Created: ${createdAt}`,
        color: "gray",
        size: "small",
        variant: "filled",
      },
      {
        type: "Chip",
        label: `Updated: ${updatedAt}`,
        color: "gray",
        size: "small",
        variant: "filled",
      },
    ];

    return {
      type: "ListItem",
      // Secret name as the main title
      title: secret.name,
      // Show raw URL of selected repositories as a secondary text
      description: `Repo URL: ${secret.selected_repositories_url}`,
      // Start element: an icon representing visibility
      startElement: {
        type: "Icon",
        id: iconSpec.id,
        color: iconSpec.color,
        size: 20,
      },
      // End elements: chips for timestamps
      endElement: timestampChips,
      // If desired, clicking could open details via href; omitted for now
    };
  });

  // Wrap all items into a responsive List component
  return {
    type: "List",
    childrenProps: listItems,
  };
}
