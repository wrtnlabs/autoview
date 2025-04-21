import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type Try_lt_string_gt_ = {
        result: true;
        code: 1000;
        requestToResponse?: string;
        data: string;
    };
}
type IAutoViewTransformerInputType = Schema.Try_lt_string_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We'll display the response as a simple data list with icon-enhanced labels
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1. Result (true/false) with a green/red status icon
  const resultIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: input.result ? "check-circle" : "times-circle",
    color: input.result ? "green" : "red",
    size: 16,
  };
  items.push({
    type: "DataListItem",
    label: [
      resultIcon,
      { type: "Text", content: "Result", variant: "body1", color: "primary" },
    ],
    value: {
      type: "Text",
      // Show boolean as capitalized string
      content: input.result ? "True" : "False",
      variant: "body1",
      color: input.result ? "success" : "error",
    },
  });

  // 2. Code (status code) with a hashtag icon
  const codeIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "hashtag",
    color: "cyan",
    size: 16,
  };
  items.push({
    type: "DataListItem",
    label: [
      codeIcon,
      { type: "Text", content: "Code", variant: "body1", color: "primary" },
    ],
    value: {
      type: "Text",
      content: String(input.code),
      variant: "body1",
      color: "cyan",
    },
  });

  // 3. Optional: request-to-response URL
  if (input.requestToResponse) {
    const rrIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "exchange-alt",
      color: "blue",
      size: 16,
    };
    items.push({
      type: "DataListItem",
      label: [
        rrIcon,
        { type: "Text", content: "Endpoint", variant: "body1", color: "primary" },
      ],
      value: {
        type: "Text",
        content: input.requestToResponse,
        variant: "body2",
        color: "blue",
        // Clamp to one line on small screens
        lineClamp: 1,
      },
    });
  }

  // 4. Data payload: for long JSON strings, render as a scrollable code block via Markdown
  const dataIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "file-alt",
    color: "gray",
    size: 16,
  };
  const dataLabelText: IAutoView.IAutoViewTextProps = {
    type: "Text",
    content: "Data",
    variant: "body1",
    color: "primary",
  };
  const dataValue: IAutoView.IAutoViewPresentationComponentProps =
    input.data.length > 100
      ? {
          type: "Markdown",
          // Wrap in a JSON code fence to preserve formatting and allow horizontal scroll
          content: "json\n" + input.data + "\n```",
        }
      : {
          type: "Text",
          content: input.data,
          variant: "body2",
          color: "gray",
          // Allow up to four lines before truncating
          lineClamp: 4,
        };
  items.push({
    type: "DataListItem",
    label: [dataIcon, dataLabelText],
    value: dataValue,
  });

  // Return the composed DataList component
  return {
    type: "DataList",
    childrenProps: items,
  };
}
