import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A request for a specific ref(branch,sha,tag) to be deployed
     *
     * @title Deployment
    */
    export type deployment = {
        url: string & tags.Format<"uri">;
        /**
         * Unique identifier of the deployment
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        sha: string;
        /**
         * The ref to deploy. This can be a branch, tag, or sha.
        */
        ref: string;
        /**
         * Parameter to specify a task to execute
        */
        task: string;
        payload: {} | string;
        original_environment?: string;
        /**
         * Name for the target deployment environment.
        */
        environment: string;
        description: string | null;
        creator: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        statuses_url: string & tags.Format<"uri">;
        repository_url: string & tags.Format<"uri">;
        /**
         * Specifies if the given environment is will no longer exist at some point in the future. Default: false.
        */
        transient_environment?: boolean;
        /**
         * Specifies if the given environment is one that end-users directly interact with. Default: false.
        */
        production_environment?: boolean;
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
type IAutoViewTransformerInputType = Schema.deployment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Prepare chips for environment flags: production and transient
  const envChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.production_environment) {
    envChips.push({
      type: "Chip",
      label: "Production",
      color: "success",
      variant: "filled",
      size: "small",
    });
  }
  if (input.transient_environment) {
    envChips.push({
      type: "Chip",
      label: "Transient",
      color: "warning",
      variant: "filled",
      size: "small",
    });
  }

  // Build a list of key/value pairs for deployment details
  const details: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "ID" },
      value: { type: "Text", content: String(input.id) },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Ref" },
      value: { type: "Text", content: input.ref },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "SHA" },
      // Show a short SHA for readability
      value: { type: "Text", content: input.sha.substring(0, 7) },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Task" },
      value: { type: "Text", content: input.task },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created" },
      // Format dates to local string for legibility
      value: { type: "Text", content: new Date(input.created_at).toLocaleString() },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Updated" },
      value: { type: "Text", content: new Date(input.updated_at).toLocaleString() },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Statuses" },
      value: {
        type: "Button",
        label: "View statuses",
        href: input.statuses_url,
        variant: "text",
        size: "small",
        endElement: {
          type: "Icon",
          id: "arrow-right",
          size: 16,
          color: "blue",
        },
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Repository" },
      value: {
        type: "Button",
        label: "View repo",
        href: input.repository_url,
        variant: "text",
        size: "small",
        endElement: {
          type: "Icon",
          id: "arrow-right",
          size: 16,
          color: "blue",
        },
      },
    },
  ];

  // Compose the vertical card UI
  const ui: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      // Header: shows environment name, optional description, and creator avatar
      {
        type: "CardHeader",
        title: input.environment,
        description: input.description ?? undefined,
        startElement:
          input.creator && input.creator.avatar_url
            ? {
                type: "Avatar",
                src: input.creator.avatar_url,
                name: input.creator.login,
                variant: "primary",
                size: 40,
              }
            : undefined,
      },
      // Content: include environment chips (if any) and a list of details
      {
        type: "CardContent",
        childrenProps: [
          // Show environment flags
          ...(envChips.length
            ? [
                {
                  type: "ChipGroup",
                  childrenProps: envChips,
                  maxItems: envChips.length,
                } as IAutoView.IAutoViewChipGroupProps,
              ]
            : []),
          // Detailed data list
          {
            type: "DataList",
            childrenProps: details,
          } as IAutoView.IAutoViewDataListProps,
        ],
      },
    ],
  };

  return ui;
}
