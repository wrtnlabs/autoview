import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Minimal representation of an organization programmatic access grant for enumerations
     *
     * @title Organization Programmatic Access Grant
    */
    export type organization_programmatic_access_grant = {
        /**
         * Unique identifier of the fine-grained personal access token grant. The `pat_id` used to get details about an approved fine-grained personal access token.
        */
        id: number & tags.Type<"int32">;
        owner: Schema.simple_user;
        /**
         * Type of repository selection requested.
        */
        repository_selection: "none" | "all" | "subset";
        /**
         * URL to the list of repositories the fine-grained personal access token can access. Only follow when `repository_selection` is `subset`.
        */
        repositories_url: string;
        /**
         * Permissions requested, categorized by type of permission.
        */
        permissions: {
            organization?: {
                [key: string]: string;
            };
            repository?: {
                [key: string]: string;
            };
            other?: {
                [key: string]: string;
            };
        };
        /**
         * Date and time when the fine-grained personal access token was approved to access the organization.
        */
        access_granted_at: string;
        /**
         * Unique identifier of the user's token. This field can also be found in audit log events and the organization's settings for their PAT grants.
        */
        token_id: number & tags.Type<"int32">;
        /**
         * The name given to the user's token. This field can also be found in an organization's settings page for Active Tokens.
        */
        token_name: string;
        /**
         * Whether the associated fine-grained personal access token has expired.
        */
        token_expired: boolean;
        /**
         * Date and time when the associated fine-grained personal access token expires.
        */
        token_expires_at: string | null;
        /**
         * Date and time when the associated fine-grained personal access token was last used for authentication.
        */
        token_last_used_at: string | null;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
}
type IAutoViewTransformerInputType = Schema.organization_programmatic_access_grant[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no grants, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No Programmatic Access Grants\n\nThere are currently no organization programmatic access grants to display.",
    };
  }

  // Map each grant to a DataListItem for compact, responsive display
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.map((grant) => {
    // Choose an icon and color based on expiration status
    const isExpired = grant.token_expired;
    const statusIconId = isExpired ? "calendar-times" : "calendar-check";
    const statusColor: "red" | "green" = isExpired ? "red" : "green";
    const expiresText = isExpired
      ? "Expired"
      : `Expires at ${grant.token_expires_at ?? "Never"}`;

    // Compose the label: avatar + token name + repository selection
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        // Owner's avatar
        type: "Avatar",
        src: grant.owner.avatar_url,
        name: grant.owner.login,
        variant: "primary",
        size: 40,
      },
      {
        // Token name as subtitle
        type: "Text",
        content: grant.token_name,
        variant: "subtitle1",
      },
      {
        // Repository selection detail
        type: "Text",
        content: `Repo selection: ${grant.repository_selection}`,
        variant: "caption",
        color: "gray",
      },
    ];

    // Compose the value: expiration icon + expiration text
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: statusIconId,
        color: statusColor,
        size: 20,
      },
      {
        type: "Text",
        content: expiresText,
        variant: "caption",
        color: statusColor,
      },
    ];

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Return a DataList container wrapping all items
  return {
    type: "DataList",
    childrenProps: dataListItems,
  };
}
