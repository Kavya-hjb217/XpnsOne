import { defineSchema, defineTable } from 'convex/server';
import{ v }from 'convex/values';



export default defineSchema({
  // Define your schema here
  users: defineTable({
    name:v.string(),
    email:v.string(),
    tokenIdentifier:v.string(),
    imageUrl:v.optional(v.string()),
  }).index("by_token",["tokenIdentifier"])
    .index("by_email",["email"]),
//     .searchIndex("search_name",{searchFields:["name"]})
//     .searchIndex("search_email",{searchFields:"email"}),
});