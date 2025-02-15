# Autoview
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wrtnlabs/autoview/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@wrtnlabs/autoview.svg)](https://www.npmjs.com/package/@wrtnlabs/autoview)
[![Downloads](https://img.shields.io/npm/dm/@wrtnlabs/autoview.svg)](https://www.npmjs.com/package/@wrtnlabs/autoview)
[![Build Status](https://github.com/wrtnlabs/autoview/workflows/build/badge.svg)](https://github.com/wrtnlabs/autoview/actions?query=workflow%3Abuild)

Automatic viewer renderer by AI agent with JSON schema.



## How to Use
### Setup
```bash
npm install @wrtnlabs/autoview typia
npm install -D @ryoppippi/unplugin-typia
npx typia setup
```

### Value Automation Tool
```typescript
import { 
  IAutoViewComponentProps,
  AutoView,
  AutoViewAgent
} from "@wrtnlabs/autoview";
import ReactDOM from "react-dom";

const main = async (): Promise<void> => {
  const props: IAutoViewComponentProps = await AutoViewAgent.value({
    value: {...},
    provider: {},
  });
  ReactDOM.render(<AutoView {...props} />, document.body);
};
main().catch(console.error);
```

### Schema Automation Tool
```typescript
import { 
  IAutoViewComponentProps,
  AutoView,
  AutoViewAgent
} from "@wrtnlabs/autoview";
import ReactDOM from "react-dom";
import typia from "typia";

export const transformYourSchema: (
  value: YourSchema,
) => IAutoViewComponentPros = 
  await AutoViewAgent.schema({
    metadata: typia.json.schemas<[YourSchema]>(),
    random: typia.createRandom<YourSchema>(),
  });
```



## Principles
### LLM Function Calling
### Validation Feedback
```typescript
import { IAutoViewComponentProps } from "@wrtnlabs/autoview";
import { FunctionCall } from "pseudo";
import { ILlmFunctionOfValidate, IValidation } from "typia";

export const correctFunctionCall = (ctx: {
  call: FunctionCall;
  retry: (reason: string, errors?: IValidation.IError[]) => Promise<unknown>;
}): Promise<unknown> => {
  // GET FUNCTION
  if (ctx.call.name !== "render")
    return ctx.retry("Unable to find function. Try it again");

  // VALIDATE
  const result: IValidation<{
    props: IAutoViewComponentProps;
  }> = func.validate(ctx.call.arguments);
  if (result.success === false) {
    // 1st trial: 50% (gpt-4o-mini in shopping mall chatbot)
    // 2nd trial with validation feedback: 99%
    // 3nd trial with validation feedback again: never have failed
    return ctx.retry(
      "Type errors are detected. Correct it through validation errors",
      {
        errors: result.errors,
      },
    );
  }
  return result.data;
}
```

Is LLM function calling perfect?

The answer is not. LLM (Large Language Model) providers like OpenAI take a lot of type level mistakes when composing the arguments of the target function to call. Even though an LLM function calling schema has defined an `Array<string>` type, LLM often fills it just by a `string` typed value.

Therefore, when developing an LLM function calling agent, the validation feedback process is essentially required. If LLM takes a type level mistake on arguments composition, the agent must feedback the most detailed validation errors, and let LLM to retry the function calling referencing the validation errors.

About the validation feedback, `@wrtnlabs/autoview` is utilizing [`typia.validate<T>()`](https://typia.io/docs/validators/validate). It constructs validation logic by analyzing TypeScript source codes and types in the compilation level, so that detailed and accurate than any other validator libraries like below. Also, as `IAutoViewComponentProps` has an extremely complicated union type, `typia` is the sole validator which can feedback the `IAutoViewComponentProps` type.

Such validation feedback strategy and combination with `typia` runtime validator, `@wrtnlabs/autoview` has achieved the most ideal LLM function calling for the frontend viewer component automation. In my experience, when using OpenAI's `gpt-4o-mini` model, it tends to construct invalid function calling arguments at the first trial about 50% of the time. By the way, if correct it through validation feedback with `typia`, success rate soars to 99%. And I've never had a failure when trying validation feedback twice.

Components               | `typia` | `TypeBox` | `ajv` | `io-ts` | `zod` | `C.V.`
-------------------------|--------|-----------|-------|---------|-------|------------------
**Easy to use**          | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ 
[Object (simple)](https://github.com/samchon/typia/blob/master/test/src/structures/ObjectSimple.ts)          | ✔ | ✔ | ✔ | ✔ | ✔ | ✔
[Object (hierarchical)](https://github.com/samchon/typia/blob/master/test/src/structures/ObjectHierarchical.ts)    | ✔ | ✔ | ✔ | ✔ | ✔ | ✔
[Object (recursive)](https://github.com/samchon/typia/blob/master/test/src/structures/ObjectRecursive.ts)       | ✔ | ❌ | ✔ | ✔ | ✔ | ✔ | ✔
[Object (union, implicit)](https://github.com/samchon/typia/blob/master/test/src/structures/ObjectUnionImplicit.ts) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌
[Object (union, explicit)](https://github.com/samchon/typia/blob/master/test/src/structures/ObjectUnionExplicit.ts) | ✔ | ✔ | ✔ | ✔ | ✔ | ❌
[Object (additional tags)](https://github.com/samchon/typia/#comment-tags)        | ✔ | ✔ | ✔ | ✔ | ✔ | ✔
[Object (template literal types)](https://github.com/samchon/typia/blob/master/test/src/structures/TemplateUnion.ts) | ✔ | ✔ | ✔ | ❌ | ❌ | ❌
[Object (dynamic properties)](https://github.com/samchon/typia/blob/master/test/src/structures/DynamicTemplate.ts) | ✔ | ✔ | ✔ | ❌ | ❌ | ❌
[Array (rest tuple)](https://github.com/samchon/typia/blob/master/test/src/structures/TupleRestAtomic.ts) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌
[Array (hierarchical)](https://github.com/samchon/typia/blob/master/test/src/structures/ArrayHierarchical.ts)     | ✔ | ✔ | ✔ | ✔ | ✔ | ✔
[Array (recursive)](https://github.com/samchon/typia/blob/master/test/src/structures/ArrayRecursive.ts)        | ✔ | ✔ | ✔ | ✔ | ✔ | ❌
[Array (recursive, union)](https://github.com/samchon/typia/blob/master/test/src/structures/ArrayRecursiveUnionExplicit.ts) | ✔ | ✔ | ❌ | ✔ | ✔ | ❌
[Array (R+U, implicit)](https://github.com/samchon/typia/blob/master/test/src/structures/ArrayRecursiveUnionImplicit.ts)    | ✅ | ❌ | ❌ | ❌ | ❌ | ❌
[Array (repeated)](https://github.com/samchon/typia/blob/master/test/src/structures/ArrayRepeatedNullable.ts)    | ✅ | ❌ | ❌ | ❌ | ❌ | ❌
[Array (repeated, union)](https://github.com/samchon/typia/blob/master/test/structures/ArrayRepeatedUnionWithTuple.ts)    | ✅ | ❌ | ❌ | ❌ | ❌ | ❌
[**Ultimate Union Type**](https://github.com/samchon/typia/blob/master/src/schemas/IJsonSchema.ts)  | ✅ | ❌ | ❌ | ❌ | ❌ | ❌

> `C.V.` means `class-validator`

### Compilation Feedback
```typescript
import { FunctionCall } from "pseudo";
import { ILlmFunctionOfValidate, IValidation } from "typia";

export const correctCompile = <T>(ctx: {
  call: FunctionCall;
  compile: (src: string) => Promise<IValidation<(v: T) => IAutoViewComponentProps>>;
  random: () => T;
  repeat: number;
  retry: (reason: string, errors?: IValidation.IError[]) => Promise<unknown>;
}): Promise<(v: T) => IAutoViewComponentProps>> => {
  // GET FUNCTION
  if (ctx.call.name !== "render")
    return ctx.retry("Unable to find function. Try it again");

  // COMPILE
  const result: IValidation<(v: T) => IAutoViewComponentProps>> = 
    await ctx.compile(call.arguments.source);
  if (result.success === false)
    return ctx.retry("Correct compilation errors", result.errors);

  // VALIDATE
  for (let i: number = 0; i < ctx.repeat; ++i) {
    const value: T = ctx.random();
    const props: IAutoViewComponentProps = result.data(value);
    const validation: IValidation<IAutoViewComponentProps> = func.validate(props);
    if (validation.success === false) {
      // 1st trial: 50% (gpt-4o-mini in shopping mall chatbot)
      // 2nd trial with validation feedback: 99%
      // 3nd trial with validation feedback again: never have failed
      return ctx.retry(
        "Type errors are detected. Correct it through validation errors",
        {
          errors: validation.errors,
        },
      );
    }
  }
  return result.data;
}
```

As I've mentioned in the above section, LLM function calling is not perfect. Also, TypeScript code generation by AI agent is not perfect either. So compilation feedback strategy is required like runtime feedback case.

For the compilation feedback, `@wrtnlabs/autoview` is embedding TypeScript compiler. When schema autoomation tool writes invalid TyypeScript code so that compilation error occurred, `@wrtnlabs/autoview` will correct the TypeScript code by delivering the compilation error messages to the schema automation tool.

By the way, even though no compilation error occurred in the TypeScript code generation from the schema automation tool, may we say that there's no problem on the code? It may not. The runtime data can violate the `IAutoViewComponentProps` type due to the domain restriction reasons. 

To avoid this problem, `@wrtnlabs/autoview` generates target schema's data randomly using [`typia.random<T>()`](https://typia.io/docs/random) function. And transforms `IAutoViewComponentProps` typed value from the newly created function, and validates it with [`typia.validate<IAutoViewComponentProps>()`](https://typia.io/docs/validators/validate) function. If the newly generated schema data occurs runtime error in the transformation, or could not pass the validation, `@wrtnlabs/autoview` re-writes the TypeScript code with the runtime or type error feedback.

Such compiler feedback strategy and combination with `typia`'s random data generator and runtime validator, `@wrtnlabs/autoview` has achieved the most ideal LLM function calling for the frontend viewer component automation.



## Benchmark
```bash
git clone https://github.com/wrtnlabs/autoview
code autoview
pnpm install

pnpm run dev  # FRONTEND DEVELOPMENT
pnpm run test # RUN TEST BENCHMARK PROGRAM
```

Above above commands.

Then you can see the benchmark results in both `public/results/json` and `public/results/images` directories.

By the way, as the `pnpm run dev` is a command of incremental build of the frontend application, you have to open at least two terminals, and run both `pnpm run dev` and `pnpm run test` commands in each terminal.