import type * as IAutoView from "@autoview/interface";
namespace IShoppingDeliveryPiece {
    /**
     * Creation information of the delivery piece.
    */
    export type ICreate = {
        /**
         * Target order's {@link IShoppingOrderPublish.id}.
         *
         * @title Target order's {@link IShoppingOrderPublish.id}
        */
        publish_id: string;
        /**
         * Target good's {@link IShoppingOrderGood.id}.
         *
         * @title Target good's {@link IShoppingOrderGood.id}
        */
        good_id: string;
        /**
         * Target stock's {@link IShoppingSaleUnitStock.id}.
         *
         * @title Target stock's {@link IShoppingSaleUnitStock.id}
        */
        stock_id: string;
        /**
         * Quantity of the stock.
         *
         * It can be precision value to express split shipping.
         *
         * @title Quantity of the stock
        */
        quantity: number;
    };
}
type IAutoViewTransformerInputType = IShoppingDeliveryPiece.ICreate[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IShoppingDeliveryPiece.ICreate[]): IAutoView.IAutoViewComponentProps {
  // We will create a vertical card that summarizes the delivery pieces.
  // The card contains a header with an icon and a content section that displays 
  // delivery details in a data list. Each delivery piece is represented as a list item 
  // with markdown components for a rich visual display.

  // Create the list items by mapping the input array elements to IAutoViewDataListItemProps objects.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.length > 0 ? input.map((item, index) => {
    // For each item, we create a markdown content summarizing the details.
    // We use markdown to list properties like publish ID, good ID, stock ID, and quantity.
    const markdownContent = `**Publish ID:** ${item.publish_id}  
**Good ID:** ${item.good_id}  
**Stock ID:** ${item.stock_id}  
**Quantity:** ${item.quantity}`;
    
    return {
      type: "DataListItem",
      // Use a markdown component for the label that can serve as a header for the delivery item.
      label: {
        type: "Markdown",
        content: `### Delivery Piece ${index + 1}`
      },
      // Use a markdown component for the value to display details in bullet-like format.
      value: {
        type: "Markdown",
        content: markdownContent
      }
    };
  }) : [
    // In case there is no delivery piece, show a placeholder DataListItem with a message.
    {
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: `### No Delivery Data`
      },
      value: {
        type: "Markdown",
        content: "No delivery pieces were provided."
      }
    }
  ];

  // Compose the central DataList component to house the list items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };

  // Create the CardContent component with the DataList as its child.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Create the CardHeader component to provide a title and description.
  // The startElement uses an icon (truck) that visually represents deliveries.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Delivery Pieces Overview",
    description: "A summary of your delivery pieces rendered in an engaging visual format.",
    startElement: {
      id: "truck", // using a truck icon to denote deliveries; ensure the icon is available in your icon library.
      type: "Icon",
      size: 24,
      color: "blue"
    }
  };

  // Compose the final vertical card which organizes header and content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the composed vertical card which is of type IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
