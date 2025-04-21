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
  // We construct a vertical card to display Git reference information in a concise, visual format.
  // The card contains a header with the ref name and object type, and a content section listing
  // node ID, shortened SHA, and a button to open the URL.

  // Shorten the SHA to 7 characters for a compact display
  const shortSha = input.object.sha.slice(0, 7);

  // Card header: shows the Git ref name and object type with a branch icon.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.ref,
    description: input.object.type,
    startElement: {
      type: "Icon",
      id: "code-branch",     // Assumes a FontAwesome branch icon is available as "code-branch"
      color: "blue",
      size: 20,
    },
  };

  // Data list items: Node ID, SHA chip, and URL button.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Node ID",
        variant: "subtitle2",
        color: "secondary",
      },
      value: {
        type: "Text",
        content: input.node_id,
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "SHA",
        variant: "subtitle2",
        color: "secondary",
      },
      value: {
        type: "Chip",
        label: shortSha,
        variant: "outlined",
        color: "info",
        size: "small",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "URL",
        variant: "subtitle2",
        color: "secondary",
      },
      value: {
        type: "Button",
        label: "Open",
        variant: "text",
        color: "primary",
        href: input.url,
        startElement: {
          type: "Icon",
          id: "external-link",
          color: "blue",
          size: 16,
        },
      },
    },
  ];

  // Compose the data list
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Card content: embeds the data list
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Return the assembled vertical card component
  return {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
    ],
  };
}
