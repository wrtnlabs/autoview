import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type code_scanning_autofix_commits_response = {
        /**
         * The Git reference of target branch for the commit. For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation.
        */
        target_ref?: string;
        /**
         * SHA of commit with autofix.
        */
        sha?: string;
    };
}
type IAutoViewTransformerInputType = Schema.code_scanning_autofix_commits_response;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Safely derive display values, falling back to "Unknown" when absent.
  const targetRef = input.target_ref ?? "Unknown";
  const fullSha = input.sha ?? "Unknown";
  // Use the short SHA (first 7 characters) for compact display, if available.
  const shortSha = fullSha !== "Unknown" ? fullSha.substring(0, 7) : fullSha;

  // Construct a DataList to present the key/value pairs in a clean, responsive way.
  const detailsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        // Label and value each use a Text component for consistency.
        label: {
          type: "Text",
          variant: "body2",
          content: "Target Branch",
        },
        value: {
          type: "Text",
          variant: "body1",
          // Emphasize the branch name
          content: targetRef,
        },
      },
      {
        type: "DataListItem",
        label: {
          type: "Text",
          variant: "body2",
          content: "Commit SHA",
        },
        // Wrap the short SHA in a Chip for visual prominence
        value: {
          type: "Chip",
          variant: "outlined",
          color: "primary",
          size: "small",
          label: shortSha,
        },
      },
    ],
  };

  // Compose the final UI as a VerticalCard:
  // - CardHeader includes an icon and titles
  // - CardContent holds the details DataList
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Autofix Commit",
        description: fullSha !== "Unknown" ? `Branch: ${targetRef}` : undefined,
        // Use a branch icon to suggest "target_ref"
        startElement: {
          type: "Icon",
          id: "code-branch",
          color: "blue",
          size: 24,
        },
      },
      {
        type: "CardContent",
        // Place the DataList directly as the content
        childrenProps: detailsList,
      },
    ],
  };
}
