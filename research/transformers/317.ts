import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Installation
     *
     * @title Installation
    */
    export type installation = {
        /**
         * The ID of the installation.
        */
        id: number & tags.Type<"int32">;
        account: any | any | null;
        /**
         * Describe whether all repositories have been selected or there's a selection involved
        */
        repository_selection: "all" | "selected";
        access_tokens_url: string & tags.Format<"uri">;
        repositories_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        app_id: number & tags.Type<"int32">;
        /**
         * The ID of the user or organization this token is being scoped to.
        */
        target_id: number & tags.Type<"int32">;
        target_type: string;
        permissions: Schema.app_permissions;
        events: string[];
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        single_file_name: string | null;
        has_multiple_single_files?: boolean;
        single_file_paths?: string[];
        app_slug: string;
        suspended_by: Schema.nullable_simple_user;
        suspended_at: (string & tags.Format<"date-time">) | null;
        contact_email?: string | null;
    };
    export type simple_user = any;
    export type enterprise = any;
    /**
     * The permissions granted to the user access token.
     *
     * @title App Permissions
    */
    export type app_permissions = {
        /**
         * The level of permission to grant the access token for GitHub Actions workflows, workflow runs, and artifacts.
        */
        actions?: "read" | "write";
        /**
         * The level of permission to grant the access token for repository creation, deletion, settings, teams, and collaborators creation.
        */
        administration?: "read" | "write";
        /**
         * The level of permission to grant the access token for checks on code.
        */
        checks?: "read" | "write";
        /**
         * The level of permission to grant the access token to create, edit, delete, and list Codespaces.
        */
        codespaces?: "read" | "write";
        /**
         * The level of permission to grant the access token for repository contents, commits, branches, downloads, releases, and merges.
        */
        contents?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage Dependabot secrets.
        */
        dependabot_secrets?: "read" | "write";
        /**
         * The level of permission to grant the access token for deployments and deployment statuses.
        */
        deployments?: "read" | "write";
        /**
         * The level of permission to grant the access token for managing repository environments.
        */
        environments?: "read" | "write";
        /**
         * The level of permission to grant the access token for issues and related comments, assignees, labels, and milestones.
        */
        issues?: "read" | "write";
        /**
         * The level of permission to grant the access token to search repositories, list collaborators, and access repository metadata.
        */
        metadata?: "read" | "write";
        /**
         * The level of permission to grant the access token for packages published to GitHub Packages.
        */
        packages?: "read" | "write";
        /**
         * The level of permission to grant the access token to retrieve Pages statuses, configuration, and builds, as well as create new builds.
        */
        pages?: "read" | "write";
        /**
         * The level of permission to grant the access token for pull requests and related comments, assignees, labels, milestones, and merges.
        */
        pull_requests?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and edit custom properties for a repository, when allowed by the property.
        */
        repository_custom_properties?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage the post-receive hooks for a repository.
        */
        repository_hooks?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage repository projects, columns, and cards.
        */
        repository_projects?: "read" | "write" | "admin";
        /**
         * The level of permission to grant the access token to view and manage secret scanning alerts.
        */
        secret_scanning_alerts?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage repository secrets.
        */
        secrets?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and manage security events like code scanning alerts.
        */
        security_events?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage just a single file.
        */
        single_file?: "read" | "write";
        /**
         * The level of permission to grant the access token for commit statuses.
        */
        statuses?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage Dependabot alerts.
        */
        vulnerability_alerts?: "read" | "write";
        /**
         * The level of permission to grant the access token to update GitHub Actions workflow files.
        */
        workflows?: "write";
        /**
         * The level of permission to grant the access token for organization teams and members.
        */
        members?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage access to an organization.
        */
        organization_administration?: "read" | "write";
        /**
         * The level of permission to grant the access token for custom repository roles management.
        */
        organization_custom_roles?: "read" | "write";
        /**
         * The level of permission to grant the access token for custom organization roles management.
        */
        organization_custom_org_roles?: "read" | "write";
        /**
         * The level of permission to grant the access token for custom property management.
        */
        organization_custom_properties?: "read" | "write" | "admin";
        /**
         * The level of permission to grant the access token for managing access to GitHub Copilot for members of an organization with a Copilot Business subscription. This property is in public preview and is subject to change.
        */
        organization_copilot_seat_management?: "write";
        /**
         * The level of permission to grant the access token to view and manage announcement banners for an organization.
        */
        organization_announcement_banners?: "read" | "write";
        /**
         * The level of permission to grant the access token to view events triggered by an activity in an organization.
        */
        organization_events?: "read";
        /**
         * The level of permission to grant the access token to manage the post-receive hooks for an organization.
        */
        organization_hooks?: "read" | "write";
        /**
         * The level of permission to grant the access token for viewing and managing fine-grained personal access token requests to an organization.
        */
        organization_personal_access_tokens?: "read" | "write";
        /**
         * The level of permission to grant the access token for viewing and managing fine-grained personal access tokens that have been approved by an organization.
        */
        organization_personal_access_token_requests?: "read" | "write";
        /**
         * The level of permission to grant the access token for viewing an organization's plan.
        */
        organization_plan?: "read";
        /**
         * The level of permission to grant the access token to manage organization projects and projects public preview (where available).
        */
        organization_projects?: "read" | "write" | "admin";
        /**
         * The level of permission to grant the access token for organization packages published to GitHub Packages.
        */
        organization_packages?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage organization secrets.
        */
        organization_secrets?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and manage GitHub Actions self-hosted runners available to an organization.
        */
        organization_self_hosted_runners?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and manage users blocked by the organization.
        */
        organization_user_blocking?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage team discussions and related comments.
        */
        team_discussions?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage the email addresses belonging to a user.
        */
        email_addresses?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage the followers belonging to a user.
        */
        followers?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage git SSH keys.
        */
        git_ssh_keys?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and manage GPG keys belonging to a user.
        */
        gpg_keys?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and manage interaction limits on a repository.
        */
        interaction_limits?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage the profile settings belonging to a user.
        */
        profile?: "write";
        /**
         * The level of permission to grant the access token to list and manage repositories a user is starring.
        */
        starring?: "read" | "write";
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
type IAutoViewTransformerInputType = Schema.installation;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to create a Text component
  const makeText = (
    content: string,
    variant: IAutoView.IAutoViewTextProps["variant"] = "body2",
    color?: IAutoView.IAutoViewTextProps["color"]
  ): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content,
    variant,
    color,
  });

  // Helper to format ISO date strings for readability
  const formatDate = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleString() : "—";

  // Build the DataList items, each with a label and a value component
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // App Slug
  listItems.push({
    type: "DataListItem",
    label: [makeText("App Slug", "subtitle2")],
    value: makeText(input.app_slug, "body2"),
  });

  // Repository selection
  listItems.push({
    type: "DataListItem",
    label: [makeText("Repository Selection", "subtitle2")],
    value: makeText(input.repository_selection, "body2"),
  });

  // Target info
  listItems.push({
    type: "DataListItem",
    label: [makeText("Target", "subtitle2")],
    value: makeText(`${input.target_type} (ID: ${input.target_id})`, "body2"),
  });

  // URLs section: render as Markdown links for better UX
  listItems.push({
    type: "DataListItem",
    label: [makeText("Links", "subtitle2")],
    value: {
      type: "Markdown",
      content:
        `- [Access Tokens](${input.access_tokens_url})\n` +
        `- [Repositories](${input.repositories_url})\n` +
        `- [HTML Dashboard](${input.html_url})`,
    },
  });

  // Created and updated timestamps
  listItems.push({
    type: "DataListItem",
    label: [makeText("Created At", "subtitle2")],
    value: makeText(formatDate(input.created_at), "body2"),
  });
  listItems.push({
    type: "DataListItem",
    label: [makeText("Updated At", "subtitle2")],
    value: makeText(formatDate(input.updated_at), "body2"),
  });

  // Events: display as a group of Chips for quick scanning
  if (input.events && input.events.length > 0) {
    const chips = input.events.map(
      (evt): IAutoView.IAutoViewChipProps => ({
        type: "Chip",
        label: evt,
        variant: "filled",
        size: "small",
      })
    );
    listItems.push({
      type: "DataListItem",
      label: [makeText("Events", "subtitle2")],
      value: {
        type: "ChipGroup",
        childrenProps: chips,
      },
    });
  }

  // Permissions: collapse large JSON into a Markdown code block
  if (input.permissions) {
    listItems.push({
      type: "DataListItem",
      label: [makeText("Permissions", "subtitle2")],
      value: {
        type: "Markdown",
        content:
          "json\n" +
          JSON.stringify(input.permissions, null, 2) +
          "\n```",
      },
    });
  }

  // Single-file info
  if (input.single_file_name) {
    listItems.push({
      type: "DataListItem",
      label: [makeText("Single File", "subtitle2")],
      value: makeText(input.single_file_name, "body2"),
    });
    if (input.has_multiple_single_files && Array.isArray(input.single_file_paths)) {
      // show additional paths as markdown list
      const mdList = input.single_file_paths
        .map((p) => `- ${p}`)
        .join("\n");
      listItems.push({
        type: "DataListItem",
        label: [makeText("Other Files", "subtitle2")],
        value: {
          type: "Markdown",
          content: mdList,
        },
      });
    }
  }

  // Suspension info
  if (input.suspended_by) {
    listItems.push({
      type: "DataListItem",
      label: [makeText("Suspended By", "subtitle2")],
      value: makeText(input.suspended_by.login, "body2"),
    });
    listItems.push({
      type: "DataListItem",
      label: [makeText("Suspended At", "subtitle2")],
      value: makeText(formatDate(input.suspended_at), "body2"),
    });
  }

  // Contact email if present
  if (input.contact_email) {
    listItems.push({
      type: "DataListItem",
      label: [makeText("Contact Email", "subtitle2")],
      value: makeText(input.contact_email, "body2"),
    });
  }

  // Compose the final VerticalCard with a header and content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: `Installation #${input.id}`,
        description: `App ID: ${input.app_id}`,
        // Use the suspended_by avatar if available, otherwise fall back to a generic user icon
        startElement: input.suspended_by
          ? {
              type: "Avatar",
              src: input.suspended_by.avatar_url,
              name: input.suspended_by.login,
            }
          : {
              type: "Icon",
              id: "user",
            },
      },
      {
        type: "CardContent",
        // Embed a DataList for all key/value pairs
        childrenProps: {
          type: "DataList",
          childrenProps: listItems,
        },
      },
    ],
  };
}
