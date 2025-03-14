import { Provider, createContext, useContext } from "react";

const NOT_PROVIDED_CONTEXT = Symbol("NOT_PROVIDED_CONTEXT");

type ICreateSafeContextResult<Key extends string, Type> = {
  [key in `use${Key}Context`]: () => Type;
} & { [key in `${Key}Provider`]: Provider<Type> } & {
  [key in `${Key}Context`]: React.Context<Type>;
};

/**
 * Creates a Context and creates a ContextProvider, a hook that raises an error if a value is not provided when using the Context.
 * @param displayName - The name of the Context. Write in PascalCase.
 * @example
 * ```ts
 * const { TestContext, TestProvider, useTest } = createSafeContext("Test")<string>();
 * ```
 */

export const createSafeContext =
  <Key extends string>(displayName: Key) =>
  <Type>(
    messages?: undefined | string,
  ): ICreateSafeContextResult<Key, Type> => {
    const context = createContext<Type | typeof NOT_PROVIDED_CONTEXT>(
      NOT_PROVIDED_CONTEXT,
    );
    context.displayName = displayName;

    const useSafeContext = () => {
      const value = useContext(context);
      if (value === NOT_PROVIDED_CONTEXT) {
        throw new Error(
          messages ??
            `${context.displayName ?? "Unknown Context"} is not provided.`,
        );
      }
      return value;
    };

    const provider = context.Provider as Provider<Type>;

    return {
      [`use${displayName}Context`]: useSafeContext,
      [`${displayName}Provider`]: provider,
      [`${displayName}Context`]: context,
    } as ICreateSafeContextResult<Key, Type>;
  };
