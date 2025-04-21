import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Actions OIDC Subject customization
     *
     * @title Actions OIDC Subject customization
    */
    export type oidc_custom_sub = {
        /**
         * Array of unique strings. Each claim key can only contain alphanumeric characters and underscores.
        */
        include_claim_keys: string[];
    };
}
type IAutoViewTransformerInputType = Schema.oidc_custom_sub;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create a header for our card with an icon and title
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Included Claim Keys",
    description: `Total: ${input.include_claim_keys.length}`,
    // Use a key icon to visually represent "claim keys"
    startElement: {
      type: "Icon",
      id: "key",
      color: "cyan",
      size: 20,
    },
  };

  // Build chip components for each claim key
  const chips: IAutoView.IAutoViewChipProps[] = input.include_claim_keys.map((key) => ({
    type: "Chip",
    label: key,
    variant: "outlined",
    color: "primary",
    size: "small",
  }));

  // If there are no keys, fall back to a markdown message
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps = 
    chips.length > 0
      // Group chips visually; on small screens they will wrap
      ? {
          type: "ChipGroup",
          childrenProps: chips,
        }
      // Show markdown when empty to make the message more engaging
      : {
          type: "Markdown",
          content: "**No claim keys have been included.**",
        };

  // Wrap everything in a vertical card for a clean, responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        childrenProps: contentChildren,
      },
    ],
  };

  return card;
}
