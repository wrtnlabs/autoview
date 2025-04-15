import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4GroupsInfiniteScrollingView = {
                groups?: legacy.v4.LegacyV4Group[];
                next?: string;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4Group = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string & tags.Pattern<"[\\p{L}\\p{N}-_()]+">;
            scope: "all" | "public" | "private";
            managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            icon?: string & tags.Pattern<"\\S+">;
            description?: string;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            updatedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            active?: boolean;
        };
    }
}
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4GroupsInfiniteScrollingView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no groups in the input, display a friendly Markdown message.
  if (!input.groups || input.groups.length === 0) {
    // Using a Markdown component to render the "no data" message for better styling and responsiveness.
    return {
      type: "Markdown",
      content: "### No Groups Available\n\nThere are currently no groups to display. Please check back later."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Map each group to a vertical card for a visually engaging display.
  const verticalCards: IAutoView.IAutoViewVerticalCardProps[] = input.groups.map((group) => {
    // Create a card header displaying the group's name.
    // Optionally include an icon if the 'icon' property is provided.
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: group.name,
      // Display the group's scope (all / public / private) as a subtitle.
      description: group.scope,
      // Use the group's icon (if exists) as the start element.
      startElement: group.icon
        ? {
            id: group.icon,
            type: "Icon",
            size: 16,
            // Optionally, adjust the color based on the group's active state.
            color: group.active ? "green" : "gray"
          }
        : undefined
    };

    // Create card content that uses a Markdown component to render the group's description.
    // Markdown helps in responsive text rendering and allows for formatting.
    const cardContent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: group.description
        ? [
            {
              type: "Markdown",
              content: group.description
            } as IAutoView.IAutoViewMarkdownProps
          ]
        : []
    };

    // Compose the vertical card with header and content.
    return {
      type: "VerticalCard",
      childrenProps: [cardHeader, cardContent]
    };
  });

  // If there is more than one group, wrap the vertical cards inside a carousel,
  // which provides an engaging, swipeable interface on mobile devices.
  if (verticalCards.length > 1) {
    const carousel: IAutoView.IAutoViewCarouselProps = {
      type: "Carousel",
      autoPlay: false,
      infinite: true,
      gutter: 16, // spacing between the cards, adjusted for responsiveness
      navControls: true,
      indicators: true,
      childrenProps: verticalCards
    };
    return carousel;
  }

  // If there is only one group, return the vertical card directly for simplicity.
  return verticalCards[0];
}
