import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type root = {
    current_user_url: string & tags.Format<"uri-template">;
    current_user_authorizations_html_url: string & tags.Format<"uri-template">;
    authorizations_url: string & tags.Format<"uri-template">;
    code_search_url: string & tags.Format<"uri-template">;
    commit_search_url: string & tags.Format<"uri-template">;
    emails_url: string & tags.Format<"uri-template">;
    emojis_url: string & tags.Format<"uri-template">;
    events_url: string & tags.Format<"uri-template">;
    feeds_url: string & tags.Format<"uri-template">;
    followers_url: string & tags.Format<"uri-template">;
    following_url: string & tags.Format<"uri-template">;
    gists_url: string & tags.Format<"uri-template">;
    /**
     * @deprecated
    */
    hub_url?: string & tags.Format<"uri-template">;
    issue_search_url: string & tags.Format<"uri-template">;
    issues_url: string & tags.Format<"uri-template">;
    keys_url: string & tags.Format<"uri-template">;
    label_search_url: string & tags.Format<"uri-template">;
    notifications_url: string & tags.Format<"uri-template">;
    organization_url: string & tags.Format<"uri-template">;
    organization_repositories_url: string & tags.Format<"uri-template">;
    organization_teams_url: string & tags.Format<"uri-template">;
    public_gists_url: string & tags.Format<"uri-template">;
    rate_limit_url: string & tags.Format<"uri-template">;
    repository_url: string & tags.Format<"uri-template">;
    repository_search_url: string & tags.Format<"uri-template">;
    current_user_repositories_url: string & tags.Format<"uri-template">;
    starred_url: string & tags.Format<"uri-template">;
    starred_gists_url: string & tags.Format<"uri-template">;
    topic_search_url?: string & tags.Format<"uri-template">;
    user_url: string & tags.Format<"uri-template">;
    user_organizations_url: string & tags.Format<"uri-template">;
    user_repositories_url: string & tags.Format<"uri-template">;
    user_search_url: string & tags.Format<"uri-template">;
};
type IAutoViewTransformerInputType = root;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build a list of DataListItem components from each key/value in the input.
  // Each list item shows the property name with a text component (label)
  // and the URI as a clickable markdown link (value). This creates a visual, interactive display.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];
  
  // Iterate over each property in the input object.
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = input[key];
      // For each property, create a DataListItem:
      // - The label is rendered as a Text component showing the property name.
      // - The value is rendered as Markdown containing a clickable link.
      dataListItems.push({
        type: "DataListItem",
        label: {
          type: "Text",
          variant: "caption",
          color: "blue",
          // content accepts a string directly
          content: key,
        },
        value: {
          type: "Markdown",
          // Wrap the URL in markdown link format to create a clickable link.
          content: `[${value}](${value})`,
        },
      });
    }
  }
  
  // Compose the final UI component as a VerticalCard.
  // The card header includes a title, description, and an icon.
  // The card content holds a DataList which presents all the endpoints.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "GitHub API Endpoints",
        description: "Overview of current API URL templates",
        // Provide a start element as an icon to add visual identity
        startElement: {
          type: "Icon",
          id: "github", // Assumes there is an icon with id "github"
          color: "blue",
          size: 20,
        },
      },
      {
        type: "CardContent",
        // Nest a DataList component to organize the endpoint information in a list.
        childrenProps: {
          type: "DataList",
          childrenProps: dataListItems,
        },
      },
    ],
  };
  
  // Return the composed UI component.
  return verticalCard;
}
