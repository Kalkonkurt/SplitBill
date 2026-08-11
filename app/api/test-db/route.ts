import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    await client.db("admin").command({ ping: 1 });

    return Response.json({
      message: "MongoDB connected! 🎉",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "MongoDB connection failed" },
      { status: 500 }
    );
  }
}