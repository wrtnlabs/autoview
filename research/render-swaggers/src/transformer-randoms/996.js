import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomFormatUri from "typia/lib/internal/_randomFormatUri.js";
import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l; return ({
        id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        account: "any type used...",
        repository_selection: __typia_transform__randomPick._randomPick([
            () => "all",
            () => "selected"
        ])(),
        access_tokens_url: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _b !== void 0 ? _b : __typia_transform__randomFormatUri._randomFormatUri)(),
        repositories_url: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _c !== void 0 ? _c : __typia_transform__randomFormatUri._randomFormatUri)(),
        html_url: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _d !== void 0 ? _d : __typia_transform__randomFormatUri._randomFormatUri)(),
        app_id: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _e !== void 0 ? _e : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        target_id: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _f !== void 0 ? _f : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        target_type: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _g !== void 0 ? _g : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        permissions: _ro1(_recursive, _recursive ? 1 + _depth : _depth),
        events: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _h !== void 0 ? _h : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        }),
        created_at: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _j !== void 0 ? _j : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        updated_at: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _k !== void 0 ? _k : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        single_file_name: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        has_multiple_single_files: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        single_file_paths: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                    type: "string"
                }); }
            }); }
        ])(),
        app_slug: ((_l = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _l !== void 0 ? _l : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        suspended_by: __typia_transform__randomPick._randomPick([
            () => null,
            () => _ro2(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        suspended_at: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])(),
        contact_email: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])()
    }); }; const _ro1 = (_recursive = false, _depth = 0) => ({
        actions: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        administration: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        checks: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        codespaces: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        contents: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        dependabot_secrets: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        deployments: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        environments: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        issues: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        metadata: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        packages: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        pages: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        pull_requests: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        repository_custom_properties: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        repository_hooks: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        repository_projects: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write",
            () => "admin"
        ])(),
        secret_scanning_alerts: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        secrets: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        security_events: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        single_file: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        statuses: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        vulnerability_alerts: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        workflows: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "write"
        ])(),
        members: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_administration: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_custom_roles: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_custom_org_roles: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_custom_properties: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write",
            () => "admin"
        ])(),
        organization_copilot_seat_management: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "write"
        ])(),
        organization_announcement_banners: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_events: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read"
        ])(),
        organization_hooks: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_personal_access_tokens: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_personal_access_token_requests: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_plan: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read"
        ])(),
        organization_projects: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write",
            () => "admin"
        ])(),
        organization_packages: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_secrets: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_self_hosted_runners: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        organization_user_blocking: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        team_discussions: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        email_addresses: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        followers: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        git_ssh_keys: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        gpg_keys: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        interaction_limits: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])(),
        profile: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "write"
        ])(),
        starring: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "read",
            () => "write"
        ])()
    }); const _ro2 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s; return ({
        name: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        email: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        login: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        id: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _b !== void 0 ? _b : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        node_id: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        avatar_url: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _d !== void 0 ? _d : __typia_transform__randomFormatUri._randomFormatUri)(),
        gravatar_id: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        url: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _e !== void 0 ? _e : __typia_transform__randomFormatUri._randomFormatUri)(),
        html_url: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _f !== void 0 ? _f : __typia_transform__randomFormatUri._randomFormatUri)(),
        followers_url: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _g !== void 0 ? _g : __typia_transform__randomFormatUri._randomFormatUri)(),
        following_url: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _h !== void 0 ? _h : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        gists_url: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _j !== void 0 ? _j : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        starred_url: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _k !== void 0 ? _k : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        subscriptions_url: ((_l = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _l !== void 0 ? _l : __typia_transform__randomFormatUri._randomFormatUri)(),
        organizations_url: ((_m = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _m !== void 0 ? _m : __typia_transform__randomFormatUri._randomFormatUri)(),
        repos_url: ((_o = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _o !== void 0 ? _o : __typia_transform__randomFormatUri._randomFormatUri)(),
        events_url: ((_p = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _p !== void 0 ? _p : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        received_events_url: ((_q = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _q !== void 0 ? _q : __typia_transform__randomFormatUri._randomFormatUri)(),
        type: ((_r = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _r !== void 0 ? _r : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        site_admin: ((_s = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _s !== void 0 ? _s : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        starred_at: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        user_view_type: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])()
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=996.js.map