import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Color-coded labels help you categorize and filter your issues (just like labels in Gmail).
     *
     * @title Label
    */
    export type label = {
        /**
         * Unique identifier for the label.
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the label
        */
        url: string;
        /**
         * The name of the label.
        */
        name: string;
        /**
         * Optional description of the label, such as its purpose.
        */
        description: string | null;
        /**
         * 6-character hex code, without the leading #, identifying the color
        */
        color: string;
        /**
         * Whether this label comes by default in a new repository.
        */
        "default": boolean;
    };
}
type IAutoViewTransformerInputType = Schema.label;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Compose an avatar showing the first letter of the label name,
  // using a distinct variant if this is a default label.
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    name: input.name.charAt(0).toUpperCase(),
    variant: input.default ? "success" : "gray",
    size: 40,
  };

  // A simple text component for DataListItem labels/values.
  const makeText = (txt: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: txt,
    variant: "body2",
  });

  // Build a list of key/value pairs to display core metadata.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: makeText("ID"),
      value: makeText(String(input.id)),
    },
    {
      type: "DataListItem",
      label: makeText("Node ID"),
      value: makeText(input.node_id),
    },
    {
      type: "DataListItem",
      label: makeText("Color"),
      // Use a Divider as a color swatch; setting its color to the label's hex.
      value: {
        type: "Divider",
        orientation: "horizontal",
        color: `#${input.color}`,
      },
    },
    {
      type: "DataListItem",
      label: makeText("Default"),
      // Show a small chip indicating default vs custom
      value: {
        type: "Chip",
        label: input.default ? "Yes" : "No",
        color: input.default ? "success" : "error",
        variant: "filled",
        size: "small",
      },
    },
    {
      type: "DataListItem",
      label: makeText("URL"),
      // Render the URL as a text button for easy tapping on mobile
      value: {
        type: "Button",
        label: input.url,
        href: input.url,
        variant: "text",
        color: "primary",
        size: "small",
      },
    },
  ];

  // Wrap metadata in a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // A footer chip showing the label description if present
  const footerChildren = input.description
    ? [
        {
          type: "Chip",
          label: input.description,
          color: "info",
          variant: "outlined",
          size: "small",
        } as IAutoView.IAutoViewChipProps,
      ]
    : [];

  // Assemble everything into a responsive vertical card
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header with avatar, name and optional description
        type: "CardHeader",
        title: input.name,
        description: input.description ?? undefined,
        startElement: avatar,
      },
      {
        // Main content with key/value listing
        type: "CardContent",
        childrenProps: dataList,
      },
      {
        // Footer with supplemental description chips
        type: "CardFooter",
        childrenProps: footerChildren,
      },
    ],
  };
}
