
import NewsEdit from './NewsEdit';
import { Suspense } from 'react';
import Loader from '@/components/shared/Loader';


export default function NEWS() {
  return (
    <Suspense fallback={<Loader />}>
      <NewsEdit /> 
    </Suspense>
  );
}

