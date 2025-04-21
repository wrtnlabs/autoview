import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiUserInteractionLimits {
        export type GetResponse = any | {};
    }
    export type interaction_limit_response = any;
}
type IAutoViewTransformerInputType = Schema.IApiUserInteractionLimits.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If input is not an object (e.g., primitive), render it as markdown
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    const content = JSON.stringify(input, null, 2);
    return {
      type: "Markdown",
      content: "json\n" + content + "\n```",
    };
  }

  // Build a DataList of all top‐level fields in the input object
  const items: IAutoView.IAutoViewDataListItemProps[] = Object.keys(input).map((key) => {
    const value = (input as Record<string, unknown>)[key];

    // Label component for the field name
    const labelComponent: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: key,
      variant: "body2",
    };

    // Decide how to visualize the value
    let valueComponent: IAutoView.IAutoViewPresentationComponentProps;
    if (value === null || value === undefined) {
      // empty placeholder
      valueComponent = {
        type: "Text",
        content: "-",
        variant: "body2",
        color: "gray",
      };
    } else if (typeof value === "number") {
      // show numeric values as filled chips
      valueComponent = {
        type: "Chip",
        label: String(value),
        variant: "filled",
        color: "info",
      };
    } else if (typeof value === "boolean") {
      // boolean as check or cross icon
      valueComponent = {
        type: "Icon",
        id: value ? "check-circle" : "times-circle",
        color: value ? "green" : "red",
        size: 16,
      };
    } else if (typeof value === "string") {
      // plain strings as text
      valueComponent = {
        type: "Text",
        content: value,
        variant: "body2",
      };
    } else {
      // For objects/arrays, render JSON as markdown
      const json = JSON.stringify(value, null, 2);
      valueComponent = {
        type: "Markdown",
        content: "```json\n" + json + "\n```",
      };
    }

    return {
      type: "DataListItem",
      label: labelComponent,
      value: valueComponent,
    };
  });

  // Wrap the list in a card with a header for better visual grouping
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "User Interaction Limits",
    startElement: {
      type: "Icon",
      id: "tachometer-alt",
      color: "blue",
      size: 24,
    },
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: items,
    },
  };

  // Return a vertical card combining header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
