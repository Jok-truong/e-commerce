import { connectDB } from "@/lib/dbConnect";
import token from "@/lib/models/Token";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const template = searchParams.get("template");

    if (!template) {
      return NextResponse.json(
        {
          message: "template is empty",
        },
        {
          status: 401,
        }
      );
    }

    const data = await token.findOne(
      {
        $and: [
          {
            template: template,
          },
          {
            status: "draft",
          },
        ],
      },
      {
        token: 1,
      }
    );

    if (!data) {
      return NextResponse.json(
        {
          message: "template is not found",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}
