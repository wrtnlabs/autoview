import type * as IAutoView from "@autoview/interface";
type ALREADY_CREATED_EMAIL = any;
type ALREADY_CREATED_PHONE_NUMBER = any;
type ResponseForm_lt_DecodedUserToken_gt_ = any;
type IAutoViewTransformerInputType = any | any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// The visualizeData function transforms the given input into a visual component structure.
// Depending on the type of input (object, array, primitive or null/undefined),
// it composes a VerticalCard with a header and content sections.
// The content is rendered either as a DataList (for objects and arrays) or as a Markdown block.
// This design favors visual elements (icon, card header) and uses markdown formatting
// when text representation of data is unavoidable.

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Compose a CardHeader with an icon.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Overview",
    description: "Summary of input data",
    startElement: {
      type: "Icon",
      id: "chart-bar", // using a chart-bar icon to represent data visualization
      size: 24,
      color: "blue",
    },
  };

  // Prepare an array of presentation components that will be injected into CardContent.
  let contentComponents: IAutoView.IAutoViewPresentationComponentProps[];

  // Handling edge cases and varying input types:
  if (input === null || input === undefined) {
    // Gracefully handle missing input by showing a markdown message.
    contentComponents = [{
      type: "Markdown",
      content: "No data available.",
    }];
  } else if (typeof input === "object") {
    if (Array.isArray(input)) {
      // Input is an array: map each element to a DataListItem.
      const items: IAutoView.IAutoViewDataListItemProps[] = input.map((item, index) => {
        // Use JSON.stringify to format objects and also handle primitives.
        const valueStr = typeof item === "object" && item
          ? JSON.stringify(item, null, 2)
          : String(item);
        return {
          type: "DataListItem",
          label: {
            type: "Markdown",
            content: `**Item ${index}**`,
          },
          value: {
            type: "Markdown",
            content: "json\n" + valueStr + "\n```",
          },
        };
      });
      // Wrap the list of items in a DataList component.
      contentComponents = [{
        type: "DataList",
        childrenProps: items,
      }];
    } else {
      // Input is a plain object: iterate its keys to create DataListItems.
      const items: IAutoView.IAutoViewDataListItemProps[] = Object.keys(input).map(key => {
        const value = input[key];
        const valueStr = typeof value === "object" && value
          ? JSON.stringify(value, null, 2)
          : String(value);
        return {
          type: "DataListItem",
          label: {
            type: "Markdown",
            content: `**${key}**`,
          },
          value: {
            type: "Markdown",
            content: "```json\n" + valueStr + "\n```",
          },
        };
      });
      // Wrap the key-value pairs in a DataList.
      contentComponents = [{
        type: "DataList",
        childrenProps: items,
      }];
    }
  } else {
    // Primitive values are stringified and shown in a markdown code block.
    contentComponents = [{
      type: "Markdown",
      content: "```json\n" + JSON.stringify(input, null, 2) + "\n```",
    }];
  }

  // Compose the final vertical card which is responsive and visually engaging.
  // We embed the header and content components into the VerticalCard.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        childrenProps: contentComponents,
      },
    ],
  };

  return verticalCard;
}
