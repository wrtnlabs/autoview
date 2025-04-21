import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingChannelCategory {
        /**
         * Invert category information with parent category.
        */
        export type IInvert = {
            /**
             * Parent category info with recursive structure.
             *
             * If no parent exists, then be `null`.
             *
             * @title Parent category info with recursive structure
            */
            parent: null | any;
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
type IAutoViewTransformerInputType = Schema.IShoppingChannelCategory.IInvert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Attempt to format the creation date into a human-friendly string
  let formattedDate: string;
  try {
    formattedDate = new Date(input.created_at).toLocaleString();
  } catch {
    // Fallback to raw value if parsing fails
    formattedDate = input.created_at;
  }

  // Build a list of DataListItemProps for each field we want to display
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: [
        { type: "Text", content: ["ID"], variant: "subtitle2" }
      ],
      value: [
        { type: "Text", content: [input.id], variant: "body2" }
      ]
    },
    {
      type: "DataListItem",
      label: [
        { type: "Text", content: ["Code"], variant: "subtitle2" }
      ],
      value: [
        { type: "Text", content: [input.code], variant: "body2" }
      ]
    },
    {
      type: "DataListItem",
      label: [
        { type: "Text", content: ["Created At"], variant: "subtitle2" }
      ],
      value: [
        { type: "Text", content: [formattedDate], variant: "body2" }
      ]
    },
    {
      type: "DataListItem",
      label: [
        { type: "Text", content: ["Parent"], variant: "subtitle2" }
      ],
      // If there's a parent, display it as a chip; otherwise show 'None'
      value: input.parent
        ? {
            type: "Chip",
            label: (input.parent as any).name || "Unknown",
            variant: "outlined",
            // Use an icon to indicate hierarchy
            startElement: {
              type: "Icon",
              id: "arrow-up",
              color: "gray",
              size: 16
            }
          }
        : {
            type: "Text",
            content: ["None"],
            variant: "body2"
          }
    }
  ];

  // Compose the final vertical card component
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header with a folder icon, category name, and code
        type: "CardHeader",
        title: input.name,
        description: input.code,
        startElement: {
          type: "Icon",
          id: "folder",
          color: "blue",
          size: 24
        }
      },
      {
        // Main content: a structured data list
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: dataListItems
          }
        ]
      }
    ]
  };

  return card;
}
