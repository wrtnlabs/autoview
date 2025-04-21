import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposCodespaces_New {
        export type GetResponse = {
            billable_owner?: Schema.simple_user;
            defaults?: {
                location: string;
                devcontainer_path: string | null;
            };
        };
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
}
type IAutoViewTransformerInputType = Schema.IApiReposCodespaces_New.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Destructure input for easier access
    const { billable_owner: owner, defaults } = input;

    // Prepare the array of VerticalCard children (CardHeader, CardContent, etc.)
    const cardChildren: (IAutoView.IAutoViewCardHeaderProps | IAutoView.IAutoViewCardContentProps)[] = [];

    // If we have owner information, render it in a CardHeader with avatar
    if (owner) {
        const header: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            // The title is the GitHub login
            title: owner.login,
            // Use the optional name as description if present
            description: owner.name ?? undefined,
            // Display the avatar; fallback to login initials if name missing
            startElement: {
                type: "Avatar",
                src: owner.avatar_url,
                name: owner.name ?? owner.login,
                variant: "primary",
                size: 40,
            },
        };
        cardChildren.push(header);
    }

    // If we have defaults data, render it in a DataList inside CardContent
    if (defaults) {
        const items: IAutoView.IAutoViewDataListItemProps[] = [];

        // Location item
        if (defaults.location) {
            items.push({
                type: "DataListItem",
                label: [
                    {
                        type: "Text",
                        content: "Location",
                        variant: "subtitle2",
                        color: "secondary",
                    },
                ],
                value: {
                    type: "Chip",
                    label: defaults.location,
                    variant: "filled",
                    color: "info",
                    size: "small",
                },
            });
        }

        // Devcontainer path item: either show path or a "None" chip
        items.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Devcontainer",
                    variant: "subtitle2",
                    color: "secondary",
                },
            ],
            value:
                defaults.devcontainer_path !== null
                    ? {
                          type: "Text",
                          content: defaults.devcontainer_path,
                          variant: "body2",
                      }
                    : {
                          type: "Chip",
                          label: "None",
                          variant: "outlined",
                          color: "gray",
                          size: "small",
                      },
        });

        // Wrap the list of items in a DataList component
        const dataList: IAutoView.IAutoViewDataListProps = {
            type: "DataList",
            childrenProps: items,
        };

        // Wrap the DataList in a CardContent so it fits under the VerticalCard
        const content: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            childrenProps: [dataList],
        };
        cardChildren.push(content);
    }

    // If we have at least one child, render a VerticalCard
    if (cardChildren.length > 0) {
        return {
            type: "VerticalCard",
            childrenProps: cardChildren,
        };
    }

    // Fallback: no meaningful data, render a Markdown notice
    return {
        type: "Markdown",
        content: "### No codespace data available",
    };
}
