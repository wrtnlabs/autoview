import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsInteractionLimits {
        export type GetResponse = any | {};
    }
    export type interaction_limit_response = any;
}
type IAutoViewTransformerInputType = Schema.IApiOrgsInteractionLimits.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no data is provided, show a simple text message
  if (input === null || input === undefined) {
    return {
      type: "Text",
      content: "No data available",
    };
  }

  /**
   * Recursively transform any JS value into an AutoView presentation component.
   * - Primitives: numbers/booleans → Chip; strings → Markdown
   * - Arrays: DataList with indexed items
   * - Objects: DataList with key/value entries
   */
  function transform(
    value: any
  ): IAutoView.IAutoViewPresentationComponentProps {
    // Null
    if (value === null) {
      return { type: "Text", content: "null" };
    }

    const valueType = typeof value;

    // Numbers and booleans → Chip for quick glance
    if (valueType === "number" || valueType === "boolean") {
      return {
        type: "Chip",
        label: String(value),
      };
    }

    // Strings → use Markdown to support richer formatting
    if (valueType === "string") {
      return {
        type: "Markdown",
        content: value,
      };
    }

    // Arrays → DataList with each element labeled by its index
    if (Array.isArray(value)) {
      const childrenProps: IAutoView.IAutoViewDataListItemProps[] = value.map(
        (item, index) => ({
          type: "DataListItem",
          label: [
            {
              type: "Text",
              content: `${index}`,
            },
          ],
          value: transform(item),
        })
      );
      return {
        type: "DataList",
        childrenProps,
      };
    }

    // Objects → DataList with each key/value pair
    if (valueType === "object") {
      const childrenProps: IAutoView.IAutoViewDataListItemProps[] = Object.keys(
        value
      ).map((key) => ({
        type: "DataListItem",
        label: [
          {
            type: "Text",
            content: key,
          },
        ],
        value: transform(value[key]),
      }));
      return {
        type: "DataList",
        childrenProps,
      };
    }

    // Fallback for other types
    return {
      type: "Text",
      content: String(value),
    };
  }

  // Kick off transformation for the root input
  return transform(input);
}
