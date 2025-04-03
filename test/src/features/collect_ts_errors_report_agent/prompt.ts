import { renderPrompt } from "@autoview/agent/src/core/Prompt";
import { IAutoViewCompilerResult } from "@autoview/interface";

export interface PromptContext {
  generated_code: string;
  diagnostics: IAutoViewCompilerResult.IDiagnostic[];
}

const rawPrompt = `
You are an AI assistant tasked with analyzing code generation pipeline results to identify which components are causing an LLM to generate incorrect TypeScript code. The code generation agent was tasked with generating a TypeScript function that utilizes available visual components.

Your goal is to identify which component and which properties make the code generation agent struggle to deal with them by analyzing and reviewing the generated attempt and the TypeScript compiler diagnostics.

First, review the generated code:

<generated_code>
{{generated_code}}
</generated_code>

Now, examine the compiler diagnostics:

<diagnostics>
{{diagnostics}}
</diagnostics>

Analyze the code and diagnostics carefully. Look for patterns of errors or inconsistencies that might indicate a problematic component or specific properties that the code generation agent struggled with.

To identify the most problematic component and its properties:
1. Look for components that are frequently associated with errors in the diagnostics.
2. Pay attention to properties that seem to be used incorrectly or inconsistently in the generated code.
3. Consider components that appear to have complex or unusual property requirements.
4. Focus on errors that suggest a fundamental misunderstanding of a component's structure or usage.

After your analysis, report your findings in the following format:

<component_name>
[The name of the component you've identified]
</component_name>

<component_properties>
[The list of the component's properties you've identified]
</component_properties>

Important notes:
1. Report ONLY problematic properties, not all properties of the identified component.
2. If multiple components meet the criteria, report the most problematic one.
3. The component name should be in the format "IAutoView.IAutoViewText" or "IAutoView.IAutoViewVerticalCard". Remove any "Props" suffix if present.
4. If you cannot confidently identify a problematic component, report "N/A" as the component name and use an empty array for properties.
5. The "component_properties" field must be a valid JSON array of strings.

Your final output should consist of only the <component_name> and <component_properties> tags with their respective contents. Do not include any additional explanation or analysis in your final output.
`;

export function prompt(context: PromptContext): string {
  return renderPrompt(rawPrompt, context);
}
