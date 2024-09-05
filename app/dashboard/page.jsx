"use client";
import { useSession, signIn } from 'next-auth/react';
import NoticeForm from '@/components/Notification/NoticeForm';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NoticeList from '@/components/Notification/NoticeList';

function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      // Redirect them to the sign-in page if not logged in
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    // Optionally, show a loading state or a placeholder
    return <div>Loading...</div>;
  }

  return (
    <main >
     <div className='py-20 px-5 sm:px-10 md:px-28 lg:px-56'>
     <NoticeForm />
     </div>
      <NoticeList />
    </main>
  );
}

export default Dashboard;
