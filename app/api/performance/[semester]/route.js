import dbConnect from '@/utils/db';
import Performance from '@/models/Students/Performance';

export async function GET({ params }) {
  await dbConnect();
  const { semester } = params;

  try {
    const performance = await Performance.findOne({ semester });
    if (!performance) {
      return new Response(JSON.stringify({ error: 'Performance data not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(performance), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
