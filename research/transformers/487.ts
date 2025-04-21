import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Organization roles
     *
     * @title Organization Role
    */
    export type organization_role = {
        /**
         * The unique identifier of the role.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the role.
        */
        name: string;
        /**
         * A short description about who this role is for or what permissions it grants.
        */
        description?: string | null;
        /**
         * The system role from which this role inherits permissions.
        */
        base_role?: "read" | "triage" | "write" | "maintain" | "admin" | null;
        /**
         * Source answers the question, "where did this role come from?"
        */
        source?: "Organization" | "Enterprise" | "Predefined" | null;
        /**
         * A list of permissions included in this role.
        */
        permissions: string[];
        organization: Schema.nullable_simple_user;
        /**
         * The date and time the role was created.
        */
        created_at: string;
        /**
         * The date and time the role was last updated.
        */
        updated_at: string;
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
type IAutoViewTransformerInputType = Schema.organization_role;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Compose the card header with role name, description, and organization avatar if available
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.description ?? undefined,
    // Show organization avatar and login as the start element if organization is present
    startElement: input.organization
      ? {
          type: "Avatar",
          src: input.organization.avatar_url,
          name: input.organization.login,
          variant: "primary",
          size: 40,
        }
      : undefined,
  };

  // Helper to wrap a string into a Text component
  const makeText = (
    text: string,
    variant: IAutoView.IAutoViewTextProps["variant"] = "body2",
    color?: IAutoView.IAutoViewTextProps["color"]
  ): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
    variant,
    color,
  });

  // Build a list of key‐value pairs for the core fields of the role
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: [makeText("ID", "subtitle2")],
      value: [makeText(input.id.toString(), "body1")],
    },
    {
      type: "DataListItem",
      label: [makeText("Base Role", "subtitle2")],
      value: [
        makeText(input.base_role != null ? input.base_role : "—", "body1"),
      ],
    },
    {
      type: "DataListItem",
      label: [makeText("Source", "subtitle2")],
      value: [makeText(input.source ?? "—", "body1")],
    },
    {
      type: "DataListItem",
      label: [makeText("Created At", "subtitle2")],
      // Display the raw timestamp; formatting is delegated to the consumer if needed
      value: [makeText(input.created_at, "body1")],
    },
    {
      type: "DataListItem",
      label: [makeText("Updated At", "subtitle2")],
      value: [makeText(input.updated_at, "body1")],
    },
  ];

  // Wrap the list of items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataItems,
  };

  // Card content holds the DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Render permissions as a compact ChipGroup; if no permissions, show a placeholder text
  const permissionChips =
    input.permissions.length > 0
      ? input.permissions.map((perm) => ({
          type: "Chip" as const,
          label: perm,
          variant: "outlined" as const,
          size: "small" as const,
          color: "primary" as const,
        }))
      : [
          {
            type: "Chip" as const,
            label: "No permissions",
            variant: "outlined" as const,
            size: "small" as const,
            color: "gray" as const,
          },
        ];

  const chipGroup: IAutoView.IAutoViewChipGroupProps = {
    type: "ChipGroup",
    childrenProps: permissionChips,
    // On small screens, limit the number of visible chips
    maxItems: 5,
  };

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: chipGroup,
  };

  // Compose a vertical card that is responsive and stacks header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
