import { proxy, useSnapshot } from 'valtio';

import { getSessionList } from '@/service/ai-chat';

export interface HistorySessionQueryParams {
  chat_type?: string;
  scene_id?: number;
  session_id?: number;
  page?: number;
  per_page?: number;
}

export const store = proxy({
  historySessions: [],
  queryArgs: {},
  loadAll: false,
});

export const actions = {
  async fetchHistorySessions() {
    getSessionList(store.queryArgs).then((res) => {
      if (res.errno === 0) {
        store.historySessions = res?.data?.data || [];
        if (res?.data?.data?.length === 0) {
          store.loadAll = true;
        }
      }
    });
  },

  setQueryArgs(args: HistorySessionQueryParams) {
    store.queryArgs = args;
  },

  netPage() {
    if (store.loadAll) {
      return;
    }
    store.queryArgs.page = store.queryArgs.page + 1;
    actions.fetchHistorySessions();
  },
};

export const useHistorySession = () => {
  const { historySessions } = useSnapshot(store);
  return {
    historySessions,
    actions,
  };
};
