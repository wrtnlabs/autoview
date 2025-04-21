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



// Transforms a Schema.authorization into a visual AutoView component.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // 1. Card header with a key icon and authorization ID / app name
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: `Authorization #${input.id}`,
        description: input.app.name,
        // Use a key icon to represent the token
        startElement: {
            type: "Icon",
            id: "key",
            color: "teal",
            size: 28,
        },
    };

    // 2. Build chips for scopes (or a "None" chip if null/empty)
    const scopesChips: IAutoView.IAutoViewChipProps[] =
        input.scopes && input.scopes.length > 0
            ? input.scopes.map((scope) => ({
                  type: "Chip",
                  label: scope,
                  size: "small",
                  variant: "outlined",
              }))
            : [
                  {
                      type: "Chip",
                      label: "None",
                      size: "small",
                      variant: "outlined",
                      color: "gray",
                  },
              ];
    const scopesComponent: IAutoView.IAutoViewChipGroupProps = {
        type: "ChipGroup",
        childrenProps: scopesChips,
    };

    // 3. Assemble a list of data points
    const items: IAutoView.IAutoViewDataListItemProps[] = [];

    // URL (link button)
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "URL", variant: "subtitle2" },
        value: {
            type: "Button",
            label: "Open",
            href: input.url,
            variant: "text",
            color: "blue",
            startElement: { type: "Icon", id: "external-link-alt", color: "blue", size: 16 },
        },
    });

    // Scopes
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Scopes", variant: "subtitle2" },
        value: scopesComponent,
    });

    // Note (markdown with optional link)
    if (input.note || input.note_url) {
        const md = [
            input.note ?? "",
            input.note_url ? `\n\n[View more](${input.note_url})` : "",
        ].join("");
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Note", variant: "subtitle2" },
            value: { type: "Markdown", content: md },
        });
    }

    // Token (masked)
    if (input.token_last_eight) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Token", variant: "subtitle2" },
            value: {
                type: "Text",
                content: `••••••••${input.token_last_eight}`,
                variant: "body2",
                color: "tertiary",
            },
        });
    }

    // Hashed token
    if (input.hashed_token) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Hashed Token", variant: "subtitle2" },
            value: { type: "Text", content: input.hashed_token, variant: "body2", color: "gray" },
        });
    }

    // Fingerprint
    if (input.fingerprint) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Fingerprint", variant: "subtitle2" },
            value: { type: "Text", content: input.fingerprint, variant: "body2" },
        });
    }

    // Creation / Update timestamps
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At", variant: "subtitle2" },
        value: {
            type: "Text",
            // Format to locale string for readability
            content: new Date(input.created_at).toLocaleString(),
            variant: "caption",
            color: "gray",
        },
    });
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Updated At", variant: "subtitle2" },
        value: {
            type: "Text",
            content: new Date(input.updated_at).toLocaleString(),
            variant: "caption",
            color: "gray",
        },
    });

    // Expiration
    if (input.expires_at) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Expires At", variant: "subtitle2" },
            value: {
                type: "Text",
                content: new Date(input.expires_at).toLocaleString(),
                variant: "caption",
                color: "error",
            },
        });
    }

    // Installation details (repository selection + link)
    if (input.installation) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Repository Selection", variant: "subtitle2" },
            value: {
                type: "Chip",
                label: input.installation.repository_selection,
                size: "small",
                variant: "outlined",
            },
        });
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Repositories URL", variant: "subtitle2" },
            value: {
                type: "Button",
                label: "View",
                href: input.installation.repositories_url,
                variant: "text",
                color: "blue",
                startElement: { type: "Icon", id: "book", color: "blue", size: 16 },
            },
        });
    }

    // 4. Wrap all items in a DataList
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    // 5. Final vertical card containing header + content
    const cardContent: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: [dataList],
    };

    return {
        type: "VerticalCard",
        childrenProps: [header, cardContent],
    };
}
