const options = { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'long', day: 'numeric' };

const formatDate = date => {
  return new Date(date).toLocaleDateString('en-US', options);
};

export default formatDate;
