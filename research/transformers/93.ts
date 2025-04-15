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
  // We choose to represent the input data as a responsive vertical card.
  // The card header displays the section name and code with an icon,
  // and the card content uses a markdown component to list detailed information.

  // Create a header component with an icon.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name, // Display the representative name
    description: `Section Code: ${input.code}`, // Provide a short description using the section code
    // Using an icon to visually represent the section.
    startElement: {
      type: "Icon",
      id: "folder", // A conventional icon to represent a section or folder
      color: "blue",
      size: 24
    }
  };

  // Prepare a markdown component to display additional details.
  // Markdown is used to enhance text representation visually.
  const markdownContent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    // We include key details and format them using markdown to support responsiveness and readability.
    content: `
**Section Details**

- **ID**: ${input.id}
- **Code**: ${input.code}
- **Created At**: ${new Date(input.created_at).toLocaleString()}

    `.trim()
  };

  // Create the card content component that embeds the markdown display
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownContent
  };

  // Assemble everything into a vertical card component.
  // VerticalCard is chosen for its flexibility on both desktop and mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the aggregated component props that the UI will render.
  return verticalCard;
}
