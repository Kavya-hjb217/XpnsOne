import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new group
export const createGroup = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    members: v.array(v.id("users")), // array of user _id's
    currentUserId: v.id("users"),    // creator's _id
  },
  handler: async (ctx, { name, description, members, currentUserId }) => {
    // Prepare members array with roles and timestamps
    const membersData = [
      {
        userId: currentUserId,
        role: "admin",
        joinedAt: Date.now(),
      },
      ...members.map((id) => ({
        userId: id,
        role: "member",
        joinedAt: Date.now(),
      })),
    ];

    return await ctx.db.insert("groups", {
      name,
      description: description ?? "",
      createdBy: currentUserId,
      members: membersData,
     
    });

    
  },
});

// Get all groups for a user
export const getGroupsForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return ctx.db
      .query("groups")
      .filter((q) => q.arraySome("members", "userId", (m) => q.eq(m, userId)))
      .collect();
  },
});

// Delete a group (only by admin)
export const deleteGroup = mutation({
  args: { groupId: v.id("groups"), userId: v.id("users") },
  handler: async (ctx, { groupId, userId }) => {
    const group = await ctx.db.get(groupId);
    if (!group) throw new Error("Group not found");

    const isAdmin = group.members.some(
      (m) => m.userId._id === userId && m.role === "admin"
    );
    if (!isAdmin) throw new Error("Only admins can delete the group");

    await ctx.db.delete(groupId);
    return true;
  },
});
