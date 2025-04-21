import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Contributor Activity
     *
     * @title Contributor Activity
    */
    export type contributor_activity = {
        author: Schema.nullable_simple_user;
        total: number & tags.Type<"int32">;
        weeks: {
            w?: number & tags.Type<"int32">;
            a?: number & tags.Type<"int32">;
            d?: number & tags.Type<"int32">;
            c?: number & tags.Type<"int32">;
        }[];
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    } | null;
}
type IAutoViewTransformerInputType = Schema.contributor_activity[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Handle empty or undefined input gracefully
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "## No contributor activity data available."
    };
  }

  // Transform each contributor's data into a DataListItemProps
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map(contributor => {
    const author = contributor.author;

    // Sum up additions and deletions across all weeks
    const additions = contributor.weeks.reduce((sum, week) => sum + (week.a ?? 0), 0);
    const deletions = contributor.weeks.reduce((sum, week) => sum + (week.d ?? 0), 0);
    const commits = contributor.total;

    // Build the label: an avatar/icon plus the user's display name
    const label: IAutoView.IAutoViewPresentationComponentProps[] = [];
    if (author) {
      label.push({
        type: "Avatar",
        src: author.avatar_url,
        name: author.login,
        size: 32
      });
      label.push({
        type: "Text",
        content: author.name ?? author.login,
        variant: "body1",
        color: "primary"
      });
    } else {
      // Fallback for null author
      label.push({
        type: "Icon",
        id: "user-secret",
        color: "gray",
        size: 32
      });
      label.push({
        type: "Text",
        content: "Unknown Contributor",
        variant: "body1",
        color: "gray"
      });
    }

    // Build a group of chips for commits, additions, and deletions
    const chips: IAutoView.IAutoViewChipProps[] = [
      {
        type: "Chip",
        label: `${commits} commits`,
        variant: "outlined",
        color: "blue",
        size: "small",
        startElement: {
          type: "Icon",
          id: "code-branch",
          color: "blue",
          size: 12
        }
      },
      {
        type: "Chip",
        label: `+${additions}`,
        variant: "outlined",
        color: "green",
        size: "small",
        startElement: {
          type: "Icon",
          id: "plus",
          color: "green",
          size: 12
        }
      },
      {
        type: "Chip",
        label: `-${deletions}`,
        variant: "outlined",
        color: "red",
        size: "small",
        startElement: {
          type: "Icon",
          id: "minus",
          color: "red",
          size: 12
        }
      }
    ];

    return {
      type: "DataListItem",
      label,
      // Wrap chips in a ChipGroup for a clean, responsive layout
      value: {
        type: "ChipGroup",
        childrenProps: chips,
        maxItems: chips.length
      }
    };
  });

  // Compose the final DataList component
  return {
    type: "DataList",
    childrenProps: items
  };
}
