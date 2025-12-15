import { connectDB } from "@/lib/dbConnect";
import Brand from "@/lib/models/Brand";
import { brandValidationSchema } from "@/types/schemas";
import { isValidObjectId } from "mongoose";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");

    if (_id) {
      const data = await Brand.findById(_id).lean();
      return Response.json({ data }, { status: 200 });
    }
    const data = await Brand.find().sort({ createdAt: -1 }).lean();
    return Response.json({ data }, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}

// create brand
export const POST = async (request: Request) => {
  try {
    await connectDB();

    const body = await request.json();

    const validatedFields = brandValidationSchema.safeParse(body);

    if (!validatedFields.success) {
      return Response.json(
        {
          message: "validation error",
          errors: validatedFields.error.flatten().fieldErrors,
        },
        {
          status: 200,
        }
      );
    }

    // save data
    const data = await new Brand(body).save();

    return Response.json(
      {
        message: "New brand added",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
};

// update brand
export const PUT = async (request: Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const _id = searchParams.get("_id");

    if (!_id || !isValidObjectId(_id)) {
      return Response.json(
        {
          message: "Invalid brand id",
        },
        {
          status: 200,
        }
      );
    }

    const body = await request.json();

    const validatedFields = brandValidationSchema.safeParse(body);

    if (!validatedFields.success) {
      return Response.json(
        {
          message: "validation error",
          errors: validatedFields.error.flatten().fieldErrors,
        },
        {
          status: 200,
        }
      );
    }

    // update data
    const data = await Brand.findByIdAndUpdate(_id, body, {
      new: true,
    });

    return Response.json(
      {
        message: "Brand updated",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
};

// delete brand
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");

    if (!_id || !isValidObjectId(_id)) {
      return Response.json(
        {
          message: "id is not valid",
        },
        {
          status: 404,
        }
      );
    }

    //update status
    await Brand.findByIdAndUpdate(_id, {
      status: "archive",
    });

    return Response.json(
      {
        message: "Brand deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}
