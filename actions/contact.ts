"use server";

import { contactFormSchema, ContactFormValues } from "@/lib/schemas";

export type ActionState = {
    success?: boolean;
    errors?: { [key: string]: string[] };
    message?: string;
};

export async function sendContactMessage(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    };

    const validatedFields = contactFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please fix the errors below.",
        };
    }

    // Simulate email sending or DB insertion
    // In a real app, use Resend, Nodemailer, etc.
    console.log("Server Action Received:", validatedFields.data);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

    return {
        success: true,
        message: "Message sent successfully!",
    };
}
