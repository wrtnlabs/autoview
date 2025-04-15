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
  // In this function we transform the shopping section data into a visual list.
  // We use a DataList component to aggregate individual section items.
  // For each section, we create a DataListItem that includes a markdown label (to provide a rich text display)
  // and an icon representing the section (to make the UI more engaging).

  // Handle the edge case where input data is empty.
  if (!input || !input.data || input.data.length === 0) {
    // When no sections are provided, return a markdown component displaying an appropriate message.
    return {
      type: "Markdown",
      content: "## No sections available\n\nCurrently, there are no shopping sections to display."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Transform each IShoppingSection record into a DataListItem component.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.data.map((section) => {
    // Construct a markdown string that visually highlights the section's details.
    // Markdown is used instead of plain text to enrich the UI.
    const markdownContent = `### ${section.name}\n\n- **Code:** ${section.code}\n- **Created:** ${section.created_at}`;
    
    // Create a Markdown component for the label.
    const labelComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: markdownContent
    };

    // Create an Icon component for the value.
    // Using a shopping bag icon (represented as "shopping-bag") to visually indicate the section context.
    // This enhances the recognition factor and engages users via visual cues.
    const iconComponent: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "shopping-bag",
      color: "blue", // Chosen color; can be adapted based on theming or dynamic inputs.
      size: 24
    };

    // Return a DataListItem that bundles the markdown label and the icon.
    return {
      type: "DataListItem",
      label: labelComponent,
      value: iconComponent
    };
  });

  // Compose the final DataList component that holds all section items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // The resulting component is responsive and uses rich visual elements,
  // making it suitable for both web and mobile devices.
  return dataList;
}
