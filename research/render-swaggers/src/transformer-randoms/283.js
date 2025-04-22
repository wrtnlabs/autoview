import typia from "typia";
export function random() {
    return (() => { let _generator; return generator => {
        _generator = generator;
        return "any type used...";
    }; })()();
}
//# sourceMappingURL=283.js.map