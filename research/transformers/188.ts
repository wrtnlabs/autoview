import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type PluginsView = {
    next?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    plugins?: Plugin[];
};
type Plugin = {
    id?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    key?: string & tags.Format<"uuid"> & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    channelId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    state?: "waiting" | "active";
    name: string;
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    appearance: "light" | "dark" | "system";
    labelButton?: boolean;
    labelButtonText?: string;
    labelButtonTextI18nMap?: {
        [key: string]: string;
    };
    buttonType: "legacy" | "customImage" | "iconButton";
    iconButton: "channel" | "channel-filled" | "chat-bubble-alt" | "chat-bubble-alt-filled" | "chat-bubble-filled" | "chat-lightning-filled" | "chat-progress" | "chat-progress-filled" | "chat-question" | "chat-question-filled" | "comment" | "comment-filled" | "communication" | "headset" | "help-filled" | "send-forward" | "send-forward-filled" | "sms" | "sms-filled";
    customImage?: ImageFile;
    deskImage?: TinyFile;
    deskMarginX?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    deskMarginY?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    deskHideButton?: boolean;
    deskPosition?: "left" | "right";
    mobileImage?: TinyFile;
    mobileMarginX?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    mobileMarginY?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    mobilePosition?: "left" | "right";
    mobileHideButton?: boolean;
    mobileBubblePosition?: "top" | "bottom";
    urlWhitelist?: string[] & tags.MinItems<0> & tags.MaxItems<5>;
    runRate?: number & tags.Minimum<0> & tags.Maximum<1> & tags.JsonSchemaPlugin<{
        format: "float"
    }>;
    facebookPixelId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    customImageUrl?: string;
    deskImageUrl?: string;
    mobileImageUrl?: string;
    validLabelButtonText?: boolean;
    validLabelButtonTextI18nMap?: boolean;
};
type ImageFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    contentType?: string & tags.Pattern<"^image/.*">;
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
type IAutoViewTransformerInputType = PluginsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We render a vertical card that displays an overview of plugins.
  // The card header shows a title and a summary of total plugins.
  // The card content (a DataList) displays each plugin's details using a combination of visual components:
  // - If a custom image URL exists, we display an avatar.
  // - We use Markdown components to render formatted plugin information.
  // This approach favors imagery and markdown over plain text.
  
  // Extract list of plugins; if not provided, use an empty array.
  const plugins = input.plugins || [];
  
  // Build the DataList items array if there is plugin data.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = plugins.map((plugin) => {
    // Create an array to hold components for the label.
    // Allowed types for label are presentation components such as Avatar, Icon, or Markdown.
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];
    
    // If the plugin provides a custom image URL, add an Avatar component for visual identification.
    if (plugin.customImageUrl) {
      labelComponents.push({
        type: "Avatar",
        src: plugin.customImageUrl,
        // Choose a size that is visually suitable.
        size: 40,
        // Optionally provide the plugin name as the avatar's alternative text.
        name: plugin.name
      });
    } else {
      // If no image is provided, fallback to displaying an icon.
      // The icon used corresponds to the plugin's iconButton property.
      labelComponents.push({
        type: "Icon",
        id: plugin.iconButton, // plugin.iconButton is expected to be a valid kebab-case icon id
        size: 24,
        // Using a default color to ensure visibility.
        color: "blue"
      });
    }
    
    // Add a Markdown component to display the plugin's name in bold.
    labelComponents.push({
      type: "Markdown",
      content: `**Plugin:** ${plugin.name}`
    });
    
    // Compose the details in the "value" property using markdown.
    // This markdown string includes the state, appearance, and button type.
    const valueContent = `- **State:** ${plugin.state || "N/A"}
- **Appearance:** ${plugin.appearance}
- **Button Type:** ${plugin.buttonType}`;
    
    const valueComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: valueContent
    };
    
    // Return a DataListItem that uses labelComponents (an array of presentation components)
    // and a markdown component to display detailed plugin information.
    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponent
    };
  });
  
  // If no plugins are provided, create a simple message using a Markdown component.
  const noDataComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: "No plugin data available at the moment."
  };
  
  // Create the DataList component that holds all plugin DataListItems.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems.length > 0 ? dataListItems : [ { 
      type: "DataListItem",
      // In case of no data, show the noDataComponent in label.
      label: noDataComponent,
      value: noDataComponent
    } ]
  };
  
  // Create a CardHeader component that shows the overview of the plugins.
  // We include an icon (using an Icon component) as the startElement for a more engaging look.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Plugins Overview",
    description: `Total Plugins: ${plugins.length}`,
    startElement: {
      type: "Icon",
      id: "puzzle-piece", // Using a common icon representing plugins; ensure the icon exists in the icon set.
      size: 24,
      color: "blue"
    }
  };
  
  // Compose the final VerticalCard which aggregates the header and the DataList.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      { type: "CardContent", childrenProps: dataList }
    ]
  };
  
  // Return the composed UI component props.
  return verticalCard;
}
