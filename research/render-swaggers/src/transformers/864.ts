import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A set of rules to apply when specified conditions are met.
     *
     * @title Repository ruleset
    */
    export type repository_ruleset = {
        /**
         * The ID of the ruleset
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the ruleset
        */
        name: string;
        /**
         * The target of the ruleset
        */
        target?: "branch" | "tag" | "push" | "repository";
        /**
         * The type of the source of the ruleset
        */
        source_type?: "Repository" | "Organization" | "Enterprise";
        /**
         * The name of the source
        */
        source: string;
        enforcement: Schema.repository_rule_enforcement;
        /**
         * The actors that can bypass the rules in this ruleset
        */
        bypass_actors?: Schema.repository_ruleset_bypass_actor[];
        /**
         * The bypass type of the user making the API request for this ruleset. This field is only returned when
         * querying the repository-level endpoint.
        */
        current_user_can_bypass?: "always" | "pull_requests_only" | "never";
        node_id?: string;
        _links?: {
            self?: {
                /**
                 * The URL of the ruleset
                */
                href?: string;
            };
            html?: {
                /**
                 * The html URL of the ruleset
                */
                href?: string;
            } | null;
        };
        conditions?: any | any | null;
        rules?: Schema.repository_rule[];
        created_at?: string & tags.Format<"date-time">;
        updated_at?: string & tags.Format<"date-time">;
    };
    /**
     * The enforcement level of the ruleset. `evaluate` allows admins to test rules before enforcing them. Admins can view insights on the Rule Insights page (`evaluate` is only available with GitHub Enterprise).
    */
    export type repository_rule_enforcement = "disabled" | "active" | "evaluate";
    /**
     * An actor that can bypass rules in a ruleset
     *
     * @title Repository Ruleset Bypass Actor
    */
    export type repository_ruleset_bypass_actor = {
        /**
         * The ID of the actor that can bypass a ruleset. If `actor_type` is `OrganizationAdmin`, this should be `1`. If `actor_type` is `DeployKey`, this should be null. `OrganizationAdmin` is not applicable for personal repositories.
        */
        actor_id?: (number & tags.Type<"int32">) | null;
        /**
         * The type of actor that can bypass a ruleset.
        */
        actor_type: "Integration" | "OrganizationAdmin" | "RepositoryRole" | "Team" | "DeployKey";
        /**
         * When the specified actor can bypass the ruleset. `pull_request` means that an actor can only bypass rules on pull requests. `pull_request` is not applicable for the `DeployKey` actor type. Also, `pull_request` is only applicable to branch rulesets.
        */
        bypass_mode?: "always" | "pull_request";
    };
    export type repository_ruleset_conditions = any;
    export type org_ruleset_conditions = any;
    /**
     * A repository rule.
     *
     * @title Repository Rule
    */
    export type repository_rule = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;
    export type repository_rule_creation = any;
    export type repository_rule_update = any;
    export type repository_rule_deletion = any;
    export type repository_rule_required_linear_history = any;
    export type repository_rule_merge_queue = any;
    export type repository_rule_required_deployments = any;
    export type repository_rule_required_signatures = any;
    export type repository_rule_pull_request = any;
    export type repository_rule_required_status_checks = any;
    export type repository_rule_non_fast_forward = any;
    export type repository_rule_commit_message_pattern = any;
    export type repository_rule_commit_author_email_pattern = any;
    export type repository_rule_committer_email_pattern = any;
    export type repository_rule_branch_name_pattern = any;
    export type repository_rule_tag_name_pattern = any;
    export type repository_rule_file_path_restriction = any;
    export type repository_rule_max_file_path_length = any;
    export type repository_rule_file_extension_restriction = any;
    export type repository_rule_max_file_size = any;
    export type repository_rule_workflows = any;
    export type repository_rule_code_scanning = any;
}
type IAutoViewTransformerInputType = Schema.repository_ruleset;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Helper functions to map enum values to UI colors
function mapEnforcementColor(
  enforcement: string,
): IAutoView.IAutoViewChipProps['color'] {
  switch (enforcement) {
    case 'active':
      return 'success';
    case 'evaluate':
      return 'info';
    case 'disabled':
    default:
      return 'gray';
  }
}

function mapTargetColor(
  target: string,
): IAutoView.IAutoViewChipProps['color'] {
  switch (target) {
    case 'branch':
      return 'primary';
    case 'tag':
      return 'secondary';
    case 'push':
      return 'success';
    case 'repository':
    default:
      return 'info';
  }
}

function mapSourceTypeColor(
  sourceType: string,
): IAutoView.IAutoViewChipProps['color'] {
  switch (sourceType) {
    case 'Repository':
      return 'primary';
    case 'Organization':
      return 'secondary';
    case 'Enterprise':
    default:
      return 'info';
  }
}

function mapBypassModeColor(
  mode: string,
): IAutoView.IAutoViewChipProps['color'] {
  switch (mode) {
    case 'always':
      return 'success';
    case 'pull_request':
    case 'pull_requests_only':
      return 'warning';
    case 'never':
    default:
      return 'error';
  }
}

function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // 1. CardHeader with the ruleset name and enforcement badge
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: input.name,
    description: `ID: ${input.id}`,
    endElement: {
      type: 'Chip',
      label: input.enforcement,
      variant: 'filled',
      size: 'medium',
      color: mapEnforcementColor(input.enforcement),
    },
  };

  // 2. Build DataListItems for the core properties
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Source
  items.push({
    type: 'DataListItem',
    label: { type: 'Text', content: 'Source' },
    value: { type: 'Text', content: input.source },
  });

  // Target (enum)
  if (input.target) {
    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Target' },
      value: {
        type: 'Chip',
        label: input.target,
        variant: 'outlined',
        size: 'small',
        color: mapTargetColor(input.target),
      },
    });
  }

  // Source Type (enum)
  if (input.source_type) {
    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Source Type' },
      value: {
        type: 'Chip',
        label: input.source_type,
        variant: 'outlined',
        size: 'small',
        color: mapSourceTypeColor(input.source_type),
      },
    });
  }

  // Current User Can Bypass
  if (input.current_user_can_bypass) {
    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Your Bypass Mode' },
      value: {
        type: 'Chip',
        label: input.current_user_can_bypass,
        variant: 'outlined',
        size: 'small',
        color: mapBypassModeColor(input.current_user_can_bypass),
      },
    });
  }

  // Created / Updated timestamps
  if (input.created_at) {
    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Created At' },
      value: { type: 'Text', content: new Date(input.created_at).toLocaleString() },
    });
  }
  if (input.updated_at) {
    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Updated At' },
      value: { type: 'Text', content: new Date(input.updated_at).toLocaleString() },
    });
  }

  // Bypass Actors: render as markdown bullet list
  if (Array.isArray(input.bypass_actors) && input.bypass_actors.length > 0) {
    const mdLines = input.bypass_actors.map(actor => {
      const idLabel = actor.actor_id != null ? ` (ID: ${actor.actor_id})` : '';
      return `- **${actor.actor_type}**${idLabel}${actor.bypass_mode ? ` — mode: ${actor.bypass_mode}` : ''}`;
    });
    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Bypass Actors' },
      value: { type: 'Markdown', content: mdLines.join('\n') },
    });
  }

  // 3. Wrap items in a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: items,
  };

  // 4. CardContent to hold our DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: [dataList],
  };

  // 5. Compose final VerticalCard
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: 'VerticalCard',
    childrenProps: [header, content],
  };

  return card;
}
