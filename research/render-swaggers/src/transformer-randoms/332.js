import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => ({
        id: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        name: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        target_type: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "global",
            () => "organization",
            () => "enterprise"
        ])(),
        description: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        advanced_security: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled"
        ])(),
        dependency_graph: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        dependency_graph_autosubmit_action: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        dependency_graph_autosubmit_action_options: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro1(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        dependabot_alerts: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        dependabot_security_updates: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        code_scanning_default_setup: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        code_scanning_default_setup_options: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => _ro2(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        code_scanning_delegated_alert_dismissal: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        secret_scanning: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        secret_scanning_push_protection: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        secret_scanning_delegated_bypass: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        secret_scanning_delegated_bypass_options: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro3(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        secret_scanning_validity_checks: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        secret_scanning_non_provider_patterns: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        secret_scanning_generic_secrets: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        secret_scanning_delegated_alert_dismissal: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        private_vulnerability_reporting: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "not_set"
        ])(),
        enforcement: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "enforced",
            () => "unenforced"
        ])(),
        url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        html_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        created_at: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])(),
        updated_at: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])()
    }); const _ro1 = (_recursive = false, _depth = 0) => ({
        labeled_runners: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])()
    }); const _ro2 = (_recursive = false, _depth = 0) => ({
        runner_type: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => "standard",
            () => "not_set",
            () => "labeled"
        ])(),
        runner_label: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])()
    }); const _ro3 = (_recursive = false, _depth = 0) => ({
        reviewers: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => _ro4(_recursive, _recursive ? 1 + _depth : _depth)
            }); }
        ])()
    }); const _ro4 = (_recursive = false, _depth = 0) => { var _a; return ({
        reviewer_id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        reviewer_type: __typia_transform__randomPick._randomPick([
            () => "TEAM",
            () => "ROLE"
        ])()
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=332.js.map