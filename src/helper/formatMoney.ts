function formatMoney(n?: number) {
  if (n || n === 0) {
    const sign = n < 0 ? "-" : "";
    const absoluteValue = Math.abs(n);

    return (
      sign +
      absoluteValue.toFixed(0).replace(/./g, (c, i, a) => {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
      })
    );
  }
  return "-";
}

export default formatMoney;
