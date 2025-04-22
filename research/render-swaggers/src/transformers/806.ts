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
type IAutoViewTransformerInputType = Schema.commit;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract nested commit info
  const gitCommit = input.commit;
  const authorInfo = gitCommit.author;
  const authorName = authorInfo?.name ?? "Unknown Author";
  const rawDate = authorInfo?.date;
  // Format date for display
  const formattedDate = rawDate ? new Date(rawDate).toLocaleString() : "";

  // Prepare first line of commit message for header title
  const fullMessage = gitCommit.message;
  const firstLine = fullMessage.split("\n", 1)[0] || "Commit";

  // Build summary chips if stats are available
  const stats = input.stats;
  let summaryItem: IAutoView.IAutoViewDataListItemProps | null = null;
  if (stats) {
    const { additions = 0, deletions = 0, total = 0 } = stats;
    summaryItem = {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "Summary",
          variant: "subtitle2",
        },
      ],
      value: [
        {
          type: "Chip",
          label: `Additions: ${additions}`,
          color: "green",
          size: "small",
          variant: "outlined",
        },
        {
          type: "Chip",
          label: `Deletions: ${deletions}`,
          color: "red",
          size: "small",
          variant: "outlined",
        },
        {
          type: "Chip",
          label: `Total: ${total}`,
          color: "blue",
          size: "small",
          variant: "outlined",
        },
      ],
    };
  }

  // Build a DataListItem for each changed file
  const fileItems: IAutoView.IAutoViewDataListItemProps[] = [];
  if (input.files && input.files.length) {
    // Map of status to chip color
    const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
      added: "green",
      removed: "red",
      modified: "blue",
      renamed: "orange",
      copied: "teal",
      changed: "violet",
      unchanged: "gray",
    };
    for (const file of input.files) {
      fileItems.push({
        type: "DataListItem",
        label: [
          {
            type: "Text",
            content: file.filename,
            variant: "body2",
          },
        ],
        value: [
          {
            type: "Chip",
            label: file.status,
            color: statusColorMap[file.status] ?? "gray",
            size: "small",
            variant: "outlined",
          },
          {
            type: "Chip",
            label: `+${file.additions}`,
            color: "green",
            size: "small",
            variant: "outlined",
          },
          {
            type: "Chip",
            label: `-${file.deletions}`,
            color: "red",
            size: "small",
            variant: "outlined",
          },
        ],
      });
    }
  }

  // If no stats and no files, show a placeholder markdown
  const dataListChildren: IAutoView.IAutoViewDataListItemProps[] = [];
  if (summaryItem) {
    dataListChildren.push(summaryItem);
  }
  if (fileItems.length) {
    dataListChildren.push(...fileItems);
  }
  const dataListComponent: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListChildren.length
      ? dataListChildren
      : [
          {
            type: "DataListItem",
            label: [
              {
                type: "Text",
                content: "No changes",
                variant: "body2",
              },
            ],
          },
        ],
  };

  // Markdown component to render full commit message
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: `### Commit Message\n\n${fullMessage}`,
  };

  // Card header with commit summary
  const headerComponent: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: firstLine,
    description: formattedDate ? `${authorName} • ${formattedDate}` : authorName,
    // A simple code icon to represent the commit
    startElement: {
      type: "Icon",
      id: "code-branch",
      size: 24,
      color: "gray",
    },
  };

  // Card content combining message and file stats
  const contentComponent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [markdownComponent, dataListComponent],
  };

  // Footer buttons linking to GitHub resources
  const footerComponent: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Button",
        label: "View on GitHub",
        variant: "text",
        color: "primary",
        size: "small",
        href: input.html_url,
        startElement: {
          type: "Icon",
          id: "github",
          size: 16,
          color: "gray",
        },
      },
      {
        type: "Button",
        label: "View Comments",
        variant: "text",
        color: "primary",
        size: "small",
        href: input.comments_url,
        startElement: {
          type: "Icon",
          id: "comment",
          size: 16,
          color: "gray",
        },
      },
    ],
  };

  // Assemble into a vertical card for responsive display
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [headerComponent, contentComponent, footerComponent],
  };

  return card;
}
