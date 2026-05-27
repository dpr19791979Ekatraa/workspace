import { apiClient } from './client';

export async function getReimbursements() {
  const response =
    await apiClient.get(
      '/reimbursements/pending',
    );

  return response.data;
}

export async function createReimbursement(
  data: any,
) {
  const response =
    await apiClient.post(
      '/reimbursements',
      data,
    );

  return response.data;
}

export async function updateReimbursement(
  id: string,

  data: any,
) {
  const response =
    await apiClient.patch(
      `/reimbursements/${id}/review`,
      data,
    );

  return response.data;
}