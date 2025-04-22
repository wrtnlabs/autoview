import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * File Commit
     *
     * @title File Commit
    */
    export type file_commit = {
        content: {
            name?: string;
            path?: string;
            sha?: string;
            size?: number & tags.Type<"int32">;
            url?: string;
            html_url?: string;
            git_url?: string;
            download_url?: string;
            type?: string;
            _links?: {
                self?: string;
                git?: string;
                html?: string;
            };
        } | null;
        commit: {
            sha?: string;
            node_id?: string;
            url?: string;
            html_url?: string;
            author?: {
                date?: string;
                name?: string;
                email?: string;
            };
            committer?: {
                date?: string;
                name?: string;
                email?: string;
            };
            message?: string;
            tree?: {
                url?: string;
                sha?: string;
            };
            parents?: {
                url?: string;
                html_url?: string;
                sha?: string;
            }[];
            verification?: {
                verified?: boolean;
                reason?: string;
                signature?: string | null;
                payload?: string | null;
                verified_at?: string | null;
            };
        };
    };
}
type IAutoViewTransformerInputType = Schema.file_commit;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { commit: commitData, content } = input;

    // Extract commit fields with safe defaults
    const commitMessage = commitData.message ?? "";
    const commitTitle = commitMessage.split("\n")[0] || "Commit";
    const fullSha = commitData.sha ?? "";
    const shortSha = fullSha.slice(0, 7) || "—";
    const authorName = commitData.author?.name ?? "Unknown author";
    const authorEmail = commitData.author?.email;
    const authorDisplay = authorEmail ? `${authorName} <${authorEmail}>` : authorName;
    const commitDate = commitData.author?.date ?? commitData.committer?.date ?? "Unknown date";

    // Build a list of DataListItemProps to display various fields
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // Commit message
    if (commitMessage) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Message" },
            value: { type: "Markdown", content: commitMessage }
        });
    }

    // SHA
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "SHA" },
        value: { type: "Text", content: shortSha }
    });

    // Author
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Author" },
        value: { type: "Text", content: authorDisplay }
    });

    // Date
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Date" },
        value: { type: "Text", content: new Date(commitDate).toLocaleString() }
    });

    // Commit URL (opens in new tab)
    if (commitData.html_url) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Commit URL" },
            value: {
                type: "Button",
                label: "Open commit",
                href: commitData.html_url,
                variant: "text"
            }
        });
    }

    // If content info is available, visualize file details
    if (content) {
        if (content.name) {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "File Name" },
                value: { type: "Text", content: content.name }
            });
        }
        if (content.path) {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Path" },
                value: { type: "Text", content: content.path }
            });
        }
        if (typeof content.size === "number") {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Size (bytes)" },
                value: { type: "Text", content: content.size.toString() }
            });
        }
        if (content.type) {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Type" },
                value: { type: "Text", content: content.type }
            });
        }
        // Download link
        if (content.download_url) {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Download" },
                value: {
                    type: "Button",
                    label: "Download file",
                    href: content.download_url,
                    variant: "text"
                }
            });
        }
    }

    // Compose the DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems
    };

    // Card header with icon, title, and sha subtitle
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: commitTitle,
        description: `#${shortSha}`,
        startElement: {
            type: "Icon",
            id: "code-branch",
            size: 28,
            color: "cyan"
        }
    };

    // Card content holding the data list
    const contentCard: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList
    };

    // Return a vertical card combining header and content for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, contentCard]
    };
}
