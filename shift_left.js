const shift_left = (k, number) => {
  let s = "";
  for (let i = 0; i < number; i++) {
    for (let j = 1; j < k.length; j++) {
      s += k[j];
    }
    s += k[0];
    k = s;
    s = "";
  }
  return k;
};

// console.log('shift_left("1011") :>> ', shift_left("1011", 2));

export default shift_left;
