// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// // import { registerSchema } from "~/schemas/register.schema";
// import { api } from "~/trpc/react";
// import { type UseFormReturn } from "react-hook-form";
// import { z } from "zod";
// // import dynamic from "next/dynamic";

// interface RegisterFormValues {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// const registerSchema = z
//   .object({
//     username: z.string().min(3, "Username must be at least 3 characters"),
//     email: z.string().email("Invalid email"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// const RegisterPage = () => {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   }: UseFormReturn<RegisterFormValues> = useForm({
//     resolver: zodResolver(registerSchema),
//   });

//   const registerUser = api.auth.register.useMutation({
//     onSuccess: async () => {
//       router.push("/login");
//     },
//   });

//   const onSubmit = (data: RegisterFormValues) => {
//     try {
//       console.log("registering");
//       const mutationData = {
//         username: data.username,
//         email: data.email,
//         password: data.password,
//         confirmPassword: data.confirmPassword,
//       };
//       registerUser.mutate(mutationData);
//     } catch (error) {
//       console.error("Registration error:", error);
//       // Handle errors appropriately
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         type="text"
//         id="username"
//         placeholder="jsmith1234"
//         {...register("username")}
//       />
//       {errors.username?.message && (
//         <p className="text-sm italic text-red-500">
//           {errors.username?.message}
//         </p>
//       )}
//       <input
//         type="email"
//         id="email"
//         placeholder="jsmith1234@gmail.com"
//         {...register("email")}
//       />
//       {errors.email?.message && (
//         <p className="text-sm italic text-red-500">{errors.email?.message}</p>
//       )}
//       <input
//         type="text"
//         id="password"
//         placeholder="Enter password..."
//         {...register("password")}
//       />
//       <input
//         type="text"
//         id="confirmPassword"
//         placeholder="Re-enter your password..."
//         {...register("confirmPassword")}
//       />
//       {errors.confirmPassword?.message && (
//         <p className="text-sm italic text-red-500">
//           {errors.confirmPassword?.message}
//         </p>
//       )}
//       <button type="submit" disabled={registerUser.isLoading}>
//         {registerUser.isLoading ? "Registering..." : "Register"}
//       </button>
//     </form>
//   );
// };

// export default RegisterPage;
