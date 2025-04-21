import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Details of a deployment that is waiting for protection rules to pass
     *
     * @title Pending Deployment
    */
    export type pending_deployment = {
        environment: {
            /**
             * The id of the environment.
            */
            id?: number & tags.Type<"int32">;
            node_id?: string;
            /**
             * The name of the environment.
            */
            name?: string;
            url?: string;
            html_url?: string;
        };
        /**
         * The set duration of the wait timer
        */
        wait_timer: number & tags.Type<"int32">;
        /**
         * The time that the wait timer began.
        */
        wait_timer_started_at: (string & tags.Format<"date-time">) | null;
        /**
         * Whether the currently authenticated user can approve the deployment
        */
        current_user_can_approve: boolean;
        /**
         * The people or teams that may approve jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed.
        */
        reviewers: {
            type?: Schema.deployment_reviewer_type;
            reviewer?: any | any;
        }[];
    };
    /**
     * The type of reviewer.
    */
    export type deployment_reviewer_type = "User" | "Team";
    export type simple_user = any;
    export type team = any;
}
type IAutoViewTransformerInputType = Schema.pending_deployment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Utility to humanize a duration given in seconds
    function formatDuration(seconds: number): string {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        const parts: string[] = [];
        if (h) parts.push(`${h}h`);
        if (m) parts.push(`${m}m`);
        if (s || parts.length === 0) parts.push(`${s}s`);
        return parts.join(" ");
    }

    // If there's no pending deployment, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No pending deployments."
        };
    }

    // Map each pending deployment to a ListItemProps
    const items: IAutoView.IAutoViewListItemProps[] = input.map(deployment => {
        const env = deployment.environment || {};
        const name = env.name ?? `Environment ${env.id}`;
        const apiUrl = env.url ?? "";
        const htmlUrl = env.html_url ?? "";

        // Format wait timer into human-readable string
        const waitLabel = formatDuration(deployment.wait_timer);

        // Chip indicating wait timer
        const waitChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: waitLabel,
            color: "info",
            size: "small",
            variant: "outlined"
        };

        // Chip indicating if current user can approve
        const approveChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: deployment.current_user_can_approve ? "Can Approve" : "Cannot Approve",
            color: deployment.current_user_can_approve ? "success" : "error",
            size: "small",
            variant: "filled"
        };

        // Button to navigate to the environment in the browser
        const visitButton: IAutoView.IAutoViewButtonProps = {
            type: "Button",
            label: "Visit",
            href: htmlUrl,
            variant: "text",
            color: "primary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "external-link-alt", // FontAwesome icon
                color: "blue",
                size: 16
            }
        };

        // Assemble reviewer chips: show user/team icon + name
        const reviewerChips: IAutoView.IAutoViewChipProps[] = (deployment.reviewers || []).map((rev, idx) => {
            const isUser = rev.type === "User";
            // Try to extract a display name from the reviewer object
            const name =
                (rev.reviewer && ((rev.reviewer as any).login || (rev.reviewer as any).name)) ||
                (isUser ? "User" : "Team") +
                    ` ${idx + 1}`; // fallback
            return {
                type: "Chip",
                label: String(name),
                color: isUser ? "teal" : "violet",
                size: "small",
                variant: "outlined",
                startElement: {
                    type: "Icon",
                    id: isUser ? "user" : "users",
                    color: isUser ? "teal" : "violet",
                    size: 16
                }
            };
        });

        // Compose the ListItemProps for this deployment
        const listItem: IAutoView.IAutoViewListItemProps = {
            type: "ListItem",
            title: name,
            description: apiUrl,
            startElement: {
                type: "Icon",
                id: "server",
                color: "blue",
                size: 24
            },
            endElement: [
                waitChip,
                approveChip,
                ...reviewerChips,
                visitButton
            ]
        };

        return listItem;
    });

    // Return a responsive list of deployments
    return {
        type: "List",
        childrenProps: items
    };
}
