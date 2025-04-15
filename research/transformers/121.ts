import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4ManagerView = {
                manager?: legacy.v4.LegacyV4Manager;
                online?: legacy.v4.LegacyV4Online;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4Manager = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            accountId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            description?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showDescriptionToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            nameDescI18nMap?: {
                [key: string]: NameDesc;
            };
            profile?: {
                [key: string]: {};
            };
            email: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showEmailToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            mobileNumber?: string & tags.Default<"+18004424000"> & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showMobileNumberToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            role: "owner" | "member";
            removed?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            displayAsChannel?: boolean;
            defaultGroupWatch?: "all" | "info" | "none";
            defaultDirectChatWatch?: "all" | "info" | "none";
            defaultUserChatWatch?: "all" | "info" | "none";
            operatorScore?: number & tags.JsonSchemaPlugin<{
                format: "float",
                readOnly: true
            }>;
            touchScore?: number & tags.JsonSchemaPlugin<{
                format: "float",
                readOnly: true
            }>;
            avatar?: TinyFile;
            operatorEmailReminder?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            operator?: boolean;
            statusEmoji?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            statusText?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            statusClearAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            managerId?: string;
            avatarUrl?: string;
            emailForFront?: string;
            mobileNumberForFront?: string & tags.Default<"+18004424000">;
        };
        export type LegacyV4Online = {
            channelId?: string;
            personType?: string;
            personId?: string;
            id?: string;
        };
    }
}
type NameDesc = {
    name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
    description?: string;
};
type TinyFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
};
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4ManagerView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If the manager data exists, build a vertical card to display detailed manager information.
  if (input.manager) {
    // Build a header section using the manager's basic info.
    // The startElement is an Avatar component showing the manager's avatar image and name.
    // The endElement is an Icon component indicating online/offline status based on input.online.
    const header: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: input.manager.name,
      description: input.manager.description || "",
      startElement: {
        type: "Avatar",
        src: input.manager.avatarUrl, // Assumes avatarUrl is available if a valid image exists.
        name: input.manager.name,
        size: 40, // Using an allowed size that is visually balanced.
        variant: "primary"
      },
      endElement: {
        // When online data is provided, we show a "wifi" icon in green; otherwise a generic "offline" icon in gray.
        type: "Icon",
        id: input.online ? "wifi" : "offline",
        color: input.online ? "green" : "gray",
        size: 20
      }
    };

    // Build a content section using a Markdown component.
    // This section uses markdown to visually structure manager details like email and mobile number.
    const markdownContent = `
**Email:** ${input.manager.email}  
${input.manager.mobileNumberForFront ? `**Mobile:** ${input.manager.mobileNumberForFront}  ` : ""}
    `.trim();
    const content: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      // childrenProps accepts a presentation component; here we pass a Markdown component.
      childrenProps: {
        type: "Markdown",
        content: markdownContent
      }
    };

    // Optionally build a footer section to display additional details, such as the manager role.
    let footer: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
    if (input.manager.role) {
      footer = {
        type: "CardFooter",
        childrenProps: {
          type: "Text",
          content: `Role: ${input.manager.role}`,
          variant: "caption",
          color: "gray"
        }
      };
    }

    // Compose an array of card sections. The VerticalCard's childrenProps can include header, content, and footer.
    const cardChildren: (IAutoView.IAutoViewCardHeaderProps | IAutoView.IAutoViewCardContentProps | IAutoView.IAutoViewCardFooterProps)[] = [header, content];
    if (footer) {
      cardChildren.push(footer);
    }

    // Return a VerticalCard component that aggregates our sections.
    return {
      type: "VerticalCard",
      childrenProps: cardChildren
    };
  } else {
    // If no manager data exists, fall back to a simple Markdown display.
    // This Markdown will indicate that no manager information is available.
    return {
      type: "Markdown",
      content: "No manager information is available."
    };
  }
}
