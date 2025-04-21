import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type CANNOT_FINDONE_ARTICLE = any;
    export namespace ResponseForm_lt_ArticleType {
        export type DetailArticle_gt_ = any;
    }
    export type IS_SAME_POSITION = any;
}
type IAutoViewTransformerInputType = any | any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If the input is an array, render a simple data list.
  if (Array.isArray(input)) {
    const childrenProps = input.map((item) => {
      // Extract a title or fallback to string representation
      const titleText = item && typeof item === 'object' && 'title' in item
        ? String((item as any).title)
        : String(item);
      // Optionally extract a summary/value
      const summaryText = item && typeof item === 'object' && 'summary' in item
        ? String((item as any).summary)
        : undefined;

      const listItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        label: { 
          type: "Text", 
          content: titleText 
        },
        // Only attach value if we have a summary
        ...(summaryText !== undefined
          ? { value: { type: "Text", content: summaryText } }
          : {}),
      };
      return listItem;
    });

    return {
      type: "DataList",
      childrenProps,
    };
  }

  // If the input is an object, try to render it as an "article"-style card
  if (input && typeof input === "object") {
    const obj = input as any;

    // 1. Build the card header
    const header: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: obj.title ? String(obj.title) : undefined,
      description: obj.subtitle ? String(obj.subtitle) : undefined,
      // Show an avatar if provided, otherwise fallback to a generic file icon
      startElement: obj.authorAvatar
        ? {
            type: "Avatar",
            src: String(obj.authorAvatar),
            name: obj.authorName ? String(obj.authorName) : undefined,
          }
        : {
            type: "Icon",
            id: "file-alt",
            color: "gray",
            size: 24,
          },
    };

    // 2. Optionally include a media image
    const media: IAutoView.IAutoViewCardMediaProps | undefined = obj.image
      ? {
          type: "CardMedia",
          src: String(obj.image),
        }
      : undefined;

    // 3. Build the card content with markdown or plain text
    const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
    if (obj.contentMarkdown) {
      contentChildren.push({
        type: "Markdown",
        content: String(obj.contentMarkdown),
      });
    } else if (typeof obj.content === "string") {
      contentChildren.push({
        type: "Text",
        content: String(obj.content),
      });
    }
    const content: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: contentChildren,
    };

    // 4. Build the footer badges/chips for meta data (tags, likes, comments)
    const footerItems: IAutoView.IAutoViewPresentationComponentProps[] = [];

    // Tags as chips
    if (Array.isArray(obj.tags) && obj.tags.length > 0) {
      const chips = obj.tags.map((tag: any) => ({
        type: "Chip" as const,
        label: String(tag),
      }));
      footerItems.push({
        type: "ChipGroup",
        childrenProps: chips,
      });
    }

    // Comments count badge
    if (typeof obj.commentsCount === "number") {
      footerItems.push({
        type: "Badge",
        count: obj.commentsCount,
        childrenProps: {
          type: "Icon",
          id: "comment",
          color: "blue",
          size: 16,
        },
      });
    }

    // Likes count badge
    if (typeof obj.likes === "number") {
      footerItems.push({
        type: "Badge",
        count: obj.likes,
        childrenProps: {
          type: "Icon",
          id: "thumbs-up",
          color: "green",
          size: 16,
        },
      });
    }

    const footer: IAutoView.IAutoViewCardFooterProps = {
      type: "CardFooter",
      childrenProps: footerItems,
    };

    // Assemble a vertical card with header, optional media, content, and footer
    const childrenProps: (
      | IAutoView.IAutoViewCardHeaderProps
      | IAutoView.IAutoViewCardMediaProps
      | IAutoView.IAutoViewCardContentProps
      | IAutoView.IAutoViewCardFooterProps
    )[] = [header];
    if (media) childrenProps.push(media);
    childrenProps.push(content);
    if (footerItems.length) childrenProps.push(footer);

    return {
      type: "VerticalCard",
      childrenProps,
    };
  }

  // Fallback: serialize the input as JSON in a markdown code block
  return {
    type: "Markdown",
    content: "json\n" + JSON.stringify(input, null, 2) + "\n```",
  };
}
