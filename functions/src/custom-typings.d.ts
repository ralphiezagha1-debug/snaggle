// These ambient module declarations allow TypeScript to compile without
// resolving types from external packages that are not installed locally. The
// Firebase Functions v2 SDK and other thirdâ€‘party libraries rely on their own
// type definitions which are not available in this build environment. Declaring
// them as `any` prevents compile errors while still allowing the functions to
// run at runtime on the Cloud Functions platform.

declare module "firebase-functions/v2/https" {
  export const onRequest: any;
  export const onCall: any;
  /**
   * Represents an HTTPS error class used by callable functions. Defining it as
   * a class with a variadic constructor ensures TypeScript treats it as a
   * value and a type. The implementation details are ignored at compile time.
   */
  export class HttpsError {
    constructor(...args: any[]);
  }
}

declare module "firebase-functions/params" {
  export function defineSecret(name: string): any;
  export function defineString(name: string): any;
}

declare module "@sendgrid/mail" {
  const sgMail: any;
  export default sgMail;
}

declare module "express-rate-limit" {
  const rateLimit: any;
  export default rateLimit;
}

declare module "stripe" {
  const Stripe: any;
  export default Stripe;
}

declare module "firebase-admin" {
  const admin: any;
  export default admin;
}

declare module "firebase-admin/app" {
  export const getApps: any;
  export const initializeApp: any;
  export const getApp: any;
}

declare module "firebase-admin/firestore" {
  export const getFirestore: any;
  export const FieldValue: any;
}

declare module "firebase-admin/auth" {
  export const getAuth: any;
}

declare module "cors" {
  const cors: any;
  export default cors;
}

declare module "express" {
  const exp: any;
  export default exp;
}

