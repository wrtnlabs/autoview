import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Repository Collaborator Permission
     *
     * @title Repository Collaborator Permission
    */
    export type repository_collaborator_permission = {
        permission: string;
        role_name: string;
        user: Schema.nullable_collaborator;
    };
    /**
     * Collaborator
     *
     * @title Collaborator
    */
    export type nullable_collaborator = {
        login: string;
        id: number & tags.Type<"int32">;
        email?: string | null;
        name?: string | null;
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
        permissions?: {
            pull: boolean;
            triage?: boolean;
            push: boolean;
            maintain?: boolean;
            admin: boolean;
        };
        role_name: string;
        user_view_type?: string;
    } | null;
}
type IAutoViewTransformerInputType = Schema.repository_collaborator_permission;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { user, role_name, permission } = input;

    // If user data is missing, show a simple markdown notice
    if (!user) {
        return {
            type: "Markdown",
            content: "### Unknown Collaborator\nUser data is unavailable."
        };
    }

    // Card header: show avatar, login, and real name
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: user.login,
        description: user.name ?? undefined,
        startElement: {
            type: "Avatar",
            // use the avatar_url for the image
            src: user.avatar_url,
            // fallback name display
            name: user.login,
            size: 40,
            variant: "primary"
        }
    };

    // Data list showing key properties
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: { type: "Text", content: "ID" },
                value: { type: "Text", content: String(user.id) }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Email" },
                // if email is null or undefined, show 'N/A'
                value: { type: "Text", content: user.email ?? "N/A" }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Role" },
                // visualize role with a filled chip
                value: {
                    type: "Chip",
                    label: role_name,
                    variant: "filled",
                    color: "info",
                    size: "small"
                }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Permission" },
                // show permission in an outlined chip
                value: {
                    type: "Chip",
                    label: permission,
                    variant: "outlined",
                    color: "success",
                    size: "small"
                }
            }
        ]
    };

    // Card content wraps the data list
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList
    };

    // Compose a vertical card with header and content for a clean, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
