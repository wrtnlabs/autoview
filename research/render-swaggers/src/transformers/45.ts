import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IPageIShoppingChannel {
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
            pagination: Schema.IPage.IPagination;
            /**
             * List of records.
             *
             * @title List of records
            */
            data: Schema.IShoppingChannel.IHierarchical[];
        };
    }
    export namespace IPage {
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
    export namespace IShoppingChannel {
        /**
         * Hierarchical channel information with children categories.
        */
        export type IHierarchical = {
            /**
             * Children categories with hierarchical structure.
             *
             * @title Children categories with hierarchical structure
            */
            categories: Schema.IShoppingChannelCategory.IHierarchical[];
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
    export namespace IShoppingChannelCategory {
        /**
         * Hierarchical category information with children categories.
        */
        export type IHierarchical = {
            /**
             * List of children categories with hierarchical structure.
             *
             * @title List of children categories with hierarchical structure
            */
            children: Schema.IShoppingChannelCategory.IHierarchical[];
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
}
type IAutoViewTransformerInputType = Schema.IPageIShoppingChannel.IHierarchical;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Recursive helper to transform hierarchical categories into a DataList
  function buildCategoryList(
    categories: Schema.IShoppingChannelCategory.IHierarchical[]
  ): IAutoView.IAutoViewDataListProps {
    const items: IAutoView.IAutoViewDataListItemProps[] = categories.map(
      (cat) => {
        // If this category has children, nest another DataList; otherwise show the category code
        const valueComponent: IAutoView.IAutoViewComponentProps = cat.children.length
          ? buildCategoryList(cat.children)
          : {
              type: "Text",
              variant: "caption",
              content: cat.code,
            };
        return {
          type: "DataListItem",
          label: {
            // Category name as the label
            type: "Text",
            variant: "body1",
            content: cat.name,
          },
          value: valueComponent,
        };
      }
    );
    return {
      type: "DataList",
      childrenProps: items,
    };
  }

  const { pagination, data: channels } = input;

  // Build DataListItems for each shopping channel
  const channelItems: IAutoView.IAutoViewDataListItemProps[] = channels.map(
    (channel) => ({
      type: "DataListItem",
      label: {
        // Channel name in a larger heading style
        type: "Text",
        variant: "h6",
        content: channel.name,
      },
      value: buildCategoryList(channel.categories),
    })
  );

  // If there are no channels, show a friendly message
  const channelListComponent: IAutoView.IAutoViewComponentProps =
    channelItems.length > 0
      ? { type: "DataList", childrenProps: channelItems }
      : {
          type: "Text",
          variant: "body1",
          content: "No shopping channels available.",
        };

  // Markdown block summarizing pagination info
  const paginationSummary: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content:
      `**Page**: ${pagination.current} / ${pagination.pages}\n\n` +
      `**Limit per page**: ${pagination.limit}\n\n` +
      `**Total records**: ${pagination.records}`,
  };

  // Card header with an icon and summary
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Shopping Channels Overview",
    description: `${channels.length} channel${channels.length === 1 ? "" : "s"}`,
    startElement: {
      type: "Icon",
      id: "layer-group", // FontAwesome icon: layers of channels
      color: "blue",
      size: 24,
    },
  };

  // Compose final VerticalCard with header, pagination, and channel list
  return {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        childrenProps: [paginationSummary],
      },
      {
        type: "CardContent",
        childrenProps: [channelListComponent],
      },
    ],
  };
}
