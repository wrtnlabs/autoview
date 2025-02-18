# Autoview
![Gear Conceptual Diagram](https://github.com/user-attachments/assets/d2b40f25-db1a-42fe-8cba-af4652b18452)

<!-- @todo Replace to example gif image, or video please -->

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wrtnlabs/autoview/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@wrtnlabs/autoview.svg)](https://www.npmjs.com/package/@wrtnlabs/autoview)
[![Downloads](https://img.shields.io/npm/dm/@wrtnlabs/autoview.svg)](https://www.npmjs.com/package/@wrtnlabs/autoview)
[![Build Status](https://github.com/wrtnlabs/autoview/workflows/build/badge.svg)](https://github.com/wrtnlabs/autoview/actions?query=workflow%3Abuild)

Automated Fontend Viewer Development.

`@wrtnlabs/autoview` is an automation tool of frontend viewer development. It can automatically compose React viewer components, just by delivering a `value` to the `AutoViewAgent.value()` function. Also, it can compile a TypeScript code rendering a specific TypeScript type through `AutoViewAgent.compile()` function.

Additionally, if you have a Swagger (OpenAPI) document, you can generate TypeScript codes rendering viewer components for every API operations. If you combined the automatically generated TypeScript codes from `@wrtnlabs/autoview`, you can dramatically enhance productivity of the frontend application interacting with the backend server.

To automate the frontend viewer development, `@wrtnlabs/autoview` is performing LLM (Large Language Model) function calling strategy enhanced by compiler and validator feedbacks. Goal of the LLM function calling strategy is to composing the `IAutoViewComponentProps` typed instance, and it would be rendered by `<AutoViewComponent />` component.




## How to Use
### Setup
```bash
npm install @wrtnlabs/autoview

npm install typia
npx typia setup

npm install -D @ryoppippi/unplugin-typia
```

Install not only `@wrtnlabs/autoview`, but also [`typia`](https://github.com/samchon/typia).

By the way, as `typia` is a transformer library analyzing TypeScript source code in the compilation level, it needs additional setup command `npx typia setup`. 

Also, most frontend developers are not using the standard TypeScript compiler [`typescript`](https://www.npmjs.com/package/typescript). If you are one of them, please install [`@ryoppippi/unplugin-typia`](https://github.com/ryoppippi/unplugin-typia) additionally, following the below guide document.

  - [Typia > Guide Documents > Setup > `unplugin-typia`](https://typia.io/docs/setup/#unplugin-typia)

### Value Automation Tool
```typescript
import { 
  AutoViewAgent,
  AutoViewComponent,
  IAutoViewComponentProps
} from "@wrtnlabs/autoview";
import OpenAI from "openai";
import ReactDOM from "react-dom";
import typia from "typia";

const main = async (): Promise<void> => {
  const props: IAutoViewComponentProps = await AutoViewAgent.value({
    provider: {
      type: "chatgpt",
      model: "gpt-4o",
      api: new OpenAI({
        apiKey: "YOUR_OPENAI_API_KEY",
      }),
    },
    metadata: typia.llm.parameters<YourSchema, "chatgpt">(),
    value: {...},
  });
  ReactDOM.render(<AutoViewComponent {...props} />, document.body);
};
main().catch(console.error);
```

Automate frontend development by a `value`.

If you want to render a value through AI agent of `@wrtnlabs/agent`, call the `AutoViewAgent.value()` function. It will return `IAutoViewComponentProps` typed value, which can be delivered to the `<AutoViewComponent />` component, so that you can accomplish the value viewer automation.

Also, when filling arguments of the `AutoViewAgent.value()` function, you can explain metadata of the `value` by configuring the `metadata` property composed by [`typia.llm.parameters<T, Model>()`](https://typia.io/docs/llm/parameters) function. If you skip the `metadata` composition, you can't hint any definition to the AI agent, and the AI agent will just judge by itself just by content of the `value`.

### TypeScript Code Generator
```typescript
//----
// CODE GENERATOR
//----
import { AutoViewAgent } from "@wrtnlabs/autoview";
import fs from "fs";
import typia from "typia";

export const script: string = await AutoViewAgent.schema({
  provider: {
    type: "chatgpt",
    model: "gpt-4o",
    api: new OpenAI({
      apiKey: "YOUR_OPENAI_API_KEY",
    }),
  },
  metadata: typia.llm.parameters<YourSchema, "chatgpt">(),
  random: typia.createRandom<YourSchema>(),
});
await fs.promises.writeFile("convertYourSchema.ts", script, "utf8");

//----
// GENERATED CODE
//----
import { IAutoViewComponentProps } from "@wrtnlabs/agent";

export const $convert = (input: YourSchema): IAutoViewComponentProps => {
  return { ... };
};

//----
// UTILIZATITON CODE
//----
import { AutoViewComponent, IAutoViewComponentProps } from "@wrtnlabs/agent";
import ReactDOM from "react-dom";

const props: IAutoViewComponentProps = $convert({ ... });
ReactDOM.render(<AutoViewComponent {...props} />, document.body);
```

Automate frontend development by `schema`.

In the above section [#Value Automation Tool](#value-automation-tool), we've learned how to automate the value viewer rendering through `AutoViewAgent.value()` function. By the way, if you need to automate the value viewer rendering repeatedly, it may consume a lot of time and a lot of LLM costs.

In that case, you can utilize `AutoViewAgent.compile()` function instead. When you put target schema type, it would return a TypeScript code. And the `AutoViewAgent.compile()` function written TypeScript code contains a converter function from `YourSchema` type to `IAutoViewComponentProps` type like above.

To activate such `AutoViewAgent.value()` function, [`typia.llm.parameters<T, Model>()`](https://typia.io/docs/llm/parameters) and [`typia.random<T>()`](https://typia.io/docs/random) functions are required. The first `typia.llm.parameters<T, Model>()` function will inform the definition of the target type to the AI agent, and the other function `typia.random<T>()` will be used to internal validation.

### From Swagger Document
```typescript
import {
  HttpLlm,
  IHttpLlmApplication,
  IHttpLlmFunction,
  OpenApi,
  OpenApiV3,
  OpenApiV3_1,
  SwaggerV2,
} from "@samchon/openapi";
import { AutoViewAgent } from "@wrtnlabs/autoview";
import fs from "fs";

const original:
  | SwaggerV2.IDocument
  | OpenApiV3.IDocument
  | OpenApiV3_1.IDocument = await fetch(
  "https://shopping-be.wrtn.ai/editor/swagger.json",
).then((r) => r.json);
const document: OpenApi.IDocument = OpenApi.convert(original);
const application: IHttpLlmApplication<"chatgpt"> = HttpLlm.application({
  model: "chatgpt",
  document,
});
for (const func of application.functions) {
  const script: string = await AutoViewAgent.compile({
    provider: {
      type: "chatgpt",
      model: "gpt-4o",
      api: new OpenAI({
        apiKey: "YOUR_OPENAI_API_KEY",
      }),
    },
    metadata: func,
  });
  await fs.promises.writeFile(`${func.name}.convert.ts`, script, "utf8");
}
```

Automate return value viewer of API operations.

If you have a Swagger (OpenAPI) document of a backend server, you can entirely assist or automate the return value viewer development of every API operations. Load swagger document, and convert it to LLM function calling application schema bypassing `OpenApi.convert()` and `HttpLlm.application()` functions. 

And then generate TypeScript codes through `AutoViewAgent.compile()` for each API operation, then TypeScript codes rendering return value of every API operations would be automatically generated. With this way, you can boost up productivity of frontend application interacting with the backend server dramatically.




## Principles
### LLM Function Calling
`@wrtnlabs/autoview` fills `IAutoViewComponentProps` type by LLM function calling.

The LLM (Large Language Model) function calling means that, AI agent selects proper function to call, and fills arguments of the function by analyzing the conversation context. 

By the way, as `@wrtnlabs/autoview` delivers only target schema definition as context, and providing only one function `render()` to the AI agent, the AI agent will fill the arguments of the `render()` function by analyzing the target schema definition context.

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

Run above commands.

Then you can see the benchmark results in both `public/results/json` and `public/results/images` directories.

By the way, as the `pnpm run dev` is a command of incremental build of the frontend application, you have to open at least two terminals, and run both `pnpm run dev` and `pnpm run test` commands in each terminal.