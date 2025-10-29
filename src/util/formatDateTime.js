const formatDateTime = (timestamp, isTime=0) => {
  const date = new Date(timestamp * 1000);
  if(isTime == 2)
  {
    return date.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  else if(isTime == 1)
  {
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  else
  {
    return date.toISOString().split('T')[0];
  }
};

export default formatDateTime;