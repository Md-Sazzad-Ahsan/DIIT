import BatchList from '@/components/BatchManagement/BatchList';
import BatchForm from '@/components/BatchManagement/BatchForm';

export default function Batches() {
  return (
    <div className='mt-20'>
      <h1>Batch Management</h1>
      <BatchList />
      <BatchForm />
    </div>
  );
}
