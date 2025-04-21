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
type IAutoViewTransformerInputType = Schema.organization_invitation;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Determine invitation status and corresponding UI color
  const isFailed = input.failed_at != null;
  const statusLabel = isFailed ? "Failed" : "Invited";
  const statusColor = (isFailed ? "error" : "info") as
    | "error"
    | "info";

  // Header: show inviter's avatar, name/login, and status chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.inviter.login,
    // Use the inviter's real name if available
    description: input.inviter.name ?? undefined,
    startElement: {
      type: "Avatar",
      src: input.inviter.avatar_url,
      name: input.inviter.name ?? input.inviter.login,
      variant: "primary",
      size: 40,
    },
    endElement: {
      type: "Chip",
      label: statusLabel,
      color: statusColor,
      variant: "filled",
      size: "small",
    },
  };

  // Helper to create a DataListItem with a label and a value component
  function makeItem(
    labelText: string,
    value: IAutoView.IAutoViewPresentationComponentProps
  ): IAutoView.IAutoViewDataListItemProps {
    return {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: labelText,
          variant: "subtitle2",
          color: "tertiary",
        },
      ],
      value: [value],
    };
  }

  // Build the array of details to display
  const details: IAutoView.IAutoViewDataListItemProps[] = [];

  // Email
  details.push(
    makeItem(
      "Email",
      {
        type: "Text",
        content: input.email ?? "N/A",
        variant: "body1",
      }
    )
  );

  // Role
  details.push(
    makeItem(
      "Role",
      {
        type: "Text",
        content: input.role,
        variant: "body1",
      }
    )
  );

  // Created at (formatted for readability)
  details.push(
    makeItem(
      "Created At",
      {
        type: "Text",
        content: new Date(input.created_at).toLocaleString(),
        variant: "body1",
      }
    )
  );

  // Team count
  details.push(
    makeItem(
      "Teams",
      {
        type: "Text",
        content: input.team_count.toString(),
        variant: "body1",
      }
    )
  );

  // Node ID
  details.push(
    makeItem(
      "Node ID",
      {
        type: "Text",
        content: input.node_id,
        variant: "body1",
      }
    )
  );

  // Invitation source (optional)
  if (input.invitation_source) {
    details.push(
      makeItem(
        "Source",
        {
          type: "Text",
          content: input.invitation_source,
          variant: "body1",
        }
      )
    );
  }

  // Failure details (if present)
  if (isFailed) {
    details.push(
      makeItem(
        "Failed At",
        {
          type: "Text",
          content: new Date(input.failed_at!).toLocaleString(),
          variant: "body1",
        }
      )
    );
    if (input.failed_reason) {
      // show failure reason in markdown to preserve formatting
      details.push(
        makeItem(
          "Reason",
          {
            type: "Markdown",
            content: input.failed_reason,
          }
        )
      );
    }
  }

  // Teams URL action button
  const viewTeamsButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "View Teams",
    href: input.invitation_teams_url,
    variant: "outlined",
    color: "primary",
    size: "medium",
  };

  // Wrap details into a DataList component
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: details,
    },
  };

  // Footer: action(s)
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: viewTeamsButton,
  };

  // Final VerticalCard composition
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
