const generateOtp = (): string => {
  return (100000 + Math.floor(Math.random() * 900000)).toString();
};

export default generateOtp;
