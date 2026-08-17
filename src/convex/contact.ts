import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const submitContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organisation: v.optional(v.string()),
    interest: v.optional(v.string()),
    subject: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contactMessages", args);
  },
});
