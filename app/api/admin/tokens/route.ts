import { connectDB } from "@/lib/dbConnect";
import token from "@/lib/models/Token";
import { tokenValidationSchema } from "@/types/schemas";

// save api token
export const POST = async (req: Request) => {
  try {
    // connect to db
    await connectDB();
    // get data from request body
    const body = await req.json();
    console.log({ body });

    // validate data
    const validatedFields = tokenValidationSchema.safeParse(body);

    if (!validatedFields.success) {
      return Response.json({
        message: "Invalid data",
        status: 400,
        errors: validatedFields.error.flatten().fieldErrors,
      });
    }

    // save token to db
    const data = await new token(body).save();

    return Response.json({
      message: "Token saved successfully",
      status: 201,
      data,
    });
  } catch (error) {
    return Response.json({
      message: "Internal server error",
      status: 500,
      error: (error as Error).message,
    });
  }
};
