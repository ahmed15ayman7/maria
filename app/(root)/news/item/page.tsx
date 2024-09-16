
import NewsDetail from './NewsDetail';
import { Suspense } from 'react';
import Loader from '@/components/shared/Loader';


export default function NEWS() {
  return (
    <Suspense fallback={<Loader />}>
      <NewsDetail /> 
    </Suspense>
  );
}

