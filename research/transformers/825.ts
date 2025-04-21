import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Custom property name and associated value
     *
     * @title Custom Property Value
    */
    export type custom_property_value = {
        /**
         * The name of the property
        */
        property_name: string;
        /**
         * The value assigned to the property
        */
        value: string | string[] | null;
    };
}
type IAutoViewTransformerInputType = Schema.custom_property_value[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to detect URIs (very basic check)
  const isUri = (s: string): boolean => /^https?:\/\/.+/.test(s);

  // Transform each custom_property_value into a DataListItem
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map(({ property_name, value }) => {
    // Label: always render the property name as a subtitle
    const label: IAutoView.IAutoViewTextProps = {
      type: "Text",
      variant: "subtitle1",
      content: property_name,
    };

    // Determine the best way to render the value
    let valueComponent: IAutoView.IAutoViewPresentationComponentProps;
    if (value === null) {
      // Render null values as a subtle chip
      valueComponent = {
        type: "Chip",
        label: "null",
        variant: "outlined",
        color: "gray",
        size: "small",
      };
    } else if (Array.isArray(value)) {
      // Render arrays as a markdown bullet list for compactness
      const markdownList = value.map((v) => `- ${v}`).join("\n");
      valueComponent = {
        type: "Markdown",
        content: markdownList,
      };
    } else if (isUri(value)) {
      // If it's a URL, show the image directly
      valueComponent = {
        type: "Image",
        src: value,
        alt: property_name,
      };
    } else if (value.length > 80) {
      // Long text is better in markdown (preserves line breaks)
      valueComponent = {
        type: "Markdown",
        content: value,
      };
    } else {
      // Short text as inline body text
      valueComponent = {
        type: "Text",
        variant: "body2",
        content: value,
      };
    }

    // Compose the DataListItemProps
    return {
      type: "DataListItem",
      label: [label],
      value: [valueComponent],
    };
  });

  // If no properties, show a simple message
  if (items.length === 0) {
    return {
      type: "Text",
      variant: "body1",
      content: "No data to display.",
    };
  }

  // Wrap the items in a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Finally, wrap everything in a responsive VerticalCard
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with an icon for visual flair
        type: "CardHeader",
        title: "Properties",
        startElement: {
          type: "Icon",
          id: "list",     // uses the FontAwesome 'list' icon
          size: 24,
          color: "blue",
        },
      },
      {
        // Card content holds the data list
        type: "CardContent",
        childrenProps: dataList,
      },
    ],
  };

  return card;
}
