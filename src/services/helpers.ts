export const getUserData = (data: any) => {
  return {
    userId: data.userId,
    username: data.username,
    preferedMapStyle: data.preferedMapStyle,
    userIconSrc: data.userIconSrc,
  };
};
