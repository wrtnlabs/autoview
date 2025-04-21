import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The authorization for an OAuth app, GitHub App, or a Personal Access Token.
     *
     * @title Authorization
    */
    export type authorization = {
        id: number & tags.Type<"int32">;
        url: string & tags.Format<"uri">;
        /**
         * A list of scopes that this authorization is in.
        */
        scopes: string[] | null;
        token: string;
        token_last_eight: string | null;
        hashed_token: string | null;
        app: {
            client_id: string;
            name: string;
            url: string & tags.Format<"uri">;
        };
        note: string | null;
        note_url: (string & tags.Format<"uri">) | null;
        updated_at: string & tags.Format<"date-time">;
        created_at: string & tags.Format<"date-time">;
        fingerprint: string | null;
        user?: Schema.nullable_simple_user;
        installation?: Schema.nullable_scoped_installation;
        expires_at: (string & tags.Format<"date-time">) | null;
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
    /**
     * @title Scoped Installation
    */
    export type nullable_scoped_installation = {
        permissions: any;
        /**
         * Describe whether all repositories have been selected or there's a selection involved
        */
        repository_selection: "all" | "selected";
        single_file_name: string | null;
        has_multiple_single_files?: boolean;
        single_file_paths?: string[];
        repositories_url: string & tags.Format<"uri">;
        account: any;
    } | null;
    export type app_permissions = any;
    export type simple_user = any;
}
type IAutoViewTransformerInputType = Schema.authorization;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine if the authorization has expired
  const now = new Date();
  const expiresAt = input.expires_at ? new Date(input.expires_at) : null;
  const isExpired = expiresAt ? expiresAt < now : false;

  // Helper to render a single text field as DataListItem
  const makeTextItem = (label: string, value: string | null | undefined): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    label: { type: "Text", content: label },
    value: { type: "Text", content: value ?? "-" },
  });

  // Build the list of DataListItem props
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // ID
  dataListItems.push(makeTextItem("ID", String(input.id)));

  // URL as a button link
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "URL" },
    value: {
      type: "Button",
      label: "Open",
      href: input.url,
      variant: "text",
    },
  });

  // Scopes: if null => show none; otherwise a ChipGroup
  if (input.scopes && Array.isArray(input.scopes)) {
    const chips: IAutoView.IAutoViewChipProps[] = input.scopes.map((scope) => ({
      type: "Chip",
      label: scope,
      size: "small",
      variant: "filled",
    }));
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Scopes" },
      value: {
        type: "ChipGroup",
        childrenProps: chips,
      },
    });
  } else {
    dataListItems.push(makeTextItem("Scopes", "None"));
  }

  // Token last eight characters
  dataListItems.push(
    makeTextItem("Token (last 8)", input.token_last_eight ? `••••${input.token_last_eight}` : null)
  );

  // Created and updated timestamps
  dataListItems.push(makeTextItem("Created At", input.created_at));
  dataListItems.push(makeTextItem("Updated At", input.updated_at));

  // Expiration
  dataListItems.push(
    makeTextItem("Expires At", input.expires_at ?? "Never")
  );

  // Fingerprint
  dataListItems.push(makeTextItem("Fingerprint", input.fingerprint));

  // Note as markdown, if provided
  if (input.note) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Note" },
      value: {
        type: "Markdown",
        content: input.note,
      },
    });
  }

  // User avatar and login, if available
  if (input.user) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "User" },
      value: {
        type: "Avatar",
        src: input.user.avatar_url,
        name: input.user.login,
        variant: "info",
        size: 40,
      },
    });
  }

  // Installation info, if available
  if (input.installation) {
    const selection = input.installation.repository_selection === "all"
      ? "All repositories"
      : "Selected repositories";
    dataListItems.push(makeTextItem("Installation", selection));
  }

  // Compose the vertical card with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with app name and status badge
        type: "CardHeader",
        title: input.app.name,
        description: `Authorization #${input.id}`,
        startElement: {
          type: "Icon",
          id: "key",
          color: "teal",
          size: 24,
        },
        endElement: {
          type: "Chip",
          label: isExpired ? "Expired" : "Active",
          color: isExpired ? "error" : "success",
          size: "small",
          variant: "filled",
        },
      },
      {
        // Card content with a data list of fields
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: dataListItems,
        },
      },
      {
        // Card footer with a primary action
        type: "CardFooter",
        childrenProps: {
          type: "Button",
          label: "View Details",
          href: input.url,
          color: "primary",
          variant: "contained",
        },
      },
    ],
  };
}
