import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Status Check Policy
     *
     * @title Status Check Policy
    */
    export type status_check_policy = {
        url: string & tags.Format<"uri">;
        strict: boolean;
        contexts: string[];
        checks: {
            context: string;
            app_id: (number & tags.Type<"int32">) | null;
        }[];
        contexts_url: string & tags.Format<"uri">;
    };
}
type IAutoViewTransformerInputType = Schema.status_check_policy;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms a status_check_policy into an AutoView component tree
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1. Header: show strict mode with an icon and the policy URL
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.strict ? "Status Checks (Strict)" : "Status Checks (Non‑Strict)",
    description: input.url,
    startElement: {
      type: "Icon",
      id: "check-circle",
      color: input.strict ? "green" : "orange",
      size: 20,
    },
  };

  // 2. Build a DataListItem for each status check
  const checksList: IAutoView.IAutoViewDataListItemProps[] = input.checks.map(
    (check) => {
      // Display the numeric app_id (or N/A) as a Chip
      const appIdText = check.app_id !== null ? String(check.app_id) : "N/A";
      const chipColor: IAutoView.IAutoViewChipProps["color"] =
        check.app_id !== null ? "primary" : "gray";

      return {
        type: "DataListItem",
        label: [
          {
            type: "Text",
            content: check.context,
            variant: "body1",
          },
        ],
        value: [
          {
            type: "Chip",
            label: appIdText,
            color: chipColor,
            variant: "outlined",
          },
        ],
      };
    }
  );

  // 3. If there are no checks, present a friendly markdown message
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] =
    checksList.length > 0
      ? [
          {
            type: "DataList",
            childrenProps: checksList,
          },
        ]
      : [
          {
            type: "Markdown",
            content: "**No status checks configured.**",
          },
        ];

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // 4. Footer: a button linking to the contexts_url
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View Contexts API",
      href: input.contexts_url,
      variant: "outlined",
      color: "primary",
    },
  };

  // 5. Compose everything in a responsive VerticalCard
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
