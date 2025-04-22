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
    // Helper to render a text component
    const makeText = (content: string): IAutoView.IAutoViewTextProps => ({
        type: "Text",
        content,
    });

    // Helper to render a DataListItem with label and a single child component as value
    const makeDataListItem = (
        label: IAutoView.IAutoViewPresentationComponentProps[] | IAutoView.IAutoViewPresentationComponentProps,
        value: IAutoView.IAutoViewPresentationComponentProps[] | IAutoView.IAutoViewPresentationComponentProps
    ): IAutoView.IAutoViewDataListItemProps => ({
        type: "DataListItem",
        label,
        value,
    });

    // Build the list of authorization details
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // ID
    listItems.push(
        makeDataListItem(makeText("ID"), makeText(input.id.toString()))
    );

    // Scopes: render as a group of chips if any, otherwise a "None" text
    const scopesValue: IAutoView.IAutoViewPresentationComponentProps =
        Array.isArray(input.scopes) && input.scopes.length > 0
            ? {
                  type: "ChipGroup",
                  // Map each scope string to a filled info-colored chip
                  childrenProps: input.scopes.map((scope) => ({
                      type: "Chip",
                      label: scope,
                      variant: "filled",
                      color: "info",
                  })),
              }
            : makeText("None");
    listItems.push(makeDataListItem(makeText("Scopes"), scopesValue));

    // Note: free-form text, use Markdown to allow richer formatting
    const noteContent =
        typeof input.note === "string" && input.note.trim() !== ""
            ? input.note
            : "_No note provided_";
    listItems.push(
        makeDataListItem(
            makeText("Note"),
            {
                type: "Markdown",
                content: noteContent,
            }
        )
    );

    // Created and Updated timestamps
    listItems.push(
        makeDataListItem(makeText("Created At"), makeText(input.created_at)),
        makeDataListItem(makeText("Updated At"), makeText(input.updated_at))
    );

    // Expires At: null means "Never"
    listItems.push(
        makeDataListItem(
            makeText("Expires At"),
            makeText(input.expires_at ?? "Never")
        )
    );

    // Fingerprint: show or dash if missing
    listItems.push(
        makeDataListItem(
            makeText("Fingerprint"),
            makeText(input.fingerprint ?? "-")
        )
    );

    // Build the DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems,
    };

    // Optionally render the user avatar if we have user info
    const userAvatar: IAutoView.IAutoViewAvatarProps | undefined =
        input.user && typeof input.user === "object"
            ? {
                  type: "Avatar",
                  src: input.user.avatar_url,
                  name: input.user.login,
                  variant: "secondary",
              }
            : undefined;

    // Footer actions: show a masked token chip and a link button to the authorization URL
    const tokenChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: input.token_last_eight
            ? `•••••••${input.token_last_eight}`
            : "Token hidden",
        variant: "filled",
        color: "secondary",
    };
    const manageButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        label: "Manage",
        href: input.url,
        variant: "outlined",
        color: "primary",
    };

    // Compose the overall card
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with app name, client ID, and optional user avatar
                type: "CardHeader",
                title: input.app.name,
                description: `Client ID: ${input.app.client_id}`,
                startElement: userAvatar,
            },
            {
                // Main content: the details list
                type: "CardContent",
                childrenProps: dataList,
            },
            {
                // Footer: token chip and manage button
                type: "CardFooter",
                childrenProps: [tokenChip, manageButton],
            },
        ],
    };

    return card;
}
