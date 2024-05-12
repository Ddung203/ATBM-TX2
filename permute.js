const permute = (k, arr, n) => {
  let permutation = "";
  for (let i = 0; i < n; i++) {
    permutation += k[arr[i] - 1];
  }
  console.log("k :>> ", k);
  console.log("permutation :>> ", permutation);
  return permutation;
};

console.log("permute :>> ", permute);
