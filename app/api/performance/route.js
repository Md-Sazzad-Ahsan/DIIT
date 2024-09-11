import dbConnect from '@/utils/db';
import Performance from '@/models/Students/Performance';

export async function POST(req) {
  await dbConnect();

  const { semester, studentsDetails } = await req.json();

  try {
    let performance = await Performance.findOne({ semester });
    if (performance) {
      // Update existing performance record
      performance.studentsDetails = studentsDetails;
      await performance.save();
    } else {
      // Create new performance record
      performance = new Performance({ semester, studentsDetails });
      await performance.save();
    }
    return new Response(JSON.stringify(performance), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
