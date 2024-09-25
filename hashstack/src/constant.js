export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formattedDate = (dateStr) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateStr).toLocaleDateString('en-GB', options);
  const [day, month, year] = date.split(' ');
  return `${day} ${month}, ${year}`;
};
