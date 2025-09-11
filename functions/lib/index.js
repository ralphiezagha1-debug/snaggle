"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendgridTestV2 = exports.authOnCreate = exports.waitlist = exports.stripeWebhook = exports.createCheckoutSession = exports.placeBid = exports.http = void 0;
const https_1 = require("firebase-functions/v2/https");
const express_1 = __importDefault(require("express"));
// Keep a simple HTTP app alive for existing routing
const app = (0, express_1.default)();
app.get("/health", (_req, res) => res.status(200).send("ok"));
exports.http = (0, https_1.onRequest)({ region: "us-central1" }, app);
// Existing function exports (make sure the files exist below)
var placeBid_1 = require("./placeBid");
Object.defineProperty(exports, "placeBid", { enumerable: true, get: function () { return placeBid_1.placeBid; } });
var createCheckoutSession_1 = require("./createCheckoutSession");
Object.defineProperty(exports, "createCheckoutSession", { enumerable: true, get: function () { return createCheckoutSession_1.createCheckoutSession; } });
var stripeWebhook_1 = require("./stripeWebhook");
Object.defineProperty(exports, "stripeWebhook", { enumerable: true, get: function () { return stripeWebhook_1.stripeWebhook; } });
var waitlist_1 = require("./waitlist");
Object.defineProperty(exports, "waitlist", { enumerable: true, get: function () { return waitlist_1.waitlist; } });
// New auth trigger (SendGrid welcome/verify)
var authOnCreate_1 = require("./authOnCreate");
Object.defineProperty(exports, "authOnCreate", { enumerable: true, get: function () { return authOnCreate_1.authOnCreate; } });
var sendgridTestV2_1 = require("./sendgridTestV2");
Object.defineProperty(exports, "sendgridTestV2", { enumerable: true, get: function () { return sendgridTestV2_1.sendgridTestV2; } });
