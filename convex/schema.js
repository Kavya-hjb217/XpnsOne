import { defineSchema, defineTable } from 'convex/server';
import{ v }from 'convex/values';


export default defineSchema({
  // Define your schema here
  users: defineTable({
    name:v.string(),
    email:v.string(),
    tokenIdentifier:v.string(),
    imageUrl:v.optional(v.string()),
  }),
});
