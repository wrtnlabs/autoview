import { AutoViewCompiler } from "@autoview/compiler";
import typia, { tags } from "typia";

export const test_compiler_compile_success = async (): Promise<void> => {
  const compiler = new AutoViewCompiler({
    parameters: typia.llm.parameters<IMember, "chatgpt">(),
  });
  compiler;
};

interface IMember {
  id: string;
  name: string;
  email: string & tags.Format<"uuid">;
}
