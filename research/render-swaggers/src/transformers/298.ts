import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type CANNOT_FIND_DESIGNER_PROFILE = any;
    export namespace ResponseForm_lt_UserType {
        export type DetailProfile_gt_ = any;
    }
}
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms arbitrary input into a visualization using AutoView components.
// Heuristics:
//  - Primitives → Text
//  - Arrays → DataList of JSON‐rendered items
//  - Objects  → Card with header (detect name/avatar) + DataList of fields
//  - Strings matching URL/image → Image or Avatar
//  - Other objects → Markdown‐code blocks
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1) Primitive fallback → simple Text
  if (input === null || typeof input !== "object") {
    return {
      type: "Text",
      content: String(input),
    };
  }

  // 2) Array → DataList of items
  if (Array.isArray(input)) {
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((item, idx) => ({
      type: "DataListItem",
      label: [{ type: "Text", content: `Item ${idx + 1}`, variant: "subtitle2" }],
      value: {
        type: "Markdown",
        content: "json\n" + JSON.stringify(item, null, 2) + "\n```",
      },
    }));
    return {
      type: "DataList",
      childrenProps: items,
    };
  }

  // 3) Object → build a card with header (name/avatar) + content (list of remaining fields)
  const obj = input as Record<string, any>;
  const keys = Object.keys(obj);

  // Heuristic: look for name/title and any image/avatar URL
  const nameKey = keys.find(k => /name$/i.test(k) || /title$/i.test(k));
  const imageKey = keys.find(
    k => /(avatar|image|uri|url)$/i.test(k) && typeof obj[k] === "string"
  );

  // Build CardHeader
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
  };
  if (nameKey) {
    header.title = String(obj[nameKey]);
  }
  if (imageKey) {
    // use Avatar for profile‐like images
    header.startElement = {
      type: "Avatar",
      src: String(obj[imageKey]),
    };
  }

  // Build DataListItems for all other keys
  const restKeys = keys.filter(k => k !== nameKey && k !== imageKey);
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = restKeys.map(k => {
    const val = obj[k];
    let valueProp: IAutoView.IAutoViewPresentationComponentProps;

    // URL string → Image
    if (typeof val === "string" && /^(https?:\/\/|data:image\/)/.test(val)) {
      valueProp = { type: "Image", src: val };
    }
    // Nested object/array → JSON‐code block
    else if (typeof val === "object") {
      valueProp = {
        type: "Markdown",
        content: "```json\n" + JSON.stringify(val, null, 2) + "\n```",
      };
    }
    // Fallback primitive → Text
    else {
      valueProp = { type: "Text", content: String(val) };
    }

    return {
      type: "DataListItem",
      label: [{ type: "Text", content: k, variant: "subtitle2" }],
      value: valueProp,
    };
  });

  // Wrap items in a DataList inside CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataItems,
    },
  };

  // Final responsive card
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
