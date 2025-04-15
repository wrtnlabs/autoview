import type * as IAutoView from "@autoview/interface";
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
type IShoppingSection = {
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
type IAutoViewTransformerInputType = IShoppingSection;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // In this transformation we will use a VerticalCard component to visually display the details
  // of the shopping section. We are using a CardHeader to highlight the section name and code,
  // and a CardContent with a Markdown component to present additional details (i.e. id and creation date)
  // More visual elements (like icons) are added to improve the UI engagement.

  // Create an icon to be used in the CardHeader's startElement.
  // Here we choose a common icon (e.g., "layers") to represent a section.
  const headerIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "layers", // icon name in kebab-case; adjust if your icon library differs
    color: "blue", // choose a color that fits your theme
    size: 20,      // size in the allowed values; 20 is acceptable as per the type definition
  };

  // Construct the CardHeader component.
  // We use the section name as the title, and include the section code in the description.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Section Code: ${input.code}`,
    startElement: headerIcon,
  };

  // Create a Markdown component to display additional information.
  // We format the text with Markdown syntax to show a more engaging presentation.
  const markdownContent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: `### Section Details

- **ID:** ${input.id}
- **Created At:** ${input.created_at}

Please refer to the section information above for further details.`,
  };

  // Build the CardContent component where we embed the markdown content.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps accepts either a single component or an array; here we pass the markdown directly.
    childrenProps: markdownContent,
  };

  // Compose the final VerticalCard component containing our header and content.
  // VerticalCard is chosen as it supports a flexible layout suitable for both desktop and mobile views.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // childrenProps accepts an array of card parts; we include the header and content.
    childrenProps: [cardHeader, cardContent],
  };

  // Return the composed value that complies with IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
