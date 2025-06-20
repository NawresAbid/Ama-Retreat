import { Suspense } from 'react';
import ClientConfirm from '@/components/ClientConfirm';

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ClientConfirm />
    </Suspense>
  );
}
