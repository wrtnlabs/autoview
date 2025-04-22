import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomFormatUri from "typia/lib/internal/_randomFormatUri.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f; return ({
        state: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        statuses: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _b !== void 0 ? _b : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => _ro1(_recursive, _recursive ? 1 + _depth : _depth)
        }),
        sha: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        total_count: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _d !== void 0 ? _d : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        repository: _ro2(_recursive, _recursive ? 1 + _depth : _depth),
        commit_url: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _e !== void 0 ? _e : __typia_transform__randomFormatUri._randomFormatUri)(),
        url: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _f !== void 0 ? _f : __typia_transform__randomFormatUri._randomFormatUri)()
    }); }; const _ro1 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g; return ({
        description: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        node_id: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        state: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        context: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _d !== void 0 ? _d : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        target_url: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])(),
        required: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        avatar_url: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])(),
        url: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _e !== void 0 ? _e : __typia_transform__randomFormatUri._randomFormatUri)(),
        created_at: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _f !== void 0 ? _f : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        updated_at: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _g !== void 0 ? _g : __typia_transform__randomFormatDatetime._randomFormatDatetime)()
    }); }; const _ro2 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19; return ({
        id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        node_id: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        full_name: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _d !== void 0 ? _d : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        owner: _ro3(_recursive, _recursive ? 1 + _depth : _depth),
        "private": ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _e !== void 0 ? _e : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        html_url: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _f !== void 0 ? _f : __typia_transform__randomFormatUri._randomFormatUri)(),
        description: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        fork: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _g !== void 0 ? _g : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        url: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _h !== void 0 ? _h : __typia_transform__randomFormatUri._randomFormatUri)(),
        archive_url: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _j !== void 0 ? _j : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        assignees_url: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _k !== void 0 ? _k : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        blobs_url: ((_l = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _l !== void 0 ? _l : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        branches_url: ((_m = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _m !== void 0 ? _m : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        collaborators_url: ((_o = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _o !== void 0 ? _o : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        comments_url: ((_p = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _p !== void 0 ? _p : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        commits_url: ((_q = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _q !== void 0 ? _q : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        compare_url: ((_r = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _r !== void 0 ? _r : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        contents_url: ((_s = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _s !== void 0 ? _s : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        contributors_url: ((_t = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _t !== void 0 ? _t : __typia_transform__randomFormatUri._randomFormatUri)(),
        deployments_url: ((_u = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _u !== void 0 ? _u : __typia_transform__randomFormatUri._randomFormatUri)(),
        downloads_url: ((_v = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _v !== void 0 ? _v : __typia_transform__randomFormatUri._randomFormatUri)(),
        events_url: ((_w = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _w !== void 0 ? _w : __typia_transform__randomFormatUri._randomFormatUri)(),
        forks_url: ((_x = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _x !== void 0 ? _x : __typia_transform__randomFormatUri._randomFormatUri)(),
        git_commits_url: ((_y = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _y !== void 0 ? _y : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        git_refs_url: ((_z = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _z !== void 0 ? _z : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        git_tags_url: ((_0 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _0 !== void 0 ? _0 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        git_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        issue_comment_url: ((_1 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _1 !== void 0 ? _1 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        issue_events_url: ((_2 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _2 !== void 0 ? _2 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        issues_url: ((_3 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _3 !== void 0 ? _3 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        keys_url: ((_4 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _4 !== void 0 ? _4 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        labels_url: ((_5 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _5 !== void 0 ? _5 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        languages_url: ((_6 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _6 !== void 0 ? _6 : __typia_transform__randomFormatUri._randomFormatUri)(),
        merges_url: ((_7 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _7 !== void 0 ? _7 : __typia_transform__randomFormatUri._randomFormatUri)(),
        milestones_url: ((_8 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _8 !== void 0 ? _8 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        notifications_url: ((_9 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _9 !== void 0 ? _9 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        pulls_url: ((_10 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _10 !== void 0 ? _10 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        releases_url: ((_11 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _11 !== void 0 ? _11 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        ssh_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        stargazers_url: ((_12 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _12 !== void 0 ? _12 : __typia_transform__randomFormatUri._randomFormatUri)(),
        statuses_url: ((_13 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _13 !== void 0 ? _13 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        subscribers_url: ((_14 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _14 !== void 0 ? _14 : __typia_transform__randomFormatUri._randomFormatUri)(),
        subscription_url: ((_15 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _15 !== void 0 ? _15 : __typia_transform__randomFormatUri._randomFormatUri)(),
        tags_url: ((_16 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _16 !== void 0 ? _16 : __typia_transform__randomFormatUri._randomFormatUri)(),
        teams_url: ((_17 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _17 !== void 0 ? _17 : __typia_transform__randomFormatUri._randomFormatUri)(),
        trees_url: ((_18 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _18 !== void 0 ? _18 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        clone_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        mirror_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        hooks_url: ((_19 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _19 !== void 0 ? _19 : __typia_transform__randomFormatUri._randomFormatUri)(),
        svn_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        homepage: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        language: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        forks_count: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        stargazers_count: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        watchers_count: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        size: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        default_branch: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        open_issues_count: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        is_template: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        topics: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                    type: "string"
                }); }
            }); }
        ])(),
        has_issues: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        has_projects: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        has_wiki: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        has_pages: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        has_downloads: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        has_discussions: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        archived: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        disabled: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        visibility: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        pushed_at: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])(),
        created_at: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])(),
        updated_at: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])(),
        permissions: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro4(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        role_name: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        temp_clone_token: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        delete_branch_on_merge: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        subscribers_count: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        network_count: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        code_of_conduct: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro5(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        license: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => _ro6(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        forks: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        open_issues: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        watchers: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        allow_forking: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        web_commit_signoff_required: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        security_and_analysis: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => _ro7(_recursive, _recursive ? 1 + _depth : _depth)
        ])()
    }); }; const _ro3 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s; return ({
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
    }); }; const _ro4 = (_recursive = false, _depth = 0) => ({
        admin: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        maintain: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        push: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        triage: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        pull: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])()
    }); const _ro5 = (_recursive = false, _depth = 0) => { var _a, _b, _c; return ({
        key: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        url: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _c !== void 0 ? _c : __typia_transform__randomFormatUri._randomFormatUri)(),
        body: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        html_url: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])()
    }); }; const _ro6 = (_recursive = false, _depth = 0) => ({
        key: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        name: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        spdx_id: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        node_id: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])()
    }); const _ro7 = (_recursive = false, _depth = 0) => ({
        advanced_security: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro8(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        code_security: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro9(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        dependabot_security_updates: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro10(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        secret_scanning: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro11(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        secret_scanning_push_protection: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro12(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        secret_scanning_non_provider_patterns: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro13(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        secret_scanning_ai_detection: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro14(_recursive, _recursive ? 1 + _depth : _depth)
        ])()
    }); const _ro8 = (_recursive = false, _depth = 0) => ({
        status: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled"
        ])()
    }); const _ro9 = (_recursive = false, _depth = 0) => ({
        status: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled"
        ])()
    }); const _ro10 = (_recursive = false, _depth = 0) => ({
        status: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled"
        ])()
    }); const _ro11 = (_recursive = false, _depth = 0) => ({
        status: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled"
        ])()
    }); const _ro12 = (_recursive = false, _depth = 0) => ({
        status: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled"
        ])()
    }); const _ro13 = (_recursive = false, _depth = 0) => ({
        status: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled"
        ])()
    }); const _ro14 = (_recursive = false, _depth = 0) => ({
        status: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "disabled",
            () => "enabled"
        ])()
    }); let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=708.js.map