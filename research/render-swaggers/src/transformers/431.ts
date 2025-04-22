import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Repositories associated with a code security configuration and attachment status
    */
    export type code_security_configuration_repositories = {
        /**
         * The attachment status of the code security configuration on the repository.
        */
        status?: "attached" | "attaching" | "detached" | "removed" | "enforced" | "failed" | "updating" | "removed_by_enterprise";
        repository?: Schema.simple_repository;
    };
    /**
     * A GitHub repository.
     *
     * @title Simple Repository
    */
    export type simple_repository = {
        /**
         * A unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * The GraphQL identifier of the repository.
        */
        node_id: string;
        /**
         * The name of the repository.
        */
        name: string;
        /**
         * The full, globally unique, name of the repository.
        */
        full_name: string;
        owner: Schema.simple_user;
        /**
         * Whether the repository is private.
        */
        "private": boolean;
        /**
         * The URL to view the repository on GitHub.com.
        */
        html_url: string;
        /**
         * The repository description.
        */
        description: string | null;
        /**
         * Whether the repository is a fork.
        */
        fork: boolean;
        /**
         * The URL to get more information about the repository from the GitHub API.
        */
        url: string;
        /**
         * A template for the API URL to download the repository as an archive.
        */
        archive_url: string;
        /**
         * A template for the API URL to list the available assignees for issues in the repository.
        */
        assignees_url: string;
        /**
         * A template for the API URL to create or retrieve a raw Git blob in the repository.
        */
        blobs_url: string;
        /**
         * A template for the API URL to get information about branches in the repository.
        */
        branches_url: string;
        /**
         * A template for the API URL to get information about collaborators of the repository.
        */
        collaborators_url: string;
        /**
         * A template for the API URL to get information about comments on the repository.
        */
        comments_url: string;
        /**
         * A template for the API URL to get information about commits on the repository.
        */
        commits_url: string;
        /**
         * A template for the API URL to compare two commits or refs.
        */
        compare_url: string;
        /**
         * A template for the API URL to get the contents of the repository.
        */
        contents_url: string;
        /**
         * A template for the API URL to list the contributors to the repository.
        */
        contributors_url: string;
        /**
         * The API URL to list the deployments of the repository.
        */
        deployments_url: string;
        /**
         * The API URL to list the downloads on the repository.
        */
        downloads_url: string;
        /**
         * The API URL to list the events of the repository.
        */
        events_url: string;
        /**
         * The API URL to list the forks of the repository.
        */
        forks_url: string;
        /**
         * A template for the API URL to get information about Git commits of the repository.
        */
        git_commits_url: string;
        /**
         * A template for the API URL to get information about Git refs of the repository.
        */
        git_refs_url: string;
        /**
         * A template for the API URL to get information about Git tags of the repository.
        */
        git_tags_url: string;
        /**
         * A template for the API URL to get information about issue comments on the repository.
        */
        issue_comment_url: string;
        /**
         * A template for the API URL to get information about issue events on the repository.
        */
        issue_events_url: string;
        /**
         * A template for the API URL to get information about issues on the repository.
        */
        issues_url: string;
        /**
         * A template for the API URL to get information about deploy keys on the repository.
        */
        keys_url: string;
        /**
         * A template for the API URL to get information about labels of the repository.
        */
        labels_url: string;
        /**
         * The API URL to get information about the languages of the repository.
        */
        languages_url: string;
        /**
         * The API URL to merge branches in the repository.
        */
        merges_url: string;
        /**
         * A template for the API URL to get information about milestones of the repository.
        */
        milestones_url: string;
        /**
         * A template for the API URL to get information about notifications on the repository.
        */
        notifications_url: string;
        /**
         * A template for the API URL to get information about pull requests on the repository.
        */
        pulls_url: string;
        /**
         * A template for the API URL to get information about releases on the repository.
        */
        releases_url: string;
        /**
         * The API URL to list the stargazers on the repository.
        */
        stargazers_url: string;
        /**
         * A template for the API URL to get information about statuses of a commit.
        */
        statuses_url: string;
        /**
         * The API URL to list the subscribers on the repository.
        */
        subscribers_url: string;
        /**
         * The API URL to subscribe to notifications for this repository.
        */
        subscription_url: string;
        /**
         * The API URL to get information about tags on the repository.
        */
        tags_url: string;
        /**
         * The API URL to list the teams on the repository.
        */
        teams_url: string;
        /**
         * A template for the API URL to create or retrieve a raw Git tree of the repository.
        */
        trees_url: string;
        /**
         * The API URL to list the hooks on the repository.
        */
        hooks_url: string;
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
type IAutoViewTransformerInputType = Schema.code_security_configuration_repositories[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no data, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No Repositories Found\nThere are no code security configuration repositories to display.",
    };
  }

  // Map repository status to a chip color
  const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    attached: "success",
    enforced: "success",
    attaching: "info",
    updating: "info",
    detached: "gray",
    removed: "error",
    removed_by_enterprise: "error",
    failed: "error",
  };

  // Build a List component with one ListItem per repository
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((item) => {
    const repo = item.repository!;
    const status = item.status ?? "detached";

    // Primary status chip
    const statusChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: status.replace(/_/g, " "),
      color: statusColorMap[status] || "gray",
      variant: "outlined",
      size: "small",
    };

    // Optional privacy/fork chips
    const extraChips: IAutoView.IAutoViewChipProps[] = [];
    if (repo["private"]) {
      extraChips.push({
        type: "Chip",
        label: "Private",
        color: "warning",
        variant: "filled",
        size: "small",
      });
    }
    if (repo.fork) {
      extraChips.push({
        type: "Chip",
        label: "Fork",
        color: "gray",
        variant: "outlined",
        size: "small",
      });
    }

    // External link icon for the repo URL
    const linkIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "arrow-up-right-from-square",
      color: "blue",
      size: 20,
    };

    // Assemble endElement array: status + optional + link icon
    const endElements: (IAutoView.IAutoViewChipProps | IAutoView.IAutoViewIconProps)[] = [
      statusChip,
      ...extraChips,
      linkIcon,
    ];

    // Owner avatar on the left
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: repo.owner.avatar_url,
      name: repo.owner.login,
      variant: "info",
      size: 32,
    };

    return {
      type: "ListItem",
      title: repo.full_name,
      description: repo.description ?? "",
      startElement: avatar,
      endElement: endElements,
      // Make the entire list item clickable
      href: repo.html_url,
    };
  });

  // Return the List component
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: listItems,
  };
  return list;
}
