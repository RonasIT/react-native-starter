export const getUser = async (token: string): Promise<any> => {
  try {
    const res = await fetch(`https://774f-107-178-218-214.ngrok-free.app/v0.1/auth-with/clerk?session_token=${token}`, {
      method: 'post'
    });
    const json = await res.json();

    return json?.user;
  } catch (error) {
    console.log(error);
  }
};
