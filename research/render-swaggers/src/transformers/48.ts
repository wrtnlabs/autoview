import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingSection = {
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
        data: Schema.IShoppingSection[];
    };
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
type IAutoViewTransformerInputType = Schema.IPageIShoppingSection;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform each shopping section into a DataListItem:
  const items: IAutoView.IAutoViewDataListItemProps[] = input.data.map((section) => {
    // Format the creation date for display; fallback to raw string if invalid
    let formattedDate = section.created_at;
    const timestamp = Date.parse(section.created_at);
    if (!isNaN(timestamp)) {
      formattedDate = new Date(timestamp).toLocaleDateString();
    }

    // Build the label using Markdown to emphasize the section name and code
    const labelMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**${section.name}**  \`${section.code}\``,
    };

    // Build the value as an icon + text pair for the creation date
    const dateIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "calendar",
      color: "gray",
      size: 16,
    };
    const dateText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: formattedDate,
      variant: "body2",
      color: "gray",
    };

    return {
      type: "DataListItem",
      label: labelMarkdown,
      // childrenProps of DataListItem.value can be an array of PresentationComponentProps
      value: [dateIcon, dateText],
    };
  });

  // If there are no sections, show a friendly markdown message
  if (items.length === 0) {
    return {
      type: "Markdown",
      content: "_No shopping sections available._",
    };
  }

  // Compose the list inside a card with a header showing pagination info
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Shopping Sections",
    description: `Page ${input.pagination.current} of ${input.pagination.pages}`,
  };

  // Wrap the DataList into a CardContent component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Return a vertical card containing the header and the list
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
