import { useUpdate } from 'ahooks';
import { useEffect } from 'react';

import { initDBImagesCacheStore } from '@/dataSource/db';

export function useAsyncAssetsCache(run?: boolean) {
  const update = useUpdate();

  useEffect(() => {
    if (run) {
      initDBImagesCacheStore().then(() => {
        run && update();
      });
    }
  }, [run]);
}
