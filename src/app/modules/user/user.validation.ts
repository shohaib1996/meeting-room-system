import { z } from "zod";

// Define the Zod schema for TUser
export const createUserSchemaValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name is required")
      .trim(),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),

    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),

    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .regex(/^[0-9]{10,15}$/, "Invalid phone number"),

    address: z
      .string({
        required_error: "Address is required",
      })
      .min(1, "Address is required")
      .trim(),

    role: z.enum(["user", "admin"], {
      invalid_type_error: 'Role must be either "user" or "admin"',
    }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),

    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
  }),
});

export const UserValidation = {
  createUserSchemaValidation,
  loginValidationSchema,
};
