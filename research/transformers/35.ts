import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * A page.
 *
 * Collection of records with pagination indformation.
*/
type IPageIShoppingSection = {
    /**
     * Page information.
     *
     * @title Page information
    */
    pagination: IPage.IPagination;
    /**
     * List of records.
     *
     * @title List of records
    */
    data: IShoppingSection[];
};
namespace IPage {
    /**
     * Page information.
    */
    export type IPagination = {
        /**
         * Current page number.
         *
         * @title Current page number
        */
        current: number & tags.Type<"int32">;
        /**
         * Limitation of records per a page.
         *
         * @title Limitation of records per a page
        */
        limit: number & tags.Type<"int32">;
        /**
         * Total records in the database.
         *
         * @title Total records in the database
        */
        records: number & tags.Type<"int32">;
        /**
         * Total pages.
         *
         * Equal to {@link records} / {@link limit} with ceiling.
         *
         * @title Total pages
        */
        pages: number & tags.Type<"int32">;
    };
}
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
type IAutoViewTransformerInputType = IPageIShoppingSection;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /* 
   This transformation function converts the shopping sections data into a set
   of UI components that emphasize visual elements. We wrap the information in a
   vertical card that contains a header with an icon and summary info, a body (content)
   that displays a list of sections, and a footer that shows pagination details.
  */

  // Create the card header with an icon and descriptive text.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Shopping Sections",
    description: `Total sections: ${input.data.length}`,
    // Using an icon as the start element. The icon id "shopping-cart" is expected
    // to exist in the icon library.
    startElement: {
      type: "Icon",
      id: "shopping-cart",
      color: "blue",
      size: 24
    }
  };

  // Map each shopping section record to a DataList item.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.data.map(section => {
    /* 
      For each section, the label contains both an icon and a markdown-formatted title.
      The value is represented as markdown that shows the creation date.
      We use Markdown components to display formatted text.
    */
    return {
      type: "DataListItem",
      label: [
        {
          type: "Icon",
          id: "store", // Using a store icon for the section.
          color: "teal",
          size: 16
        },
        {
          type: "Markdown",
          content: `**${section.name}**\n\n_Code:_ \`${section.code}\``
        }
      ],
      value: {
        type: "Markdown",
        content: `Created at: ${section.created_at}`
      }
    };
  });

  // Handle edge case: no available section records.
  // When there is no data, we display a friendly message.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems.length > 0 ? listItems : [{
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: `**No sections found**`
      },
      value: {
        type: "Markdown",
        content: `There are currently no shopping sections available.`
      }
    }]
  };

  // Embed the DataList inside the card content.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Using the data list as the single child component.
    childrenProps: dataList
  };

  // Create the card footer to display pagination information.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Markdown",
      // Use markdown to format the pagination info so it is more visually appealing.
      content: `**Page** ${input.pagination.current} **of** ${input.pagination.pages} (Total records: ${input.pagination.records})`
    }
  };

  // Compose the final vertical card. This component will aggregate the header, content, and footer.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
      cardFooter
    ]
  };

  // Return the final transformed component
  return verticalCard;
}
