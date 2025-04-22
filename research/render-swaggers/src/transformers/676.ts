import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A CodeQL database.
     *
     * @title CodeQL Database
    */
    export type code_scanning_codeql_database = {
        /**
         * The ID of the CodeQL database.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the CodeQL database.
        */
        name: string;
        /**
         * The language of the CodeQL database.
        */
        language: string;
        uploader: Schema.simple_user;
        /**
         * The MIME type of the CodeQL database file.
        */
        content_type: string;
        /**
         * The size of the CodeQL database file in bytes.
        */
        size: number & tags.Type<"int32">;
        /**
         * The date and time at which the CodeQL database was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the CodeQL database was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The URL at which to download the CodeQL database. The `Accept` header must be set to the value of the `content_type` property.
        */
        url: string;
        /**
         * The commit SHA of the repository at the time the CodeQL database was created.
        */
        commit_oid?: string | null;
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
type IAutoViewTransformerInputType = Schema.code_scanning_codeql_database[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: convert bytes to human-readable string
  function humanFileSize(bytes: number): string {
    const thresh = 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = ['KB', 'MB', 'GB', 'TB'];
    let u = -1;
    let value = bytes;
    do {
      value /= thresh;
      u++;
    } while (Math.abs(value) >= thresh && u < units.length - 1);
    return value.toFixed(1) + ' ' + units[u];
  }

  // If no data, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No CodeQL databases available.\n\nThere are no databases to display at this time."
    };
  }

  // Sort databases by creation date (newest first)
  const sorted = [...input].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Map each database to a ListItem component
  const children = sorted.map(db => {
    // Truncate commit SHA if present
    const commitSha = db.commit_oid ? db.commit_oid.substring(0, 7) : null;

    // Build endElement array: content type chip, commit chip (if any), download button
    const endElements: IAutoView.IAutoViewComponentProps[] = [];

    // Content type chip
    endElements.push({
      type: "Chip",
      label: db.content_type,
      size: "small",
      variant: "outlined"
    });

    // Commit SHA chip
    if (commitSha) {
      endElements.push({
        type: "Chip",
        label: `\u{1F5D3} ${commitSha}`, // calendar icon unicode as leading indicator
        size: "small",
        variant: "outlined",
        color: "primary"
      });
    }

    // Download button with download icon
    endElements.push({
      type: "Button",
      label: "Download",
      href: db.url,
      variant: "text",
      size: "small",
      startElement: {
        type: "Icon",
        id: "download",
        color: "blue",
        size: 16
      }
    });

    return {
      type: "ListItem",
      title: db.name,
      description: `Language: ${db.language} | Size: ${humanFileSize(db.size)}`,
      // Uploader avatar as leading element
      startElement: {
        type: "Avatar",
        src: db.uploader.avatar_url,
        name: db.uploader.login,
        variant: "info",
        size: 40
      },
      endElement: endElements
    } as IAutoView.IAutoViewListItemProps;
  });

  // Compose and return the List component
  return {
    type: "List",
    childrenProps: children
  } as IAutoView.IAutoViewListProps;
}
