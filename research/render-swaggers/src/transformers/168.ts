import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Section information.
     *
     * `IShoppingSection` is a concept that refers to the spatial information of
     * the market.
     *
     * If we compare the section mentioned here to the offline market, it means a
     * spatially separated area within the store, such as the "fruit corner" or
     * "butcher corner". Therefore, in the {@link IShoppingSale sale} entity, it is
     * not possible to classify multiple sections simultaneously, but only one section
     * can be classified.
     *
     * By the way, if your shopping mall system requires only one section, then just
     * use only one. This concept is designed to be expandable in the future.
    */
    export type IShoppingSection = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Identifier code.
         *
         * @title Identifier code
        */
        code: string;
        /**
         * Representative name of the section.
         *
         * @title Representative name of the section
        */
        name: string;
        /**
         * Creation time of record.
         *
         * @title Creation time of record
        */
        created_at: string;
    };
}
type IAutoViewTransformerInputType = Schema.IShoppingSection;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Format the creation timestamp into a human‐readable date.
  // If parsing fails, fall back to the raw string.
  const createdDate = new Date(input.created_at);
  const createdLabel = isNaN(createdDate.getTime())
    ? input.created_at
    : createdDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  return {
    // Use a vertical card to present the section in a compact, responsive layout
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with a section icon, the name as title, and the code in the description
        type: "CardHeader",
        title: input.name,
        description: `Section Code: ${input.code}`,
        startElement: {
          type: "Icon",
          id: "layer-group",   // FontAwesome icon name; represents a grouped section
          size: 24,
          color: "blue",
        },
      },
      {
        // Card content displaying the ID and creation date as visual chips
        type: "CardContent",
        childrenProps: [
          {
            type: "Chip",
            label: `ID: ${input.id}`,
            variant: "outlined",
            size: "small",
            color: "secondary",
          },
          {
            type: "Chip",
            label: createdLabel,
            variant: "filled",
            size: "small",
            color: "info",
          },
        ],
      },
    ],
  };
}
