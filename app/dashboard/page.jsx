"use client";

import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NoticeForm from '@/components/Notification/NoticeForm';
import NoticeList from '@/components/Notification/NoticeList';
import StudentManager from '@/components/StudentManager/StudentManager';

function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session) {
      // Redirect to login if not logged in
      router.push('/login');
    } else if (!session.user?.isAdmin) {
      // Redirect to home if not an admin
      router.push('/home');
    }
  }, [session, status, router]);

  // Show a loading state while status is 'loading', or session is not available
  if (status === 'loading' || !session || !session.user?.isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <StudentManager />
      <div className='py-20 px-5 sm:px-10 md:px-28 lg:px-56'>
        <NoticeForm />
      </div>
      <NoticeList />
    </main>
  );
}

export default Dashboard;
