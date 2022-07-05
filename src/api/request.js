import { replace } from '../routes/router.js';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${process.env.API_END_POINT}${url}`, {
      ...options,
      headers: {
        'x-username': process.env.X_USERNAME,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('API 호출 오류');

    return await res.json();
  } catch (e) {
    replace('/404');
  }
};
