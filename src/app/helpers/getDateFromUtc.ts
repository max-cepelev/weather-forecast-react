const getDateFromUtc = (date: number) => {
  return new Date(date * 1000);
};

export default getDateFromUtc;
