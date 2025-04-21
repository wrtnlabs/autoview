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
  // Format the creation date; fallback to raw string if invalid
  const createdDate = new Date(input.created_at);
  const formattedCreatedAt = isNaN(createdDate.getTime())
    ? input.created_at
    : createdDate.toLocaleString();

  // Card header with an icon to represent a shopping section
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Code: ${input.code}`,
    startElement: {
      type: "Icon",
      id: "store",
      color: "teal",
      size: 24,
    },
  };

  // Detail list of fields: ID and Created At
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Identifier (ID)",
          variant: "subtitle2",
        },
        value: {
          type: "Text",
          content: input.id,
          variant: "body1",
        },
      },
      {
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Created At",
          variant: "subtitle2",
        },
        value: {
          type: "Text",
          content: formattedCreatedAt,
          variant: "body1",
        },
      },
    ],
  };

  // Wrap the list inside card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Single component is acceptable, or you may provide an array
    childrenProps: dataList,
  };

  // Footer chip to highlight the section ID in a compact form
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Chip",
      label: input.id,
      color: "info",
      size: "small",
      variant: "outlined",
    },
  };

  // Compose the vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
