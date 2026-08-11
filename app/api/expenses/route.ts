import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    // Get data from the request
    const body = await request.json();

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("splitbill");

    // Save the expense
    const result = await db.collection("expenses").insertOne({
      title: body.title,
      amount: body.amount,
      category: body.category,
      paidBy: body.paidBy,
      splitBetween: body.splitBetween,
      groupId: new ObjectId(body.groupId),
      createdAt: new Date(),
    });

    // Return the created expense ID
    return Response.json(
      {
        message: "Expense created!",
        expenseId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    // Return error response
    return Response.json(
      { message: "Failed to create expense" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db("splitbill");

    // Get all expenses
    const expenses = await db.collection("expenses").find({}).toArray();

    // Return expenses
    return Response.json(expenses);
  } catch (error) {
    console.error(error);

    // Return error response
    return Response.json(
      { message: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}