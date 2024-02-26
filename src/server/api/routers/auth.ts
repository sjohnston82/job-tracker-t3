// import { z } from "zod";
// import bcrypt from "bcrypt";
// import { uuid } from "uuidv4";

// import {
//   createTRPCRouter,
//   protectedProcedure,
//   publicProcedure,
// } from "~/server/api/trpc";
// import { users } from "~/server/db/schema";
// import { db } from "~/server/db";
// import { eq } from "drizzle-orm";
// import { redirect } from "next/navigation";

// export const authRouter = createTRPCRouter({
//   register: publicProcedure
//     .input(
//       z.object({
//         email: z.string(),
//         username: z.string(),
//         password: z.string(),
//         confirmPassword: z.string(),
//       }),
//     )
//     .mutation(async ({ input }) => {

//       // check if user already exists
//       const currentUser = await db
//         .select()
//         .from(users)
//         .where(eq(users.username, input.username))
//         .then((result) => result[0]);

//       if (currentUser) {
//         // if user exists, return error saying user exists
//         throw new Error("This username or email is already used.");
//       } else {
//         // otherwise, verify password and confirmPassword match
//         if (input.password !== input.confirmPassword) {
//           throw new Error("The passwords do not match.");
//         } else {
//         }
//       }
//       // hash password and save to db
//       const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(input.password, saltRounds);

//       try {
//         const newUser = await db
//           .insert(users)
//           .values({
//             email: input.email,
//             username: input.username,
//             passwordHash: hashedPassword,
//           })
//           .execute();

//         // redirect to sign in page
//         redirect("/login");
//         return newUser;
//       } catch (error) {
//         console.log(error);
//       }

//       //
//     }),
// });
