import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useFormGuard = (isDirty: boolean) => {
  const router = useRouter();
  const message = '編集内容がリセットされてしまいます。ページ遷移を行いますか?';

  const beforeUnLoadHandler = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = message;
  };

  useEffect(() => {
    const pageChangeHandler = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (!shallow) {
        const answer = window.confirm(message);
        if (!answer) {
          router.events.emit('routeChangeError', 'キャンセルしました', url, {
            shallow,
          });
          throw 'キャンセルしました。';
        }
      }
    };

    if (isDirty) {
      router.events.on('routeChangeStart', pageChangeHandler);
      window.addEventListener('beforeunload', beforeUnLoadHandler);

      return () => {
        router.events.off('routeChangeStart', pageChangeHandler);
        window.removeEventListener('beforeunload', beforeUnLoadHandler);
      };
    }
  }, [isDirty, router]);
};
