import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiProjectsColumnsMoves {
        export type PostResponse = {};
    }
}
type IAutoViewTransformerInputType = Schema.IApiProjectsColumnsMoves.PostResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Since the API returns an empty object for a successful column move,
  // we render a confirmation UI. If the API is extended to return details,
  // this function can be updated to visualize them here.

  // A vertical card layout provides a compact, responsive container
  // with a header (including an icon) and content (rich markdown).
  const successIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "check-circle",  // FontAwesome icon name (kebab-case, without prefix)
    color: "green",
    size: 28,
  };

  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: successIcon,
    title: "Columns Moved",
    description: "The columns have been moved successfully.",
  };

  const markdownMessage: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    // Using emoji and bold text to make the confirmation more engaging.
    content: "✅ **Success:** Your columns have been moved.",
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [markdownMessage],
  };

  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
