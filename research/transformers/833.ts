import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Commit
     *
     * @title Commit
    */
    export type commit = {
        url: string & tags.Format<"uri">;
        sha: string;
        node_id: string;
        html_url: string & tags.Format<"uri">;
        comments_url: string & tags.Format<"uri">;
        commit: {
            url: string & tags.Format<"uri">;
            author: Schema.nullable_git_user;
            committer: Schema.nullable_git_user;
            message: string;
            comment_count: number & tags.Type<"int32">;
            tree: {
                sha: string;
                url: string & tags.Format<"uri">;
            };
            verification?: Schema.verification;
        };
        author: any | any | null;
        committer: any | any | null;
        parents: {
            sha: string;
            url: string & tags.Format<"uri">;
            html_url?: string & tags.Format<"uri">;
        }[];
        stats?: {
            additions?: number & tags.Type<"int32">;
            deletions?: number & tags.Type<"int32">;
            total?: number & tags.Type<"int32">;
        };
        files?: Schema.diff_entry[];
    };
    /**
     * Metaproperties for Git author/committer information.
     *
     * @title Git User
    */
    export type nullable_git_user = {
        name?: string;
        email?: string;
        date?: string;
    } | null;
    /**
     * @title Verification
    */
    export type verification = {
        verified: boolean;
        reason: string;
        payload: string | null;
        signature: string | null;
        verified_at: string | null;
    };
    export type simple_user = any;
    export type empty_object = any;
    /**
     * Diff Entry
     *
     * @title Diff Entry
    */
    export type diff_entry = {
        sha: string;
        filename: string;
        status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
        additions: number & tags.Type<"int32">;
        deletions: number & tags.Type<"int32">;
        changes: number & tags.Type<"int32">;
        blob_url: string & tags.Format<"uri">;
        raw_url: string & tags.Format<"uri">;
        contents_url: string & tags.Format<"uri">;
        patch?: string;
        previous_filename?: string;
    };
}
type IAutoViewTransformerInputType = Schema.commit[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform each commit into a ListItem with visual decorations
  const items: IAutoView.IAutoViewListItemProps[] = input.map(commit => {
    // Safely extract author name and date
    const authorName = commit.commit.author?.name ?? 'Unknown';
    const rawDate = commit.commit.author?.date;
    const formattedDate = rawDate ? new Date(rawDate).toLocaleString() : '';
    // Safely extract stats, defaulting to zero
    const additions = commit.stats?.additions ?? 0;
    const deletions = commit.stats?.deletions ?? 0;
    const total = commit.stats?.total ?? 0;
    // Prepare end elements: additions, deletions, total and a view button
    const endElements: Array<IAutoView.IAutoViewChipProps | IAutoView.IAutoViewButtonProps> = [
      {
        type: 'Chip',
        label: `+${additions}`,
        color: 'success',
        size: 'small',
        variant: 'filled',
      },
      {
        type: 'Chip',
        label: `-${deletions}`,
        color: 'error',
        size: 'small',
        variant: 'filled',
      },
      {
        type: 'Chip',
        label: `${total}`,
        color: 'info',
        size: 'small',
        variant: 'outlined',
      },
      {
        type: 'Button',
        label: 'View',
        href: commit.html_url,
        variant: 'text',
        size: 'small',
      },
    ];
    return {
      type: 'ListItem',
      // Use the first line of the commit message as the title
      title: commit.commit.message.split('\n')[0],
      // Display author name and date
      description: formattedDate
        ? `${authorName} • ${formattedDate}`
        : authorName,
      // A git-branch icon as the leading element
      startElement: {
        type: 'Icon',
        id: 'code-branch',
        color: 'blue',
        size: 24,
      },
      // Show stats and a button to view the commit
      endElement: endElements,
    };
  });

  // Wrap all items in a responsive list
  return {
    type: 'List',
    childrenProps: items,
  };
}
