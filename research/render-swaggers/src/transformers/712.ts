import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * File Commit
     *
     * @title File Commit
    */
    export type file_commit = {
        content: {
            name?: string;
            path?: string;
            sha?: string;
            size?: number & tags.Type<"int32">;
            url?: string;
            html_url?: string;
            git_url?: string;
            download_url?: string;
            type?: string;
            _links?: {
                self?: string;
                git?: string;
                html?: string;
            };
        } | null;
        commit: {
            sha?: string;
            node_id?: string;
            url?: string;
            html_url?: string;
            author?: {
                date?: string;
                name?: string;
                email?: string;
            };
            committer?: {
                date?: string;
                name?: string;
                email?: string;
            };
            message?: string;
            tree?: {
                url?: string;
                sha?: string;
            };
            parents?: {
                url?: string;
                html_url?: string;
                sha?: string;
            }[];
            verification?: {
                verified?: boolean;
                reason?: string;
                signature?: string | null;
                payload?: string | null;
                verified_at?: string | null;
            };
        };
    };
}
type IAutoViewTransformerInputType = Schema.file_commit;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no file content, inform the user via a simple Markdown
  if (!input.content) {
    return {
      type: "Markdown",
      content: "### No file information available"
    };
  }

  const file = input.content;
  const commit = input.commit;

  // Build a list of file details to display in a DataList
  const fileDetails: IAutoView.IAutoViewDataListItemProps[] = [];

  // File name
  fileDetails.push({
    type: "DataListItem",
    label: { type: "Text", content: "Name" },
    value: { type: "Text", content: file.name || "N/A" }
  });

  // File path
  fileDetails.push({
    type: "DataListItem",
    label: { type: "Text", content: "Path" },
    value: { type: "Text", content: file.path || "N/A" }
  });

  // File size formatted in KB
  fileDetails.push({
    type: "DataListItem",
    label: { type: "Text", content: "Size" },
    value: {
      type: "Text",
      content: file.size != null
        ? `${(file.size / 1024).toFixed(2)} KB`
        : "Unknown"
    }
  });

  // File type
  fileDetails.push({
    type: "DataListItem",
    label: { type: "Text", content: "Type" },
    value: { type: "Text", content: file.type || "Unknown" }
  });

  // If there's an HTML URL, provide a button for the user to view the file in browser
  if (file.html_url) {
    fileDetails.push({
      type: "DataListItem",
      label: { type: "Text", content: "View Online" },
      value: {
        type: "Button",
        label: ["Open"],
        href: file.html_url,
        startElement: { type: "Icon", id: "external-link", size: 16, color: "blue" }
      }
    });
  }

  // If there's a download URL, provide a download button
  if (file.download_url) {
    fileDetails.push({
      type: "DataListItem",
      label: { type: "Text", content: "Download" },
      value: {
        type: "Button",
        label: ["Download"],
        href: file.download_url,
        startElement: { type: "Icon", id: "download", size: 16, color: "green" }
      }
    });
  }

  // Build a list of commit details to display after the commit message
  const commitDetails: IAutoView.IAutoViewDataListItemProps[] = [];

  // Short SHA with link if available
  if (commit.sha) {
    commitDetails.push({
      type: "DataListItem",
      label: { type: "Text", content: "Commit SHA" },
      value: commit.html_url
        ? {
            type: "Button",
            label: [commit.sha.substring(0, 7)],
            href: commit.html_url,
            startElement: { type: "Icon", id: "link", size: 16, color: "teal" }
          }
        : { type: "Text", content: commit.sha }
    });
  }

  // Commit author
  if (commit.author) {
    const author = commit.author;
    const authorLabel = `${author.name || "Unknown"}${author.email ? ` <${author.email}>` : ""}`;
    commitDetails.push({
      type: "DataListItem",
      label: { type: "Text", content: "Author" },
      value: { type: "Text", content: authorLabel }
    });

    // Date formatted for locale
    if (author.date) {
      const date = new Date(author.date);
      commitDetails.push({
        type: "DataListItem",
        label: { type: "Text", content: "Date" },
        value: { type: "Text", content: date.toLocaleString() }
      });
    }
  }

  // Compose the main card UI as a VerticalCard
  return {
    type: "VerticalCard",
    childrenProps: [
      // Card header showing file path/name and commit message summary
      {
        type: "CardHeader",
        title: file.path || file.name || "File",
        description: commit.message || "",
        startElement: { type: "Icon", id: "file", size: 24, color: "blue" }
      },
      // Card content with two sections: file details and commit message & details
      {
        type: "CardContent",
        childrenProps: [
          // File details list
          {
            type: "DataList",
            childrenProps: fileDetails
          },
          // Commit message rendered in Markdown to support line breaks and formatting
          {
            type: "Markdown",
            content: `### Commit Message\n\n${commit.message || "_No commit message provided._"}`
          },
          // Commit details list
          {
            type: "DataList",
            childrenProps: commitDetails
          }
        ]
      }
    ]
  };
}
