export const getProfile = async (token: string): Promise<any> => {
  try {
    const res = await fetch(`API_URL/profile`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const json = await res.json();

    return json;
  } catch (error) {
    console.log(error);
  }
};
