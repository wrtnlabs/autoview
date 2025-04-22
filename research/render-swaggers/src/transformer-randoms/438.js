import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => ({
        seat_breakdown: _ro1(_recursive, _recursive ? 1 + _depth : _depth),
        public_code_suggestions: __typia_transform__randomPick._randomPick([
            () => "block",
            () => "allow",
            () => "unconfigured"
        ])(),
        ide_chat: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "unconfigured"
        ])(),
        platform_chat: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "unconfigured"
        ])(),
        cli: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled",
            () => "unconfigured"
        ])(),
        seat_management_setting: __typia_transform__randomPick._randomPick([
            () => "disabled",
            () => "unconfigured",
            () => "assign_all",
            () => "assign_selected"
        ])(),
        plan_type: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "enterprise",
            () => "business"
        ])()
    }); const _ro1 = (_recursive = false, _depth = 0) => ({
        total: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        added_this_cycle: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        pending_cancellation: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        pending_invitation: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        active_this_cycle: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        inactive_this_cycle: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])()
    }); let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=438.js.map