import { connectDB } from "@/lib/dbConnect";

export async function GET() {
  await connectDB();
  return Response.json({
    message: "Database connection test successful",
    status: 200,
  });
}
