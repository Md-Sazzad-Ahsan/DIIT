export async function getBatchData(batchName) {
    try {
      const response = await fetch(`/api/courses/${batchName}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch batch data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching batch data:', error);
      throw error; // Re-throw error to be handled by the caller
    }
  }