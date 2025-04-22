import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Git references within a repository
     *
     * @title Git Reference
    */
    export type git_ref = {
        ref: string;
        node_id: string;
        url: string & tags.Format<"uri">;
        object: {
            type: string;
            /**
             * SHA for the reference
            */
            sha: string;
            url: string & tags.Format<"uri">;
        };
    };
}
type IAutoViewTransformerInputType = Schema.git_ref;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine an icon based on the git reference type (commit, tag, etc.).
  // This enhances visual recognition of the kind of reference.
  const typeIconId = (() => {
    const t = input.object.type?.toLowerCase();
    if (t === "commit") return "code-branch";
    if (t === "tag") return "tag";
    // default fallback icon
    return "file";
  })();

  // Header: Show the ref name with an icon and the object type as description.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.ref,
    description: input.object.type,
    startElement: {
      type: "Icon",
      id: typeIconId,
      size: 24,
      color: "blue",
    },
  };

  // DataListItem for node_id
  const nodeIdItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Node ID",
      variant: "subtitle2",
      color: "gray",
    },
    value: {
      type: "Text",
      content: input.node_id,
      variant: "body2",
    },
  };

  // DataListItem for SHA, rendered with inline code markdown
  const shaItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      content: "SHA",
      variant: "subtitle2",
      color: "gray",
    },
    value: {
      type: "Markdown",
      // backticks produce inline code style
      content: `\`${input.object.sha}\``,
    },
  };

  // DataListItem for the reference URL, clickable via a Button
  const refUrlItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Reference URL",
      variant: "subtitle2",
      color: "gray",
    },
    value: {
      type: "Button",
      label: ["Open Ref"],
      variant: "text",
      size: "small",
      href: input.url,
      startElement: {
        type: "Icon",
        id: "link",
        size: 16,
        color: "blue",
      },
    },
  };

  // DataListItem for the object URL, clickable via a Button
  const objectUrlItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Object URL",
      variant: "subtitle2",
      color: "gray",
    },
    value: {
      type: "Button",
      label: ["Open Object"],
      variant: "text",
      size: "small",
      href: input.object.url,
      startElement: {
        type: "Icon",
        id: "link",
        size: 16,
        color: "blue",
      },
    },
  };

  // Combine all DataListItems into a single DataList for structured display.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [nodeIdItem, shaItem, refUrlItem, objectUrlItem],
  };

  // Wrap the DataList in CardContent to group the details visually.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Return a vertical card composed of header and content.
  // This layout is responsive and stacks nicely on mobile screens.
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
