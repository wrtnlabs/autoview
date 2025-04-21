import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Private User
     *
     * @title Private User
    */
    export type private_user = {
        login: string;
        id: number & tags.Type<"int32">;
        user_view_type?: string;
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
        name: string | null;
        company: string | null;
        blog: string | null;
        location: string | null;
        email: (string & tags.Format<"email">) | null;
        notification_email?: (string & tags.Format<"email">) | null;
        hireable: boolean | null;
        bio: string | null;
        twitter_username?: string | null;
        public_repos: number & tags.Type<"int32">;
        public_gists: number & tags.Type<"int32">;
        followers: number & tags.Type<"int32">;
        following: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        private_gists: number & tags.Type<"int32">;
        total_private_repos: number & tags.Type<"int32">;
        owned_private_repos: number & tags.Type<"int32">;
        disk_usage: number & tags.Type<"int32">;
        collaborators: number & tags.Type<"int32">;
        two_factor_authentication: boolean;
        plan?: {
            collaborators: number & tags.Type<"int32">;
            name: string;
            space: number & tags.Type<"int32">;
            private_repos: number & tags.Type<"int32">;
        };
        business_plus?: boolean;
        ldap_dn?: string;
    };
}
type IAutoViewTransformerInputType = Schema.private_user;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Convert date strings into human‐readable format
  const createdDate = new Date(input.created_at).toLocaleDateString();
  const updatedDate = new Date(input.updated_at).toLocaleDateString();

  // 1. Card media: full‐width user avatar
  const media: IAutoView.IAutoViewCardMediaProps = {
    type: "CardMedia",
    src: input.avatar_url,
  };

  // 2. Card header: avatar, name/login, bio, and a followers chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // If the user has set a display name, use it; otherwise, fall back to login
    title: input.name ?? input.login,
    // Include bio only when present
    description: input.bio ?? undefined,
    startElement: {
      type: "Avatar",
      src: input.avatar_url,
      name: input.login,
      size: 56,
      variant: "primary",
    },
    endElement: {
      type: "Chip",
      label: `${input.followers} Followers`,
      color: "primary",
      size: "small",
      variant: "filled",
    },
  };

  // 3. Build a data list of key stats
  const statsItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Public Repos" },
      value: { type: "Text", content: input.public_repos.toString() },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Public Gists" },
      value: { type: "Text", content: input.public_gists.toString() },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Following" },
      value: { type: "Text", content: input.following.toString() },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Followers" },
      value: { type: "Text", content: input.followers.toString() },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Account Created" },
      value: { type: "Text", content: createdDate },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Last Updated" },
      value: { type: "Text", content: updatedDate },
    },
  ];
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: statsItems,
  };
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // 4. Card footer: a button linking to the GitHub profile
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      variant: "outlined",
      color: "primary",
      size: "medium",
      label: "View Profile",
      href: input.html_url,
      startElement: {
        type: "Icon",
        id: "github",
        color: "gray",
        size: 20,
      },
    },
  };

  // 5. Assemble a vertical card with media, header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [media, header, content, footer],
  };
}
