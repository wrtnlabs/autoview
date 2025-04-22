import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A release.
     *
     * @title Release
    */
    export type release = {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        assets_url: string & tags.Format<"uri">;
        upload_url: string;
        tarball_url: (string & tags.Format<"uri">) | null;
        zipball_url: (string & tags.Format<"uri">) | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the tag.
        */
        tag_name: string;
        /**
         * Specifies the commitish value that determines where the Git tag is created from.
        */
        target_commitish: string;
        name: string | null;
        body?: string | null;
        /**
         * true to create a draft (unpublished) release, false to create a published one.
        */
        draft: boolean;
        /**
         * Whether to identify the release as a prerelease or a full release.
        */
        prerelease: boolean;
        created_at: string & tags.Format<"date-time">;
        published_at: (string & tags.Format<"date-time">) | null;
        author: Schema.simple_user;
        assets: Schema.release_asset[];
        body_html?: string;
        body_text?: string;
        mentions_count?: number & tags.Type<"int32">;
        /**
         * The URL of the release discussion.
        */
        discussion_url?: string;
        reactions?: Schema.reaction_rollup;
    };
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
    /**
     * Data related to a release.
     *
     * @title Release Asset
    */
    export type release_asset = {
        url: string & tags.Format<"uri">;
        browser_download_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The file name of the asset.
        */
        name: string;
        label: string | null;
        /**
         * State of the release asset.
        */
        state: "uploaded" | "open";
        content_type: string;
        size: number & tags.Type<"int32">;
        download_count: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        uploader: Schema.nullable_simple_user;
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
     * @title Reaction Rollup
    */
    export type reaction_rollup = {
        url: string & tags.Format<"uri">;
        total_count: number & tags.Type<"int32">;
        "+1": number & tags.Type<"int32">;
        "-1": number & tags.Type<"int32">;
        laugh: number & tags.Type<"int32">;
        confused: number & tags.Type<"int32">;
        heart: number & tags.Type<"int32">;
        hooray: number & tags.Type<"int32">;
        eyes: number & tags.Type<"int32">;
        rocket: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.release;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper: format ISO date string to a simple local date
    const formatDate = (iso?: string | null): string | undefined =>
        iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : undefined;

    // Map GitHub reaction keys to FontAwesome icon IDs
    const reactionIconMap: Record<keyof Schema.reaction_rollup, string> = {
        url: "link",
        total_count: "chart-bar",
        "+1": "thumbs-up",
        "-1": "thumbs-down",
        laugh: "laugh",
        confused: "meh",
        heart: "heart",
        hooray: "trophy",
        eyes: "eye",
        rocket: "rocket",
    };

    // Build a list item for each asset (download link button)
    const assetListItem = (asset: Schema.release_asset): IAutoView.IAutoViewDataListItemProps => ({
        type: "DataListItem",
        label: {
            type: "Text",
            content: `📦 ${asset.name} (${asset.size.toLocaleString()} bytes)`,
        },
        value: {
            type: "Button",
            variant: "outlined",
            size: "small",
            startElement: { type: "Icon", id: "download", size: 16 },
            label: "Download",
            href: asset.browser_download_url,
        },
    });

    // If there are assets, wrap them in a DataList
    const assetsComponent: IAutoView.IAutoViewDataListProps | undefined =
        input.assets && input.assets.length > 0
            ? {
                  type: "DataList",
                  childrenProps: input.assets.map(assetListItem),
              }
            : undefined;

    // Build reaction chips if reactions rollup is provided
    const reactionChips: IAutoView.IAutoViewChipProps[] = [];
    if (input.reactions) {
        (Object.keys(input.reactions) as (keyof Schema.reaction_rollup)[]).forEach((key) => {
            const count = (input.reactions as any)[key] as number;
            // Skip URL and total_count fields
            if (key === "url" || key === "total_count" || count <= 0) return;
            reactionChips.push({
                type: "Chip",
                variant: "outlined",
                size: "small",
                color: "gray",
                startElement: { type: "Icon", id: reactionIconMap[key], size: 12 },
                label: count.toString(),
            });
        });
    }
    // Wrap reaction chips in a ChipGroup if any
    const reactionsComponent: IAutoView.IAutoViewChipGroupProps | undefined =
        reactionChips.length > 0
            ? {
                  type: "ChipGroup",
                  childrenProps: reactionChips,
              }
            : undefined;

    // Compose CardHeader: show author avatar, title and subtitle
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        // Title prefers release name, fallback to tag name
        title: input.name ?? input.tag_name,
        // Subtitle shows tag, created and published dates
        description: [
            `Tag: ${input.tag_name}`,
            input.draft ? "Draft" : undefined,
            input.prerelease ? "Prerelease" : undefined,
            `Created: ${formatDate(input.created_at)}`,
            input.published_at ? `Published: ${formatDate(input.published_at)}` : undefined,
        ]
            .filter(Boolean)
            .join(" • "),
        startElement: {
            type: "Avatar",
            src: input.author.avatar_url,
            name: input.author.login,
            size: 36,
        },
    };

    // Compose CardContent: markdown body + assets list
    const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
    if (input.body) {
        contentChildren.push({
            type: "Markdown",
            content: input.body,
        });
    } else {
        contentChildren.push({
            type: "Text",
            content: "No description provided.",
        });
    }
    if (assetsComponent) {
        contentChildren.push({ type: "Divider", orientation: "horizontal", color: "#e0e0e0" });
        contentChildren.push(assetsComponent);
    }
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: contentChildren,
    };

    // Compose CardFooter: reactions summary
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: reactionsComponent ? reactionsComponent : [],
    };

    // Final vertical card assembly
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };

    return card;
}
