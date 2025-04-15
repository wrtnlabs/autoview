import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * A page.
 *
 * Collection of records with pagination indformation.
*/
type IPageIShoppingChannel = {
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
    data: IShoppingChannel[];
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
 * Channel information.
 *
 * `IShoppingChannel` is a concept that shapes the distribution channel in the
 * market. Therefore, the difference in the channel in this e-commerce system
 * means that it is another site or application.
 *
 * By the way, if your shopping mall system requires only one channel, then
 * just use only one. This concept is designed to be expandable in the future.
*/
type IShoppingChannel = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
    */
    created_at: string;
    /**
     * Identifier code.
     *
     * @title Identifier code
    */
    code: string;
    /**
     * Name of the channel.
     *
     * @title Name of the channel
    */
    name: string;
};
type IAutoViewTransformerInputType = IPageIShoppingChannel;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// The visualizeData function transforms the IAutoViewTransformerInputType (which includes pagination and a list of channels)
// into a UI component of type IAutoView.IAutoViewComponentProps. In this example, we build a DataList where each item represents
// one shopping channel. For each channel we create a DataListItem that contains a CardHeader (with an Avatar icon and the channel name)
// and a Markdown component that displays additional details in a formatted manner. 
//
// We handle the edge case where the channel list is empty by returning a Markdown component with an appropriate message.
// This implementation avoids hard-coded mock data and uses only the properties provided by the input.

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Check if there is valid data; if not, return a graceful message using a Markdown component.
  if (!input.data || input.data.length === 0) {
    return {
      type: "Markdown",
      content: "### No channels available\nThere are currently no shopping channels to display."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Map each IShoppingChannel into a DataListItem component
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.data.map((channel) => {
    // Compose a CardHeader with an Avatar as a visual element.
    // The Avatar uses the channel name to create a visual cue.
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: channel.name,
      description: `Channel information`,
      startElement: {
        type: "Avatar",
        name: channel.name,
        // Select a size that is visually impactful yet responsive.
        size: 40,
        // Set a variant color that can be customized; "primary" is used here.
        variant: "primary"
      }
    };

    // Compose a Markdown component to display additional channel details.
    // Using markdown formatting makes the text richer and more engaging.
    const detailsMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**Code:** ${channel.code}\n\n**Created At:** ${channel.created_at}\n\n**ID:** ${channel.id}`
    };

    // Combine the CardHeader and the Markdown details into an array.
    // This array is passed as the label to the DataListItem.
    return {
      type: "DataListItem",
      label: [cardHeader, detailsMarkdown]
    } as IAutoView.IAutoViewDataListItemProps;
  });

  // Compose the DataList component with the list of DataListItems.
  // The DataList component is effective for displaying lists in responsive layouts.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Return the aggregated UI component.
  return dataList;
}
