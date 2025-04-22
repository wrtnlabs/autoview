import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type root = {
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
}
type IAutoViewTransformerInputType = Schema.root;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We will display the list of URL templates in a card with a header and scrollable list.
  // Sort keys alphabetically for predictable order.
  const entries = Object.keys(input).sort() as (keyof typeof input)[];
  
  // Build DataListItem components for each endpoint: an icon + key name, and the URL as inline code.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = entries.map((key) => {
    const urlTemplate = input[key];
    return {
      type: "DataListItem",
      // Label area: a link icon and the property name
      label: [
        {
          type: "Icon",
          id: "link",      // FontAwesome 'link' icon
          color: "blue",
          size: 16
        },
        {
          type: "Text",
          variant: "body1",
          content: key
        }
      ],
      // Value area: show the URL template in code formatting via Markdown
      value: {
        type: "Markdown",
        content: `\`${urlTemplate}\``
      }
    };
  });

  // Wrap the list into a vertical card with a header
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "API Endpoints",
    description: "Available URI templates provided by the server."
  };

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The DataList itself is a presentation component
    childrenProps: {
      type: "DataList",
      childrenProps: dataListItems
    }
  };

  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard;
}
