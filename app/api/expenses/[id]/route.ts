import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Update an expense
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("splitbill");

    // Update the expense
    const result = await db.collection("expenses").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: body.title,
          amount: body.amount,
          category: body.category,
          paidBy: body.paidBy,
          splitBetween: body.splitBetween,
        },
      }
    );

    return Response.json({
      message: "Expense updated!",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to update expense" },
      { status: 500 }
    );
  }
}

// Delete an expense
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("splitbill");

    // Delete the expense
    const result = await db.collection("expenses").deleteOne({
      _id: new ObjectId(id),
    });

    return Response.json({
      message: "Expense deleted!",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to delete expense" },
      { status: 500 }
    );
  }
}