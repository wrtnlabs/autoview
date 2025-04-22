import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A CodeQL database.
     *
     * @title CodeQL Database
    */
    export type code_scanning_codeql_database = {
        /**
         * The ID of the CodeQL database.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the CodeQL database.
        */
        name: string;
        /**
         * The language of the CodeQL database.
        */
        language: string;
        uploader: Schema.simple_user;
        /**
         * The MIME type of the CodeQL database file.
        */
        content_type: string;
        /**
         * The size of the CodeQL database file in bytes.
        */
        size: number & tags.Type<"int32">;
        /**
         * The date and time at which the CodeQL database was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the CodeQL database was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The URL at which to download the CodeQL database. The `Accept` header must be set to the value of the `content_type` property.
        */
        url: string;
        /**
         * The commit SHA of the repository at the time the CodeQL database was created.
        */
        commit_oid?: string | null;
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
}
type IAutoViewTransformerInputType = Schema.code_scanning_codeql_database;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    /**
     * Helper to convert bytes into human-readable string.
     * E.g. 1024 => "1.00 KB", 1048576 => "1.00 MB"
     */
    function formatBytes(bytes: number): string {
        const thresholds = [
            { unit: 'GB', value: 1024 ** 3 },
            { unit: 'MB', value: 1024 ** 2 },
            { unit: 'KB', value: 1024 },
        ];
        for (const { unit, value } of thresholds) {
            if (bytes >= value) {
                return `${(bytes / value).toFixed(2)} ${unit}`;
            }
        }
        return `${bytes} B`;
    }

    // Build a list of DataListItemProps to display various fields.
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // ID
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Database ID",
        },
        value: {
            type: "Text",
            variant: "body2",
            content: input.id.toString(),
        },
    });

    // Size
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Size",
        },
        value: {
            type: "Text",
            variant: "body2",
            content: formatBytes(input.size),
        },
    });

    // Created at
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Created",
        },
        value: {
            type: "Text",
            variant: "body2",
            content: new Date(input.created_at).toLocaleString(),
        },
    });

    // Updated at
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Updated",
        },
        value: {
            type: "Text",
            variant: "body2",
            content: new Date(input.updated_at).toLocaleString(),
        },
    });

    // Commit OID, if present
    if (input.commit_oid) {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "body2",
                content: "Commit SHA",
            },
            value: {
                type: "Text",
                variant: "body2",
                content: input.commit_oid,
            },
        });
    }

    // Download URL as a button
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Download",
        },
        value: {
            type: "Button",
            variant: "contained",
            color: "primary",
            size: "small",
            label: "Download",
            href: input.url,
            startElement: {
                type: "Icon",
                id: "download",
                color: "blue",
                size: 16,
            },
        },
    });

    // Assemble the DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems,
    };

    // Compose the card header: name, language, and uploader avatar
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: `Language: ${input.language}`,
        startElement: {
            type: "Avatar",
            src: input.uploader.avatar_url,
            name: input.uploader.login,
            size: 40,
        },
        // Show content type as a chip on the header's end
        endElement: {
            type: "Chip",
            label: input.content_type,
            variant: "outlined",
            size: "small",
        },
    };

    // Card content holds the detailed list
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Finally, return a vertical card presenting all the information
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
