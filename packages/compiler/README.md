# `@autoview/compiler`

Embedded TypeScript compiler for `@autoview/agent`.

It is for validation feedback, and bundling for actual running.

You can learn how to use it by looking the `test/src/features` test functions.

Also, after running the compiler test program, you can see the example values generated each test functions in the `test/results` directory. 

```bash
git clone https://github.com/wrtnlabs/autoview
cd autoview
pnpm install

cd test
pnpm start --include compiler
```