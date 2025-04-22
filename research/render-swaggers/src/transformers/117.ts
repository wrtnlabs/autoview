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
  // Parse creation date and format it for display
  const createdDate = new Date(input.created_at);
  const createdAtDisplay = isNaN(createdDate.getTime())
    // If invalid, fall back to raw string
    ? input.created_at
    // Use locale-sensitive representation
    : createdDate.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  // Construct a visual card to present section information
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header: show avatar, name and code, and a chip with the ID
        type: "CardHeader",
        title: input.name,
        description: `Section Code: ${input.code}`,
        // Avatar with the first character of the name, colored teal
        startElement: {
          type: "Avatar",
          name: input.name,
          variant: "teal",
          size: 40,
        },
        // Display the internal ID as a small chip
        endElement: {
          type: "Chip",
          label: input.id,
          variant: "outlined",
          size: "small",
          color: "gray",
        },
      },
      {
        // Content: a markdown block showing the creation timestamp
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: `**Created At:** ${createdAtDisplay}`,
        },
      },
    ],
  };

  return card;
}
