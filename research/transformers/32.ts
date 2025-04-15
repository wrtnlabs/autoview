import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IPageIShoppingChannel {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IHierarchical = {
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
        data: IShoppingChannel.IHierarchical[];
    };
}
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
namespace IShoppingChannel {
    /**
     * Hierarchical channel information with children categories.
    */
    export type IHierarchical = {
        /**
         * Children categories with hierarchical structure.
         *
         * @title Children categories with hierarchical structure
        */
        categories: IShoppingChannelCategory.IHierarchical[];
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
}
namespace IShoppingChannelCategory {
    /**
     * Hierarchical category information with children categories.
    */
    export type IHierarchical = {
        /**
         * List of children categories with hierarchical structure.
         *
         * @title List of children categories with hierarchical structure
        */
        children: IShoppingChannelCategory.IHierarchical[];
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Identifier code of the category.
         *
         * The code must be unique in the channel.
         *
         * @title Identifier code of the category
        */
        code: string;
        /**
         * Parent category's ID.
         *
         * @title Parent category's ID
        */
        parent_id: null | (string & tags.Format<"uuid">);
        /**
         * Representative name of the category.
         *
         * The name must be unique within the parent category. If no parent exists,
         * then the name must be unique within the channel between no parent
         * categories.
         *
         * @title Representative name of the category
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
type IAutoViewTransformerInputType = IPageIShoppingChannel.IHierarchical;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // The strategy of this transformer is to visually represent shopping channels in a responsive card layout.
  // We use a VerticalCard container that includes a CardHeader (with pagination information)
  // and a CardContent that embeds a DataList. Each channel is displayed as a DataListItem whose label combines an icon and the channel’s name,
  // and whose value contains additional info (code and category count) rendered via a Text (or markdown) component.
  
  // Create the CardHeader component showing overall title and pagination info.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Shopping Channels",
    description: `Page ${input.pagination.current} of ${input.pagination.pages} | Total channels: ${input.pagination.records}`,
    // Use an icon to add a visual cue. Allowed types: Avatar, Icon, Chip, Badge, IconButton, Text.
    startElement: {
      type: "Icon",
      id: "shopping-bag", // an icon representing a shopping bag (assumed to be available in your icon set)
      color: "blue",
      size: 24,
    },
  };

  // Transform each channel into a DataListItem.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.data.map((channel) => {
    // Construct the label as an array of presentation components.
    // Combine an icon and a text component for the channel name.
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: "shopping-bag", // icon representing a channel
        color: "indigo",
        size: 20,
      },
      {
        type: "Text",
        content: channel.name,
        variant: "h6",
        color: "primary",
      },
    ];
    
    // Construct the value with channel code and the count of child categories.
    // Using a markdown component to achieve styled text formatting in a mobile-friendly way.
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Markdown",
        content: `**Code:** ${channel.code}  \n**Categories:** ${channel.categories ? channel.categories.length : 0}`,
      },
    ];
    
    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Handle edge-case: if there are no channels available, show a single DataListItem indicating this.
  if (dataListItems.length === 0) {
    dataListItems.push({
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "No channels available",
          variant: "body1",
          color: "gray",
        },
      ],
      value: [],
    });
  }

  // Compose the DataList that will list all channels.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Place the DataList inside a CardContent container.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Finally, build the VerticalCard that contains the header and content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
    ],
  };

  // Return the composed UI component that adheres to the IAutoView.IAutoViewComponentProps type.
  return verticalCard;
}
