import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type secret_scanning_location = {
        /**
         * The location type. Because secrets may be found in different types of resources (ie. code, comments, issues, pull requests, discussions), this field identifies the type of resource where the secret was found.
        */
        type?: "commit" | "wiki_commit" | "issue_title" | "issue_body" | "issue_comment" | "discussion_title" | "discussion_body" | "discussion_comment" | "pull_request_title" | "pull_request_body" | "pull_request_comment" | "pull_request_review" | "pull_request_review_comment";
        details?: any | any | any | any | any | any | any | any | any | any | any | any | any;
    };
    export type secret_scanning_location_commit = any;
    export type secret_scanning_location_wiki_commit = any;
    export type secret_scanning_location_issue_title = any;
    export type secret_scanning_location_issue_body = any;
    export type secret_scanning_location_issue_comment = any;
    export type secret_scanning_location_discussion_title = any;
    export type secret_scanning_location_discussion_body = any;
    export type secret_scanning_location_discussion_comment = any;
    export type secret_scanning_location_pull_request_title = any;
    export type secret_scanning_location_pull_request_body = any;
    export type secret_scanning_location_pull_request_comment = any;
    export type secret_scanning_location_pull_request_review = any;
    export type secret_scanning_location_pull_request_review_comment = any;
}
type IAutoViewTransformerInputType = Schema.secret_scanning_location[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each location type to a representative FontAwesome icon (kebab-case, without prefixes).
  const typeIconMap: Record<string, string> = {
    commit: "code-branch",
    wiki_commit: "book",
    issue_title: "exclamation-circle",
    issue_body: "exclamation-circle",
    issue_comment: "comment",
    discussion_title: "comments",
    discussion_body: "comments",
    discussion_comment: "comment-dots",
    pull_request_title: "git-pull-request",
    pull_request_body: "git-pull-request",
    pull_request_comment: "comment-dots",
    pull_request_review: "user-check",
    pull_request_review_comment: "comment-alt",
  };

  // Transform each input record into a DataListItem with an icon+text label and a markdown detail view.
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((loc, index) => {
    // Determine human-readable label for the type; fallback to raw string.
    const typeKey = loc.type ?? "unknown";
    // Pick an icon or fall back to a question mark.
    const iconId = typeIconMap[typeKey] ?? "question-circle";

    // Safely stringify the 'details' field as JSON. Show a placeholder message if missing.
    const rawDetails = loc.details !== undefined && loc.details !== null
      ? JSON.stringify(loc.details, null, 2)
      : "No details available";
    // Wrap in a code block for better readability.
    const markdownContent = ["json", rawDetails, "```"].join("\n");

    return {
      type: "DataListItem",
      label: [
        // Start element: an icon representing the location type.
        { type: "Icon", id: iconId, size: 20, color: "blue" },
        // Followed by a text label.
        { type: "Text", content: typeKey, variant: "subtitle2", color: "primary" }
      ],
      // Use a Markdown component so JSON is nicely formatted and scrollable on small screens.
      value: { type: "Markdown", content: markdownContent }
    };
  });

  // Wrap all items in a DataList for a clean, responsive list UI.
  return {
    type: "DataList",
    childrenProps: items
  };
}
