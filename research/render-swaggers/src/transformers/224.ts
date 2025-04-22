import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type BotView = {
        bot?: Schema.bot.CustomBot;
    };
    export namespace bot {
        export type CustomBot = {
            id?: string;
            channelId?: string;
            name: string;
            description?: string;
            nameDescI18nMap?: {
                [key: string]: Schema.NameDesc;
            };
            createdAt?: number;
            avatar?: Schema.TinyFile;
            color: string & tags.Default<"#123456">;
            avatarUrl?: string;
            ai?: boolean;
        };
    }
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.BotView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Handle missing bot gracefully
    const bot = input.bot;
    if (!bot) {
        // Display a simple message when there's no data
        return {
            type: "Text",
            content: "No bot data available.",
            variant: "body1",
        };
    }

    // Helper to create a DataListItem entry
    const makeItem = (
        labelText: string,
        valueComponent: IAutoView.IAutoViewPresentationComponentProps
    ): IAutoView.IAutoViewDataListItemProps => ({
        type: "DataListItem",
        label: {
            type: "Text",
            content: labelText,
            variant: "subtitle2",
            color: "tertiary",
        },
        value: valueComponent,
    });

    // Build the list of bot properties to display
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        makeItem(
            "ID",
            {
                type: "Text",
                content: bot.id ?? "-",
                variant: "body2",
            }
        ),
        makeItem(
            "Channel",
            {
                type: "Text",
                content: bot.channelId ?? "-",
                variant: "body2",
            }
        ),
        makeItem(
            "Created At",
            {
                type: "Text",
                // Format timestamp into a human-readable string
                content: bot.createdAt
                    ? new Date(bot.createdAt).toLocaleString()
                    : "-",
                variant: "body2",
            }
        ),
        makeItem(
            "Color",
            {
                type: "Text",
                content: bot.color,
                variant: "body2",
            }
        ),
        makeItem(
            "AI Enabled",
            bot.ai
                ? {
                      type: "Icon",
                      id: "robot",
                      color: "blue",
                      size: 20,
                  }
                : {
                      type: "Text",
                      content: "No",
                      variant: "body2",
                  }
        ),
    ];

    // Build the header with avatar (if available), name, and description
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: bot.name,
        description: bot.description,
        startElement: bot.avatarUrl
            ? {
                  type: "Avatar",
                  src: bot.avatarUrl,
                  name: bot.name,
                  size: 64,
              }
            : undefined,
    };

    // The main content section with a DataList of bot fields
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    };

    // Footer: show an "AI Bot" chip if AI is enabled
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: bot.ai
            ? {
                  type: "ChipGroup",
                  childrenProps: [
                      {
                          type: "Chip",
                          label: "AI Bot",
                          variant: "filled",
                          color: "info",
                      },
                  ],
              }
            : undefined,
    };

    // Compose a vertical card that is responsive and visually engaging
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
