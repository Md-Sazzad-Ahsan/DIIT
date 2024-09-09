import AddNewStudent from '@/components/StudentManager/AddNewStudent'
import UpdateStudent from '@/components/StudentManager/UpdateStudent'

export default function StudentManager() {
  return (
    <main className='py-20 px-5 sm:px-10 md:px-28 lg:px-56'>
         <AddNewStudent />
         <UpdateStudent />
    </main>
  );
};
