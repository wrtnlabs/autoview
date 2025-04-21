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
  const { pagination, data } = input;

  // Card header displaying section overview with an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Shopping Sections",
    description: `${pagination.records} total • Page ${pagination.current}/${pagination.pages}`,
    startElement: {
      type: "Icon",
      id: "store",            // store icon to represent sections
      size: 24,
      color: "blue",
    },
  };

  // Transform each section into a DataListItem component
  const items: IAutoView.IAutoViewDataListItemProps[] = data.map((section) => {
    // Format the creation date for readability
    const createdAt = new Date(section.created_at).toLocaleDateString();

    return {
      type: "DataListItem",
      // Use the section name as the label
      label: [
        {
          type: "Text",
          variant: "subtitle1",
          content: section.name,
        },
      ],
      // Show the code as a secondary piece of information
      value: [
        {
          type: "Text",
          variant: "body2",
          color: "gray",
          content: section.code,
        },
      ],
      // Display creation date on the right
      endElement: {
        type: "Text",
        variant: "caption",
        color: "darkGray",
        content: createdAt,
      },
    };
  });

  // Wrap the items into a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Card content containing the list of sections
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Final vertical card assembling header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
