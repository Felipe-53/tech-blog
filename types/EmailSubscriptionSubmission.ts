export type EmailSubscriptionSubmission =
  | null
  | "success"
  | "failure"
  | "already-subscribed"

export const emailSubscriptionSubmissionState = {
  success: "success",
  failure: "failure",
  alreadySubscribed: "already-subscribed",
} as const
