// app/news/page.tsx (Server Component)
import { Suspense } from 'react';
import News from './NewsClient'; // Import the client-side News component
import Loader from '@/components/shared/Loader';


export default function NEWS() {
  return (
    <Suspense fallback={<Loader />}>
      <News /> {/* Render the client-side component */}
    </Suspense>
  );
}
