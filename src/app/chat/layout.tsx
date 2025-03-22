import { headers } from 'next/headers';
import { ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  // Properly await the headers call
  const headersList = await headers();
  
  // You can use headersList here if needed, for example:
  // const userAgent = headersList.get('user-agent');
  // const referer = headersList.get('referer');
  
  return (
    <section className="home-layout">
      {/* Any layout specific components can go here */}
      <div className="home-content">
        {children}
      </div>
    </section>
  );
}

