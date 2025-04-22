import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Project cards represent a scope of work.
     *
     * @title Project Card
    */
    export type project_card = {
        url: string & tags.Format<"uri">;
        /**
         * The project card's ID
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        note: string | null;
        creator: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * Whether or not the card is archived
        */
        archived?: boolean;
        column_name?: string;
        project_id?: string;
        column_url: string & tags.Format<"uri">;
        content_url?: string & tags.Format<"uri">;
        project_url: string & tags.Format<"uri">;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    } | null;
}
type IAutoViewTransformerInputType = Schema.project_card;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms a GitHub project_card into a responsive Visual AutoView card
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: create a Text component for labels
  const labelText = (text: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
    variant: "subtitle2",
  });
  // Helper: create a Text component for values
  const valueText = (text: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
    variant: "body2",
  });

  // Build a list of DataListItem components dynamically
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Utility to push a label/value pair
  const pushItem = (
    label: IAutoView.IAutoViewTextProps,
    value: IAutoView.IAutoViewPresentationComponentProps | IAutoView.IAutoViewPresentationComponentProps[]
  ) => {
    dataListItems.push({
      type: "DataListItem",
      label,
      value,
    });
  };

  // Card ID
  pushItem(labelText("Card ID"), valueText(input.id.toString()));

  // Node ID
  pushItem(labelText("Node ID"), valueText(input.node_id));

  // Creator avatar
  if (input.creator) {
    const creatorAvatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: input.creator.avatar_url,
      name: input.creator.login,
    };
    pushItem(labelText("Creator"), creatorAvatar);
  }

  // Creation & update timestamps (localized)
  pushItem(
    labelText("Created At"),
    valueText(new Date(input.created_at).toLocaleString())
  );
  pushItem(
    labelText("Updated At"),
    valueText(new Date(input.updated_at).toLocaleString())
  );

  // Column name, if present
  if (input.column_name) {
    pushItem(labelText("Column"), valueText(input.column_name));
  }

  // Project URL button
  pushItem(
    labelText("Project Link"),
    {
      type: "Button",
      label: "Open",
      href: input.project_url,
      variant: "text",
      size: "small",
      color: "primary",
    }
  );

  // Content URL button, if present
  if (input.content_url) {
    pushItem(
      labelText("Content Link"),
      {
        type: "Button",
        label: "View Content",
        href: input.content_url,
        variant: "text",
        size: "small",
        color: "primary",
      }
    );
  }

  // Archived status chip
  if (input.archived !== undefined) {
    pushItem(
      labelText("Archived"),
      {
        type: "Chip",
        label: input.archived ? "Yes" : "No",
        color: input.archived ? "error" : "success",
        variant: "outlined",
      }
    );
  }

  // Footer call-to-action button
  const footerButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "View Details",
    href: input.url,
    variant: "contained",
    color: "primary",
  };

  // Compose the VerticalCard with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [
      // Header with optional note or fallback title, and creator avatar
      {
        type: "CardHeader",
        title: input.note ?? `Card #${input.id}`,
        description: input.column_name,
        startElement: input.creator
          ? {
              type: "Avatar",
              src: input.creator.avatar_url,
              name: input.creator.login,
            }
          : undefined,
      },
      // Content containing a DataList of all key/value fields
      {
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: dataListItems,
        },
      },
      // Footer with a primary action button
      {
        type: "CardFooter",
        childrenProps: footerButton,
      },
    ],
  };
}
