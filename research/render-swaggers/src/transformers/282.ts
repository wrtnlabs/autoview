import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace TryPagination_lt_ArticleType {
        export type GetAllArticlesReponse_gt_ = {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: Schema.PaginationResponseType_lt_ArticleType.GetAllArticlesReponse_gt_;
        };
    }
    export namespace PaginationResponseType_lt_ArticleType {
        export type GetAllArticlesReponse_gt_ = {
            list: Schema.ArticleType.Element[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        };
    }
    export namespace ArticleType {
        export type Element = {
            id: number;
            contents: string;
            createdAt: Schema.Date;
            thumbnail: string | null;
            /**
             * 내가 pick(좋아요) 한 게시글인지 아닌지 여부를 의미하며 기본 값은 false이다.
            */
            myPick: boolean;
            isMine: boolean;
            writer: any;
            comments: any[];
        };
    }
    export type Date = {};
}
type IAutoViewTransformerInputType = Schema.TryPagination_lt_ArticleType.GetAllArticlesReponse_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Safely extract the list of articles; handle missing or empty list
  const articles = input.data?.list ?? [];

  // Helper to convert the createdAt field to a readable string.
  // Since Schema.Date is a generic object, we coerce it to string.
  const formatDate = (date: unknown): string => {
    try {
      const d = new Date(date as any);
      return isNaN(d.getTime()) ? String(date) : d.toLocaleDateString();
    } catch {
      return String(date);
    }
  };

  // Map each article to a VerticalCardProps
  const cards: IAutoView.IAutoViewVerticalCardProps[] = articles.map(
    (article) => {
      // CardHeader: show article id, and if it's the user's article, a chip
      const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: `Article #${article.id}`,
        // If the article belongs to the current user, show a "My Article" chip
        ...(article.isMine && {
          endElement: {
            type: "Chip",
            label: "My Article",
            size: "small",
            color: "primary",
            variant: "outlined",
          },
        }),
      };

      // CardMedia: show thumbnail if available
      const media: IAutoView.IAutoViewCardMediaProps | undefined =
        article.thumbnail != null
          ? { type: "CardMedia", src: article.thumbnail }
          : undefined;

      // CardContent: render the article contents as markdown for richer formatting
      const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: article.contents,
        },
      };

      // CardFooter: show publication date, comment count, and a heart icon if picked
      const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

      // Publication date as a caption
      footerChildren.push({
        type: "Text",
        variant: "caption",
        color: "gray",
        content: `Published: ${formatDate(article.createdAt)}`,
      });

      // Comment count badge
      footerChildren.push({
        type: "Badge",
        count: article.comments?.length ?? 0,
        childrenProps: {
          type: "Icon",
          id: "comment",
          color: "gray",
          size: 16,
        },
      });

      // Heart icon if user has picked (liked) the article
      if (article.myPick) {
        footerChildren.push({
          type: "Icon",
          id: "heart",
          color: "red",
          size: 16,
        });
      }

      const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: footerChildren,
      };

      // Assemble the vertical card, filtering out undefined media
      const children = [header, media, content, footer].filter(
        (child): child is Exclude<typeof child, undefined> => child !== undefined
      );

      return {
        type: "VerticalCard",
        childrenProps: children,
      };
    }
  );

  // Compose a Carousel to display articles as swipeable cards; suitable for both desktop and mobile.
  return {
    type: "Carousel",
    autoPlay: true,
    interval: 3000,
    infinite: true,
    navControls: true,
    indicators: true,
    childrenProps: cards,
  };
}
