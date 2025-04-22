import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Page Build
     *
     * @title Page Build
    */
    export type page_build = {
        url: string & tags.Format<"uri">;
        status: string;
        error: {
            message: string | null;
        };
        pusher: Schema.nullable_simple_user;
        commit: string;
        duration: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
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
type IAutoViewTransformerInputType = Schema.page_build;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms a GitHub page_build object into an AutoView data list for visual presentation.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Aggregate list items
    const items: IAutoView.IAutoViewDataListItemProps[] = [];

    // 1. URL: clickable link with a link icon
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "URL", variant: "subtitle2" },
        value: {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            href: input.url,
            startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
            label: input.url
        }
    });

    // 2. Status: colored chip based on status string
    const statusColor = (() => {
        switch (input.status.toLowerCase()) {
            case "success":
                return "success";
            case "failure":
            case "error":
                return "error";
            case "pending":
            case "in_progress":
                return "warning";
            default:
                return "secondary";
        }
    })();
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Status", variant: "subtitle2" },
        value: {
            type: "Chip",
            variant: "filled",
            color: statusColor,
            size: "small",
            label: input.status
        }
    });

    // 3. Error message (if any): red chip
    if (input.error?.message) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Error", variant: "subtitle2", color: "error" },
            value: {
                type: "Chip",
                variant: "filled",
                color: "error",
                size: "small",
                label: input.error.message
            }
        });
    }

    // 4. Pusher: avatar + username
    if (input.pusher) {
        const { avatar_url, login, name } = input.pusher;
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Pusher", variant: "subtitle2" },
            // Render as an array: avatar + text
            value: [
                { type: "Avatar", src: avatar_url, name: name ?? login, size: 32, variant: "primary" },
                { type: "Text", content: login, variant: "body2" }
            ]
        });
    }

    // 5. Commit SHA: monospace-like text
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Commit", variant: "subtitle2" },
        value: {
            type: "Text",
            content: input.commit,
            variant: "body2",
            color: "gray"
        }
    });

    // 6. Duration: display in ms or seconds
    const durationLabel =
        input.duration >= 1000
            ? `${(input.duration / 1000).toFixed(2)} s`
            : `${input.duration} ms`;
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Duration", variant: "subtitle2" },
        value: { type: "Text", content: durationLabel, variant: "body2" }
    });

    // 7. Created at: formatted datetime
    const createdAt = new Date(input.created_at).toLocaleString();
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At", variant: "subtitle2" },
        value: { type: "Text", content: createdAt, variant: "body2", color: "gray" }
    });

    // 8. Updated at: formatted datetime
    const updatedAt = new Date(input.updated_at).toLocaleString();
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Updated At", variant: "subtitle2" },
        value: { type: "Text", content: updatedAt, variant: "body2", color: "gray" }
    });

    // Return as a responsive data list
    return {
        type: "DataList",
        childrenProps: items
    };
}
