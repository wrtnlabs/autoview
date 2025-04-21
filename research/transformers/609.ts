import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An object without any properties.
     *
     * @title Empty Object
    */
    export type empty_object = {};
}
type IAutoViewTransformerInputType = Schema.empty_object;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Serialize the entire input object into a prettified JSON string.
  // Wrapping it in a Markdown code block provides a dynamic and readable
  // visualization for any shape of data, without hard-coding field names.
  const jsonString = JSON.stringify(input, null, 2);

  // Return a Markdown component showing the JSON.
  // This uses IAutoViewMarkdownProps, which is a valid IAutoViewComponentProps.
  return {
    type: "Markdown",
    content: [
      // Prepend a title for context; users can customize or remove this.
      "# Data Preview",
      "",
      // The code block for JSON content.
      "json",
      jsonString,
      "```"
    ].join("\n")
  };
}
