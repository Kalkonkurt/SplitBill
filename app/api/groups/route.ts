import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    // Get data from the request
    const body = await request.json();

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("splitbill");

    // Save the group
    const result = await db.collection("groups").insertOne({
      name: body.name,
      members: body.members,
      createdBy: body.createdBy,
      createdAt: new Date(),
    });

    // Return the created group ID
    return Response.json(
      {
        message: "Group created!",
        groupId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    // Return error response
    return Response.json(
      { message: "Failed to create group" },
      { status: 500 }
    );
  }
}

export async function GET() {
    try {
      // Connect to the database
      const client = await clientPromise;
      const db = client.db("splitbill");
  
      // Get all groups
      const groups = await db.collection("groups").find({}).toArray();
  
      // Return groups
      return Response.json(groups);
    } catch (error) {
      console.error(error);
  
      // Return error response
      return Response.json(
        { message: "Failed to fetch groups" },
        { status: 500 }
      );
    }
  }