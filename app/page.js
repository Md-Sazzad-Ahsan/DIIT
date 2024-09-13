import { Suspense } from 'react';
import NoticeList from "@/components/Notification/NoticeList";
import ResponsiveTable from "@/components/Schedule/ResponsiveTable";
import Loading from '@/components/Loading'; // Adjust the import based on your file structure

export default function Home() {
  return (
    <main className="py-20 bg-gray-50 dark:bg-darkBg">
      <Suspense fallback={<Loading />}>
        <ResponsiveTable />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <NoticeList />
      </Suspense>
    </main>
  );
};
