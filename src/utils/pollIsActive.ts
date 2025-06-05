// Function to check if a poll is active based on its expiration date
export const pollIsActive = (expires: string) => {
  if (!expires) return false;
  const now = new Date();
  return new Date(expires) > now;
}