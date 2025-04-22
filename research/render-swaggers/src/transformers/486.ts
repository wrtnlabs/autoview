import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsOrganizationRoles {
        export type GetResponse = {
            /**
             * The total number of organization roles available to the organization.
            */
            total_count?: number & tags.Type<"int32">;
            /**
             * The list of organization roles available to the organization.
            */
            roles?: Schema.organization_role[];
        };
    }
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
type IAutoViewTransformerInputType = Schema.IApiOrgsOrganizationRoles.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input with sensible defaults
  const total = input.total_count ?? input.roles?.length ?? 0;
  const roles = input.roles ?? [];

  // If there are no roles, display a friendly markdown message.
  if (roles.length === 0) {
    return {
      type: "Markdown",
      content: `## No Roles Found

There are no organization roles to display.`
    };
  }

  // Build a DataListItem for each role
  const items: IAutoView.IAutoViewDataListItemProps[] = roles.map(role => {
    // Prepare an avatar for the organization that owns the role
    const orgAvatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: role.organization?.avatar_url,
      name: role.organization?.login ?? "Org",
      variant: "primary",
      size: 32
    };

    // Prepare the role name as a header text
    const roleTitle: IAutoView.IAutoViewTextProps = {
      type: "Text",
      variant: "h6",
      content: role.name
    };

    // Prepare a chip summarizing the number of permissions
    const permissionChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${role.permissions.length} permission${role.permissions.length !== 1 ? "s" : ""}`,
      size: "small",
      variant: "outlined",
      color: "primary"
    };

    // If the role has a base_role, display it as an additional colored chip
    const baseRoleChip: IAutoView.IAutoViewChipProps | undefined = role.base_role
      ? {
          type: "Chip",
          label: role.base_role,
          size: "small",
          variant: "filled",
          color: "secondary"
        }
      : undefined;

    // Compose the left label: [avatar, roleTitle]
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      orgAvatar,
      roleTitle
    ];

    // Compose the right value: permissionChip + optional baseRoleChip
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      permissionChip
    ];
    if (baseRoleChip) valueComponents.push(baseRoleChip);

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents
    };
  });

  // Wrap items into a DataList
  const list: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Build the header of the card
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Organization Roles",
    description: `Total: ${total}`
  };

  // Build the content of the card containing the list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: list
  };

  // Return a vertical card that holds the header and the list
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content]
  };

  return card;
}
