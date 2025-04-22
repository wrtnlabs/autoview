import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingSaleReview {
        /**
         * Snapshot content of the review article.
        */
        export type ISnapshot = {
            /**
             * Score of the review.
             *
             * @title Score of the review
            */
            score: number;
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Creation time of snapshot record.
             *
             * In other words, creation time or update time or article.
             *
             * @title Creation time of snapshot record
            */
            created_at: string;
            /**
             * Format of body.
             *
             * Same meaning with extension like `html`, `md`, `txt`.
             *
             * @title Format of body
            */
            format: "html" | "md" | "txt";
            /**
             * Title of article.
             *
             * @title Title of article
            */
            title: string;
            /**
             * Content body of article.
             *
             * @title Content body of article
            */
            body: string;
            /**
             * List of attachment files.
             *
             * @title List of attachment files
            */
            files: Schema.IAttachmentFile.ICreate[];
        };
    }
    export namespace IAttachmentFile {
        export type ICreate = {
            /**
             * File name, except extension.
             *
             * If there's file `.gitignore`, then its name is an empty string.
             *
             * @title File name, except extension
            */
            name: string;
            /**
             * Extension.
             *
             * Possible to omit like `README` case.
             *
             * @title Extension
            */
            extension: null | (string & tags.MinLength<1> & tags.MaxLength<8>);
            /**
             * URL path of the real file.
             *
             * @title URL path of the real file
            */
            url: string;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IShoppingSaleReview.ISnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Format the creation date for display
  const createdDate = new Date(input.created_at).toLocaleString();

  // Choose a chip color based on the review score
  let scoreColor: IAutoView.IAutoViewChipProps["color"];
  if (input.score >= 8) scoreColor = "green";
  else if (input.score >= 5) scoreColor = "orange";
  else scoreColor = "red";

  // Build the CardHeader: title, date, and a score chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title,
    description: `Reviewed on ${createdDate}`,
    startElement: {
      type: "Chip",
      label: `${input.score}`,
      color: scoreColor,
      variant: "filled",
      size: "small",
    },
  };

  // Assemble the markdown body
  // If there are attachments, append them as markdown links under an "Attachments" heading
  let markdownContent = input.body;
  if (input.files && input.files.length > 0) {
    const listItems = input.files
      .map((file) => {
        const ext = file.extension ? `.${file.extension}` : "";
        // If the filename is empty (e.g. ".gitignore"), show placeholder text
        const filename = file.name !== "" ? file.name : "(no name)";
        return `- [${filename}${ext}](${file.url})`;
      })
      .join("\n");
    markdownContent += `\n\n### Attachments\n${listItems}`;
  }

  // Build the CardContent with a Markdown component
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    },
  };

  // Return a vertical card with header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
