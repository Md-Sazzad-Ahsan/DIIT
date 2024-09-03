import NoticeList from "@/components/Notification/NoticeList";
import ResponsiveTable from "@/components/Schedule/ResponsiveTable";

export default function Home() {
  return (
    <main className="py-20 bg-gray-50 dark:bg-darkBg">
      <ResponsiveTable />
      <NoticeList />
    </main>
  );
};
