import { apiClient } from './client';

export async function getAnalytics() {
  const response =
    await apiClient.get(
      '/dashboard/employee',
    );

  const data = response.data;

  return {
    totalTasks:
      data?.metrics?.totalTasks ?? 0,
    completedTasks:
      data?.metrics?.completedTasks ?? 0,
    totalMeetings: 0,
    pendingReimbursements: 0,
    productivity:
      (data?.taskStatusBreakdown || []).map(
        (item: any) => ({
          name: item.status,
          tasks:
            item._count?._all ??
            item._count ??
            0,
        }),
      ),
  };
}