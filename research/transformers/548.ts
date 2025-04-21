import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Organization Invitation
     *
     * @title Organization Invitation
    */
    export type organization_invitation = {
        id: number & tags.Type<"int32">;
        login: string | null;
        email: string | null;
        role: string;
        created_at: string;
        failed_at?: string | null;
        failed_reason?: string | null;
        inviter: Schema.simple_user;
        team_count: number & tags.Type<"int32">;
        node_id: string;
        invitation_teams_url: string;
        invitation_source?: string;
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
type IAutoViewTransformerInputType = Schema.organization_invitation[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Helper to format ISO date strings into a user‐friendly locale string.
  const formatDate = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleString() : "N/A";

  // Transform each invitation into a DataListItem component
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map(
    (invitation) => {
      // Compose the label as an avatar + the inviter's login name
      const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
        {
          type: "Avatar",
          src: invitation.inviter.avatar_url,
          name: invitation.inviter.login,
          size: 32,
          variant: "primary",
        },
        {
          type: "Text",
          content: invitation.inviter.login,
          variant: "subtitle1",
        },
      ];

      // Build a Markdown block for the details
      let md = "";
      md += `**Email:** ${invitation.email ?? "N/A"}  \n`;
      md += `**Role:** ${invitation.role}  \n`;
      md += `**Invited At:** ${formatDate(invitation.created_at)}  \n`;
      // If invitation failed, append failure info
      if (invitation.failed_at) {
        md += `\n**Failed At:** ${formatDate(invitation.failed_at)}  \n`;
        md += `**Reason:** ${invitation.failed_reason ?? "Unknown"}  \n`;
      }

      const valueComponent: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: md,
      };

      return {
        type: "DataListItem",
        label: labelComponents,
        value: [valueComponent],
      };
    }
  );

  // Return a DataList wrapping all invitation items.
  return {
    type: "DataList",
    childrenProps: items,
  };
}
