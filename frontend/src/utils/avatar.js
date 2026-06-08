export const getAvatarSrc = (user, size = 35) => {
  const url = user?.avatar?.url;
  if (url && !url.includes("placeholder")) {
    return url;
  }
  const name = user?.name || "User";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=3321c8&color=fff&size=${size}&bold=true`;
};
