import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type ALREADY_CREATED_EMAIL = any;
    export type ALREADY_CREATED_PHONE_NUMBER = any;
    export type ResponseForm_lt_DecodedUserToken_gt_ = any;
}
type IAutoViewTransformerInputType = any | any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Fallback transformation: render the raw input as collapsible JSON for inspection.
  // This avoids unbounded text in the main UI, and makes it responsive on mobile.
  // Wrap in a Collapse component with a header icon and markdown content.
  
  // Safely stringify the input, handling possible circular references.
  let jsonString: string;
  try {
    jsonString = JSON.stringify(input ?? {}, null, 2);
  } catch {
    // Fallback for circular structures
    jsonString = String(input);
  }
  // Prepare a fenced code block for JSON
  const markdownContent = ["json", jsonString, "```"].join("\n");

  return {
    type: "Collapse",
    header: {
      type: "CollapseHeader",
      // A downward caret toggles the collapse
      toggleIcon: {
        type: "Icon",
        id: "caret-down",
        size: 16,
        color: "gray",
      },
      // Header shows a database icon and title
      childrenProps: [
        {
          type: "Icon",
          id: "database",
          size: 20,
          color: "blue",
        },
        {
          type: "Text",
          // Use a heading style for prominence
          variant: "h6",
          content: "Data Preview",
        },
      ],
    },
    content: {
      type: "CollapseContent",
      // Render the JSON inside a markdown code block
      childrenProps: {
        type: "Markdown",
        content: markdownContent,
      },
    },
  };
}
