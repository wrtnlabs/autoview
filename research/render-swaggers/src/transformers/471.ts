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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Handle empty list gracefully with a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No organization invitations available."
    };
  }

  // Map each invitation to a DataListItem component
  const childrenProps: IAutoView.IAutoViewDataListItemProps[] = input.map(invitation => {
    // Build the label: inviter's avatar and name/login
    const inviterName = invitation.inviter.name ?? invitation.inviter.login;
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Avatar",
        src: invitation.inviter.avatar_url,
        name: inviterName,
        variant: "primary",
        size: 40
      },
      {
        type: "Text",
        // Display the inviter's name prominently
        variant: "body1",
        content: inviterName,
        color: "primary"
      }
    ];

    // Build the value: email, role chip, creation date, and failure indicator (if any)
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    // Email (if present, else display a dash)
    valueComponents.push({
      type: "Text",
      variant: "body2",
      content: invitation.email ?? "—",
      color: invitation.email ? "tertiary" : "disabled"
    });

    // Role as a colored chip
    valueComponents.push({
      type: "Chip",
      label: invitation.role,
      variant: "outlined",
      color: "info",
      size: "small"
    });

    // Created date as human-readable text
    let createdLabel = invitation.created_at;
    try {
      const d = new Date(invitation.created_at);
      if (!isNaN(d.getTime())) {
        createdLabel = d.toLocaleDateString(undefined, {
          year: "numeric", month: "short", day: "numeric"
        });
      }
    } catch {
      // Fall back to raw string on parse error
    }
    valueComponents.push({
      type: "Text",
      variant: "caption",
      content: createdLabel,
      color: "gray"
    });

    // If the invitation failed, add a warning icon with tooltip
    if (invitation.failed_at) {
      valueComponents.push({
        type: "Tooltip",
        message: invitation.failed_reason ?? "Invitation failed",
        childrenProps: {
          type: "Icon",
          id: "exclamation-triangle",
          color: "orange",
          size: 16
        }
      });
    }

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents
    };
  });

  // Return the full data list
  return {
    type: "DataList",
    childrenProps
  };
}
