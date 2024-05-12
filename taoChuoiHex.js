const taoChuoiHex = (length, characters = "0123456789ABCDEF") => {
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// const K = taoChuoiHex(16);
// console.log(K);

export default taoChuoiHex;
