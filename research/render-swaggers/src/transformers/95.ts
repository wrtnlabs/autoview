import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IBbsArticle {
        /**
         * Snapshot of article.
         *
         * `IBbsArticle.ISnapshot` is a snapshot entity that contains the contents of
         * the article, as mentioned in {@link IBbsArticle}, the contents of the article
         * are separated from the article record to keep evidence and prevent fraud.
        */
        export type ISnapshot = {
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
type IAutoViewTransformerInputType = Schema.IBbsArticle.ISnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Select an icon based on the file format
  let formatIconId: string;
  switch (input.format) {
    case 'md':
      formatIconId = 'file-lines';
      break;
    case 'html':
      formatIconId = 'file-code';
      break;
    case 'txt':
      formatIconId = 'file-alt';
      break;
    default:
      formatIconId = 'file';
  }

  // Human‐readable creation date
  const createdAt = new Date(input.created_at).toLocaleString();

  // Card header with title, date, and format icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: input.title,
    description: createdAt,
    startElement: {
      type: 'Icon',
      id: formatIconId,
      size: 20,
      color: 'blue'
    }
  };

  // Main body rendered as markdown for rich formatting
  const markdown: IAutoView.IAutoViewMarkdownProps = {
    type: 'Markdown',
    content: input.body
  };
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: [markdown]
  };

  // If there are attachments, list them in the footer
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined;
  if (input.files && input.files.length > 0) {
    const items: IAutoView.IAutoViewDataListItemProps[] = input.files.map(file => {
      // Reconstruct the full filename
      const fileName =
        file.extension && file.extension.length > 0
          ? `${file.name}.${file.extension}`
          : file.name;

      return {
        type: 'DataListItem',
        // Show a paperclip icon next to the filename
        label: [
          { type: 'Icon', id: 'paperclip', size: 16, color: 'gray' },
          { type: 'Text', content: fileName, variant: 'body2' }
        ],
        // Provide a download link via a text button
        value: {
          type: 'Button',
          variant: 'text',
          label: 'Download',
          href: file.url
        }
      };
    });

    const dataList: IAutoView.IAutoViewDataListProps = {
      type: 'DataList',
      childrenProps: items
    };

    cardFooter = {
      type: 'CardFooter',
      childrenProps: [dataList]
    };
  }

  // Assemble the vertical card; include footer only if attachments exist
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: 'VerticalCard',
    childrenProps: cardFooter
      ? [header, cardContent, cardFooter]
      : [header, cardContent]
  };

  return card;
}
