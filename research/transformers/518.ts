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



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Map enforcement levels to friendly colors
  const enforcementColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    disabled: 'gray',
    active: 'green',
    evaluate: 'yellow',
  };

  // Build the card header with a colored chip showing enforcement status
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: input.name,
    description: `${input.source_type ?? 'Repository'}:${input.source}`,
    startElement: {
      type: 'Chip',
      label: input.enforcement,
      color: enforcementColorMap[input.enforcement] ?? 'primary',
      variant: 'filled',
      size: 'small',
    },
  };

  // Utility to create DataListItemProps for a simple text value
  function makeTextItem(
    label: string,
    value: string
  ): IAutoView.IAutoViewDataListItemProps {
    return {
      type: 'DataListItem',
      label: { type: 'Text', content: label, variant: 'subtitle2' },
      value: { type: 'Text', content: value, variant: 'body2' },
    };
  }

  // Gather detail items
  const details: IAutoView.IAutoViewDataListItemProps[] = [];

  details.push(makeTextItem('ID', `${input.id}`));
  details.push(makeTextItem('Target', input.target ?? '-'));
  // Show enforcement again in the list, this time as an outlined chip
  details.push({
    type: 'DataListItem',
    label: { type: 'Text', content: 'Enforcement', variant: 'subtitle2' },
    value: {
      type: 'Chip',
      label: input.enforcement,
      color: enforcementColorMap[input.enforcement] ?? 'primary',
      variant: 'outlined',
      size: 'small',
    },
  });
  if (input.current_user_can_bypass !== undefined) {
    details.push(
      makeTextItem(
        'Current user can bypass',
        input.current_user_can_bypass
      )
    );
  }

  // If there are bypass actors, nest a DataList showing each actor
  if (Array.isArray(input.bypass_actors) && input.bypass_actors.length > 0) {
    const actorItems: IAutoView.IAutoViewDataListItemProps[] =
      input.bypass_actors.map((actor) => {
        const idText =
          actor.actor_id !== null && actor.actor_id !== undefined
            ? `${actor.actor_id}`
            : 'n/a';
        const modeText = actor.bypass_mode
          ? ` (${actor.bypass_mode})`
          : '';
        return {
          type: 'DataListItem',
          label: {
            type: 'Text',
            content: actor.actor_type,
            variant: 'body2',
          },
          value: {
            type: 'Text',
            content: idText + modeText,
            variant: 'body2',
          },
        };
      });

    // Nested DataList component
    const nestedList: IAutoView.IAutoViewDataListProps = {
      type: 'DataList',
      childrenProps: actorItems,
    };

    details.push({
      type: 'DataListItem',
      label: {
        type: 'Text',
        content: 'Bypass Actors',
        variant: 'subtitle2',
      },
      value: nestedList,
    });
  }

  // Timestamps
  if (input.created_at) {
    details.push(
      makeTextItem(
        'Created',
        new Date(input.created_at).toLocaleString()
      )
    );
  }
  if (input.updated_at) {
    details.push(
      makeTextItem(
        'Updated',
        new Date(input.updated_at).toLocaleString()
      )
    );
  }

  // Card content wrapping the DataList of details
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: {
      type: 'DataList',
      childrenProps: details,
    },
  };

  // Optional footer with a link button to the HTML page
  const footerButtons: IAutoView.IAutoViewButtonProps[] = [];
  const htmlHref = input._links?.html?.href;
  if (htmlHref) {
    footerButtons.push({
      type: 'Button',
      label: 'View on GitHub',
      href: htmlHref,
      variant: 'text',
      color: 'primary',
      size: 'small',
    });
  }

  const children: Array<
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  > = [header, content];

  if (footerButtons.length > 0) {
    const footer: IAutoView.IAutoViewCardFooterProps = {
      type: 'CardFooter',
      childrenProps: footerButtons,
    };
    children.push(footer);
  }

  // Wrap everything in a vertical card for responsive layout
  return {
    type: 'VerticalCard',
    childrenProps: children,
  };
}
