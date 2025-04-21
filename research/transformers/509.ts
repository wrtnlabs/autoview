import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * List of custom property values for a repository
     *
     * @title Organization Repository Custom Property Values
    */
    export type org_repo_custom_property_values = {
        repository_id: number & tags.Type<"int32">;
        repository_name: string;
        repository_full_name: string;
        /**
         * List of custom property names and associated values
        */
        properties: Schema.custom_property_value[];
    };
    /**
     * Custom property name and associated value
     *
     * @title Custom Property Value
    */
    export type custom_property_value = {
        /**
         * The name of the property
        */
        property_name: string;
        /**
         * The value assigned to the property
        */
        value: string | string[] | null;
    };
}
type IAutoViewTransformerInputType = Schema.org_repo_custom_property_values[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms repository custom property values into an AutoView list with visual chips.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no repository data, show a friendly markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No repositories found.\nPlease check back later or add some repositories."
    };
  }

  // Helper to normalize property values into strings.
  const formatValue = (value: string | string[] | null): string =>
    value === null ? "N/A" : Array.isArray(value) ? value.join(", ") : value;

  // Build a ListItem for each repository.
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map(repo => {
    // For each custom property, create a chip showing "name: value"
    const propertyChips: IAutoView.IAutoViewChipProps[] = repo.properties.map(prop => ({
      type: "Chip",
      label: `${prop.property_name}: ${formatValue(prop.value)}`,
      variant: "outlined",
      size: "small",
      color: "primary"
    }));

    return {
      type: "ListItem",
      // Show the full repository name as the main title
      title: repo.repository_full_name,
      // Show the numeric ID as a secondary description
      description: `ID: ${repo.repository_id}`,
      // Prepend a GitHub icon for visual context
      startElement: {
        type: "Icon",
        id: "github",
        color: "gray",
        size: 24
      },
      // Display all custom properties as chips on the right
      endElement: propertyChips
    };
  });

  // Wrap everything in a responsive list container.
  return {
    type: "List",
    childrenProps: listItems
  };
}
