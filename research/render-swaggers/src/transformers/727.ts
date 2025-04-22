import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The status of a deployment.
     *
     * @title Deployment Status
    */
    export type deployment_status = {
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The state of the status.
        */
        state: "error" | "failure" | "inactive" | "pending" | "success" | "queued" | "in_progress";
        creator: Schema.nullable_simple_user;
        /**
         * A short description of the status.
        */
        description: string & tags.Default<"">;
        /**
         * The environment of the deployment that the status is for.
        */
        environment?: string & tags.Default<"">;
        /**
         * Closing down notice: the URL to associate with this status.
        */
        target_url: string & tags.Default<"">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        deployment_url: string & tags.Format<"uri">;
        repository_url: string & tags.Format<"uri">;
        /**
         * The URL for accessing your environment.
        */
        environment_url?: string & tags.Default<"">;
        /**
         * The URL to associate with this status.
        */
        log_url?: string & tags.Default<"">;
        performed_via_github_app?: Schema.nullable_integration;
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
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type nullable_integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: any | any;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    export type simple_user = any;
    export type enterprise = any;
}
type IAutoViewTransformerInputType = Schema.deployment_status;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Map deployment state to user-friendly label and color
    const stateLabel = input.state
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        pending: "warning",
        in_progress: "info",
        success: "success",
        failure: "error",
        error: "error",
        inactive: "gray",
        queued: "info",
    };
    const stateChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: stateLabel,
        color: stateColorMap[input.state] ?? "primary",
        size: "small",
        variant: "filled",
    };

    // Build an avatar for the creator, if available
    const creator = input.creator;
    const avatarComponent: IAutoView.IAutoViewAvatarProps | undefined = creator && creator.avatar_url
        ? {
              type: "Avatar",
              src: creator.avatar_url,
              name: creator.login,
              variant: "info",
              size: 40,
          }
        : undefined;

    // Helper to make a button link
    const makeLinkButton = (href: string, label = "Open"): IAutoView.IAutoViewButtonProps => ({
        type: "Button",
        label,
        href,
        variant: "text",
        color: "primary",
        size: "small",
    });

    // Format timestamps for readability
    const formatDate = (iso: string): string => {
        const d = new Date(iso);
        return isNaN(d.getTime()) ? iso : d.toLocaleString();
    };

    // Assemble data list items
    const items: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "ID" },
            value: { type: "Text", content: String(input.id) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Node ID" },
            value: { type: "Text", content: input.node_id },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: { type: "Text", content: formatDate(input.created_at) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At" },
            value: { type: "Text", content: formatDate(input.updated_at) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Repository" },
            value: makeLinkButton(input.repository_url, "View Repo"),
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Deployment" },
            value: makeLinkButton(input.deployment_url, "Open"),
        },
    ];

    // Optional fields: target_url, log_url, environment_url, performed_via_github_app
    if (input.target_url) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Target URL" },
            value: makeLinkButton(input.target_url),
        });
    }
    if (input.log_url) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Log URL" },
            value: makeLinkButton(input.log_url, "View Logs"),
        });
    }
    if (input.environment_url) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Environment URL" },
            value: makeLinkButton(input.environment_url, "Open Env"),
        });
    }
    if (input.performed_via_github_app) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Performed Via" },
            value: {
                type: "Chip",
                label: input.performed_via_github_app.name,
                size: "small",
                variant: "outlined",
                color: "secondary",
            },
        });
    }

    // Main card structure
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Show who created it and the description
                type: "CardHeader",
                title: creator?.login ?? "Unknown Creator",
                description: input.description || undefined,
                startElement: avatarComponent,
                endElement: stateChip,
            },
            {
                // List all key/value pairs in a data list
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: items,
                },
            },
        ],
    };
}
