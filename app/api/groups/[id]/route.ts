import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Get one group by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("splitbill");

    // Find the group
    const group = await db.collection("groups").findOne({
      _id: new ObjectId(id),
    });

    if (!group) {
      return Response.json(
        { message: "Group not found" },
        { status: 404 }
      );
    }

    return Response.json(group);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to fetch group" },
      { status: 500 }
    );
  }
}