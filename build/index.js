"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  plugin: () => plugin
});
module.exports = __toCommonJS(src_exports);
var plugin = {
  templateFunctions: [
    {
      name: "laravel_csrf_cookie",
      description: "Retrieve the CSRF Cookie from Laravel Sanctum",
      args: [
        {
          type: "http_request",
          name: "request",
          label: "Sanctum Cookie Request"
        },
        {
          type: "text",
          name: "name",
          label: "Sanctum Cookie Name",
          defaultValue: "XSRF-TOKEN",
          placeholder: 'Laravel uses "XSRF-TOKEN" by default.'
        }
      ],
      async onRender(ctx, args) {
        const requestId = args.values.request;
        const cookieName = args.values.name ?? "XSRF-TOKEN";
        if (typeof requestId === "undefined") return null;
        const httpRequest = await ctx.httpRequest.getById({ id: requestId });
        if (httpRequest === null) return null;
        const response = await ctx.httpRequest.send({ httpRequest });
        if (response.error || response.status === 0) {
          const message = httpRequest.name ? `The dependent request could not be sent: ${httpRequest?.name}` : "The dependent request could not be sent.";
          ctx.toast.show({ color: "warning", message });
          return null;
        }
        if (response.status >= 400) {
          const message = httpRequest.name ? `The server returned an error for the dependent request: ${httpRequest?.name}).` : "The server returned an error for the dependent request";
          ctx.toast.show({ color: "warning", message });
          return null;
        }
        const cookie = response.headers.find((it) => {
          return (it.name === "Set-Cookie" || it.name === "set-cookie") && it.value.includes(cookieName);
        });
        if (typeof cookie === "undefined") {
          const message = `There was no ${cookieName} header present on the response.`;
          ctx.toast.show({ color: "warning", message });
          return null;
        }
        const pattern = new RegExp(`(?<=${cookieName}=)[^;]+`, "g");
        const token = cookie.value.match(pattern)[0];
        return decodeURIComponent(token);
      }
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  plugin
});
