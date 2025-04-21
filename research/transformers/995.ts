import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Hovercard
     *
     * @title Hovercard
    */
    export type hovercard = {
        contexts: {
            message: string;
            octicon: string;
        }[];
    };
}
type IAutoViewTransformerInputType = Schema.hovercard;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform each context into a DataListItem with an icon and a text value
  const items: IAutoView.IAutoViewDataListItemProps[] = input.contexts.map((ctx) => ({
    type: "DataListItem",
    // Use the octicon name as a FontAwesome icon identifier
    label: [
      {
        type: "Icon",
        id: ctx.octicon,   // e.g. "comment" or "issue-opened"
        size: 20,          // medium size for visibility
        color: "blue"      // primary color accent
      }
    ],
    // Display the message next to the icon
    value: [
      {
        type: "Text",
        variant: "body1",
        content: ctx.message // the hovercard message
      }
    ]
  }));

  // Render the list of contexts in a responsive data list
  return {
    type: "DataList",
    childrenProps: items
  };
}
