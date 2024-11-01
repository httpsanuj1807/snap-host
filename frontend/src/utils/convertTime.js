export function timeSinceLastPush(pushedAt) {
  const pushedDate = new Date(pushedAt);
  const currentDate = new Date();

  const diffInMs = currentDate - pushedDate;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays}d ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m ago`;
  } else {
    return `${diffInSeconds}s ago`;
  }
}
 