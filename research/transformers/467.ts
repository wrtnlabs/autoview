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
  // Destructure all relevant fields from the input for clarity.
  const {
    id,
    account,
    repository_selection,
    app_id,
    target_id,
    target_type,
    permissions,
    events,
    created_at,
    updated_at,
    single_file_name,
    has_multiple_single_files,
    single_file_paths,
    app_slug,
    suspended_by,
    suspended_at,
    contact_email,
  } = input;

  // Helper to render simple text
  const makeText = (value: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: value,
  });

  // Header: shows the application slug and installation number, with an avatar if available.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `App: ${app_slug}`,
    description: `Installation #${id}`,
    // If the account has an avatar_url and login, show it.
    startElement:
      account && typeof (account as any).avatar_url === "string"
        ? {
            type: "Avatar",
            src: (account as any).avatar_url,
            name: (account as any).login,
          }
        : undefined,
    // Show repository selection as a chip (all vs selected).
    endElement: {
      type: "Chip",
      label: repository_selection,
      variant: "outlined",
    },
  };

  // Build the list of data items for the main body.
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Installation & App identifiers
  dataItems.push({
    type: "DataListItem",
    label: [makeText("Installation ID")],
    value: makeText(id.toString()),
  });
  dataItems.push({
    type: "DataListItem",
    label: [makeText("GitHub App ID")],
    value: makeText(app_id.toString()),
  });

  // Target scope (user/org) information
  dataItems.push({
    type: "DataListItem",
    label: [makeText("Target")],
    value: makeText(`${target_type} #${target_id}`),
  });

  // Dates
  dataItems.push({
    type: "DataListItem",
    label: [makeText("Created At")],
    value: makeText(new Date(created_at).toLocaleString()),
  });
  dataItems.push({
    type: "DataListItem",
    label: [makeText("Updated At")],
    value: makeText(new Date(updated_at).toLocaleString()),
  });

  // Suspension info, if present
  if (suspended_at) {
    dataItems.push({
      type: "DataListItem",
      label: [makeText("Suspended At")],
      value: makeText(new Date(suspended_at).toLocaleString()),
    });
  }
  if (suspended_by && typeof suspended_by === "object") {
    dataItems.push({
      type: "DataListItem",
      label: [makeText("Suspended By")],
      // Represent suspended_by as an avatar with login
      value: {
        type: "Avatar",
        src: suspended_by.avatar_url,
        name: suspended_by.login,
      },
    });
  }

  // Single file or multiple files info
  if (single_file_name != null) {
    dataItems.push({
      type: "DataListItem",
      label: [makeText("Single File")],
      value: makeText(single_file_name),
    });
  } else if (has_multiple_single_files && Array.isArray(single_file_paths)) {
    dataItems.push({
      type: "DataListItem",
      label: [makeText("Files")],
      value: makeText(`${single_file_paths.length} files selected`),
    });
  }

  // Contact email, if any
  if (contact_email) {
    dataItems.push({
      type: "DataListItem",
      label: [makeText("Contact Email")],
      value: makeText(contact_email),
    });
  }

  // Permissions: render as a markdown code block for readability
  dataItems.push({
    type: "DataListItem",
    label: [makeText("Permissions")],
    value: {
      type: "Markdown",
      content:
        "json\n" + JSON.stringify(permissions, null, 2) + "\n```",
    },
  });

  // Events: show as a group of chips
  if (Array.isArray(events) && events.length > 0) {
    const eventChips: IAutoView.IAutoViewChipProps[] = events.map((evt) => ({
      type: "Chip",
      label: evt,
      variant: "filled",
      size: "small",
    }));
    dataItems.push({
      type: "DataListItem",
      label: [makeText("Events")],
      value: {
        type: "ChipGroup",
        childrenProps: eventChips,
      },
    });
  }

  // Compose the DataList component with all items
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataItems,
  };

  // Wrap the data list in a CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Final layout: a vertical card with header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
