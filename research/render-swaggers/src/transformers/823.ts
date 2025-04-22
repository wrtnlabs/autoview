import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Projects are a way to organize columns and cards of work.
     *
     * @title Project
    */
    export type project = {
        owner_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        columns_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project
        */
        name: string;
        /**
         * Body of the project
        */
        body: string | null;
        number: number & tags.Type<"int32">;
        /**
         * State of the project; either 'open' or 'closed'
        */
        state: string;
        creator: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The baseline permission that all organization members have on this project. Only present if owner is an organization.
        */
        organization_permission?: "read" | "write" | "admin" | "none";
        /**
         * Whether or not this project can be seen by everyone. Only present if owner is an organization.
        */
        "private"?: boolean;
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
type IAutoViewTransformerInputType = Schema.project[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Handle empty input gracefully with a simple markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No projects available\n_No projects were provided to visualize._",
        };
    }

    // Transform each project into a DataListItem
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((project) => {
        // Primary label: project name as a header text
        const labelText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "h5",
            content: project.name,
        };

        // Build an array of presentation components for the item's value
        const valueComps: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // 1. State chip: open=success, closed=error
        const stateChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: project.state.toUpperCase(),
            color: project.state === "open" ? "success" : "error",
            variant: "filled",
        };
        valueComps.push(stateChip);

        // 2. Project number chip
        const numberChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: `#${project.number}`,
            color: "primary",
            variant: "outlined",
        };
        valueComps.push(numberChip);

        // 3. Body description as markdown (if present)
        if (project.body) {
            const bodyMd: IAutoView.IAutoViewMarkdownProps = {
                type: "Markdown",
                content: project.body,
            };
            valueComps.push(bodyMd);
        }

        // 4. Creator avatar (if we have a creator)
        if (project.creator) {
            const avatar: IAutoView.IAutoViewAvatarProps = {
                type: "Avatar",
                src: project.creator.avatar_url,
                name: project.creator.login,
                variant: "info",
                size: 28,
            };
            valueComps.push(avatar);
        }

        // 5. Creation timestamp as a smaller caption text
        const createdText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "caption",
            content: `Created: ${new Date(project.created_at).toLocaleString()}`,
        };
        valueComps.push(createdText);

        // 6. "View" button linking to the project page
        const viewButton: IAutoView.IAutoViewButtonProps = {
            type: "Button",
            label: "View",
            variant: "contained",
            color: "primary",
            href: project.html_url,
        };
        valueComps.push(viewButton);

        return {
            type: "DataListItem",
            label: [labelText],
            value: valueComps,
        };
    });

    // Wrap all items in a DataList for a responsive vertical list
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    return dataList;
}
