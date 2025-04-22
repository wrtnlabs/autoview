import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type CANNOT_FINDONE_ARTICLE = any;
    export type ResponseForm_lt_boolean_gt_ = any;
}
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Helper: determine if a value is primitive (string/number/boolean).
   */
  function isPrimitive(val: any): val is string | number | boolean {
    const t = typeof val;
    return t === "string" || t === "number" || t === "boolean";
  }

  /**
   * Helper: create a Text component for a string/number/boolean/null.
   */
  function createTextComponent(val: any, variant: IAutoView.IAutoViewTextProps["variant"] = "body2"): IAutoView.IAutoViewTextProps {
    const content = val == null ? "N/A" : String(val);
    return {
      type: "Text",
      content,
      variant,
    };
  }

  /**
   * Helper: create a Markdown component for complex data (object or array).
   * Renders a code block with pretty-printed JSON.
   */
  function createMarkdownComponent(val: any): IAutoView.IAutoViewMarkdownProps {
    const json = JSON.stringify(val, null, 2);
    const content = ["json", json, "```"].join("\n");
    return {
      type: "Markdown",
      content,
    };
  }

  /**
   * Helper: build DataListItemProps for a single key/value.
   */
  function buildItem(key: string, value: any): IAutoView.IAutoViewDataListItemProps {
    // Label: show the key name as subtitle
    const labelComp = createTextComponent(key, "subtitle2");

    // Value: choose text or markdown based on type
    let valueComp: IAutoView.IAutoViewPresentationComponentProps;
    if (isPrimitive(value)) {
      valueComp = createTextComponent(value, "body1");
    } else {
      // arrays and objects shown via JSON code block
      valueComp = createMarkdownComponent(value);
    }

    return {
      type: "DataListItem",
      label: labelComp,
      value: valueComp,
    };
  }

  // Top-level logic: if input is primitive, just show as a Text component
  if (isPrimitive(input) || input == null) {
    return createTextComponent(input, "body1");
  }

  // If input is an array or object, build a DataList
  if (typeof input === "object") {
    const items: IAutoView.IAutoViewDataListItemProps[] = [];

    if (Array.isArray(input)) {
      // Array: index each element
      input.forEach((elem, idx) => {
        items.push(buildItem(String(idx), elem));
      });
    } else {
      // Object: list own enumerable keys
      for (const key of Object.keys(input)) {
        items.push(buildItem(key, (input as Record<string, any>)[key]));
      }
    }

    return {
      type: "DataList",
      childrenProps: items,
    };
  }

  // Fallback: render JSON of whatever else
  return createMarkdownComponent(input);
}
