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
  // Attempt to parse the creation date; fallback to raw string if invalid
  const parsedDate = new Date(input.created_at);
  const createdAtDisplay = isNaN(parsedDate.getTime())
    ? input.created_at
    : parsedDate.toLocaleString();

  // Header: shows the section name and code with a store icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Code: ${input.code}`,
    startElement: {
      type: "Icon",
      id: "store",       // FontAwesome "store" icon
      color: "blue",
      size: 24
    }
  };

  // Content: a markdown block highlighting the creation time
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: `**Created At:** ${createdAtDisplay}`
    }
  };

  // Footer: a primary button linking to a detail page for the section
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View Details",
      variant: "contained",
      color: "primary",
      href: `/sections/${encodeURIComponent(input.id)}`
    }
  };

  // Assemble into a vertical card for responsive display
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };
}
