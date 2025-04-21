import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type CANNOT_FINDONE_ARTICLE = any;
    export namespace ResponseForm_lt_ArticleType {
        export type DetailArticle_gt_ = any;
    }
}
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms the input (assumed to represent an article or similar content) into a responsive vertical card.
// It visualizes author info, publication date, cover image, markdown content, tags, and basic stats.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Basic extraction with graceful fallbacks
  const title = typeof input.title === 'string' ? input.title : 'Untitled';
  const authorInfo = input.author ?? {};
  const authorName = typeof authorInfo.name === 'string' ? authorInfo.name : 'Unknown Author';
  const avatarUrl = typeof authorInfo.avatarUrl === 'string' ? authorInfo.avatarUrl : undefined;

  // Format published date to a human‐readable string if possible
  let dateString: string | undefined;
  if (input.publishedAt) {
    const dt = new Date(input.publishedAt);
    if (!isNaN(dt.getTime())) {
      dateString = dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }
  }
  const description = dateString ? `By ${authorName} • ${dateString}` : `By ${authorName}`;

  // Pick the first image (if any) for the media section
  const images = Array.isArray(input.images)
    ? input.images
    : typeof input.image === 'string'
      ? [input.image]
      : [];
  const firstImage = images[0];

  // Tags array for chip group
  const tags = Array.isArray(input.tags) ? input.tags.filter(t => typeof t === 'string') : [];

  // Stats: views, comments, likes (default to zero)
  const stats = (input.stats && typeof input.stats === 'object') ? input.stats : {};
  const views = typeof stats.views === 'number' ? stats.views : 0;
  const comments = typeof stats.comments === 'number' ? stats.comments : 0;
  const likes = typeof stats.likes === 'number' ? stats.likes : 0;

  // 1. Card Header: avatar + title + meta info
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title,
    description,
    startElement: {
      type: "Avatar",
      src: avatarUrl,
      name: authorName,
      size: 40,
      variant: "primary",
    },
  };

  // 2. Card Media: optional cover image
  const cardMedia: IAutoView.IAutoViewCardMediaProps = {
    type: "CardMedia",
    ...(firstImage ? { src: firstImage } : {}),
  };

  // 3. Card Content: render the body as markdown for rich formatting
  const bodyMarkdown = typeof input.content === 'string' ? input.content : '';
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      {
        type: "Markdown",
        content: bodyMarkdown,
      },
    ],
  };

  // 4. ChipGroup for tags
  const chipGroup: IAutoView.IAutoViewChipGroupProps = {
    type: "ChipGroup",
    childrenProps: tags.map(tag => ({
      type: "Chip",
      label: tag,
      size: "small",
      variant: "outlined",
      color: "info",
    })),
    maxItems: 10,
  };

  // 5. DataList for simple stats visualization (icon + number)
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: { type: "Icon", id: "eye", size: 16, color: "gray" },
        value: { type: "Text", content: String(views), variant: "body2" },
      },
      {
        type: "DataListItem",
        label: { type: "Icon", id: "comment", size: 16, color: "gray" },
        value: { type: "Text", content: String(comments), variant: "body2" },
      },
      {
        type: "DataListItem",
        label: { type: "Icon", id: "thumbs-up", size: 16, color: "gray" },
        value: { type: "Text", content: String(likes), variant: "body2" },
      },
    ],
  };

  // 6. Card Footer: combine tags and stats for a compact bottom section
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [chipGroup, dataList],
  };

  // Final: VerticalCard wraps header, media, content, and footer in a responsive layout
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardMedia, cardContent, cardFooter],
  };

  return verticalCard;
}
