export const dateFormatList: string = "DD/MM/YYYY";
export const dateFormat: string = "DD-MM-YYYY";

export const dateMonth: string = "MM-YYYY";

export function unFormatMoney(val: any) {
  // Hapus format titik
  return parseFloat(val.toString().replace(/\./g, ""));
}

export function formatDate(inputDate: string) {
  const parts: any = inputDate.split("-");
  const day: any = parts[2];
  const month: any = parts[1];
  const year: any = parts[0];

  return `${day}-${month}-${year}`;
}
export const calculateTotalQty = (transactions: any) => {
  return transactions?.reduce(
    (total: number, item: any) => total + item.QTY,
    0
  );
};
export const calculateChangeMoney = (
  netto: number,
  jumlahBayar: string,
  change: number
) => {
  let changeMoney;

  if (isNaN(change) || change === 0) {
    changeMoney = netto - parseInt(jumlahBayar);
  } else {
    const total = parseInt(jumlahBayar) + change;
    changeMoney = netto - total;
  }

  return changeMoney;
};
export const totalPrice = (transactions: any) => {
  let totalQty: number = 0;
  transactions?.forEach((item: any) => {
    totalQty += item.AMOUNT;
  });
  return totalQty;
};
export const calculateDiskonByCategory = (transactions: any) => {
  const totalDiskon = transactions?.reduce(
    (total: number, item: any) => total + item.DISC_VAL,
    0
  );
  return totalDiskon;
};
export const calculateTotalSetelahDiskon = (transactions: any) => {
  return transactions?.reduce(
    (total: number, item: any) => total + (item.AMOUNT - item.DISC_VAL),
    0
  );
};
export const handleCurrency = (price: number) => {
  const formattedCurrency = new Intl.NumberFormat("id-TD", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  const withoutTrailingZeros = formattedCurrency.replace(/(\.|,)00$/, "");

  return withoutTrailingZeros;
};
export const calculatePiutang = (
  data: any,
  title: string,
  limit: number,
  currentPage: number
) => {
  if (title === "Daftar Piutang") {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, data?.length);

    const totalPerHalaman = data
      ?.slice(startIndex, endIndex)
      .reduce((total: any, item: any) => total + item?.SALDO_AR, 0);

    if (data?.length <= limit) {
      return data.reduce((total: any, item: any) => total + item?.SALDO_AR, 0);
    } else {
      return totalPerHalaman;
    }
  } else if (title === "Daftar Transaksi PO") {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, data?.length);
    const totalPerHalaman = data
      ?.slice(startIndex, endIndex)
      .reduce((total: any, item: any) => total + item?.TTL_QTY, 0);
    if (data?.length <= limit) {
      return data.reduce((total: any, item: any) => total + item?.TTL_QTY, 0);
    } else {
      return totalPerHalaman;
    }
  } else if (title === "Daftar Total Penjualan Per Hari") {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, data?.length);
    let totalSunglass = 0;
    let totalFrame = 0;
    let totalLensa = 0;
    let totalAksesoris = 0;
    let totalTotal = 0;
    let totalDiskon = 0;
    let totalHutang = 0;
    let totalNetto = 0;
    if (data?.length <= limit) {
      data?.forEach((item: any) => {
        const sunglass =
          typeof item?.TOTAL_PRODUCT_1 === "number" ? item?.TOTAL_PRODUCT_1 : 0;
        const frame =
          typeof item?.TOTAL_PRODUCT_2 === "number" ? item?.TOTAL_PRODUCT_2 : 0;
        const lensa =
          typeof item?.TOTAL_PRODUCT_3 === "number" ? item?.TOTAL_PRODUCT_3 : 0;
        const aksesoris =
          typeof item?.TOTAL_PRODUCT_4 === "number" ? item?.TOTAL_PRODUCT_4 : 0;
        const total = typeof item?.AMOUNT === "number" ? item?.AMOUNT : 0;
        const diskon = typeof item?.DISC_VAL === "number" ? item?.DISC_VAL : 0;
        const hutang = typeof item?.SALDO_AR === "number" ? item?.SALDO_AR : 0;
        const netto = typeof item?.NETTO_VAL === "number" ? item?.NETTO_VAL : 0;

        totalSunglass += sunglass;
        totalFrame += frame;
        totalLensa += lensa;
        totalAksesoris += aksesoris;
        totalTotal += total;
        totalDiskon += diskon;
        totalHutang += hutang;
        totalNetto += netto;
      });
    } else {
      data?.slice(startIndex, endIndex).forEach((item: any) => {
        const sunglass =
          typeof item?.TOTAL_PRODUCT_1 === "number" ? item?.TOTAL_PRODUCT_1 : 0;
        const frame =
          typeof item?.TOTAL_PRODUCT_2 === "number" ? item?.TOTAL_PRODUCT_2 : 0;
        const lensa =
          typeof item?.TOTAL_PRODUCT_3 === "number" ? item?.TOTAL_PRODUCT_3 : 0;
        const aksesoris =
          typeof item?.TOTAL_PRODUCT_4 === "number" ? item?.TOTAL_PRODUCT_4 : 0;
        const total = typeof item?.AMOUNT === "number" ? item?.AMOUNT : 0;
        const diskon = typeof item?.DISC_VAL === "number" ? item?.DISC_VAL : 0;
        const hutang = typeof item?.SALDO_AR === "number" ? item?.SALDO_AR : 0;
        const netto = typeof item?.NETTO_VAL === "number" ? item?.NETTO_VAL : 0;

        totalSunglass += sunglass;
        totalFrame += frame;
        totalLensa += lensa;
        totalAksesoris += aksesoris;
        totalTotal += total;
        totalDiskon += diskon;
        totalHutang += hutang;
        totalNetto += netto;
      });
    }

    return {
      totalSunglass,
      totalFrame,
      totalLensa,
      totalAksesoris,
      totalTotal,
      totalDiskon,
      totalHutang,
      totalNetto,
    };
  } else if (title === "Daftar Total Penjualan Individu") {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, data?.length);
    let totalSunglass = 0;
    let totalFrame = 0;
    let totalLensa = 0;
    let totalAksesoris = 0;
    let totalTotal = 0;
    let totalDiskon = 0;
    let totalNetto = 0;
    if (data?.length <= limit) {
      data?.forEach((item: any) => {
        const sunglass =
          typeof item?.TOTAL_PRODUCT_1 === "number" ? item?.TOTAL_PRODUCT_1 : 0;
        const frame =
          typeof item?.TOTAL_PRODUCT_2 === "number" ? item?.TOTAL_PRODUCT_2 : 0;
        const lensa =
          typeof item?.TOTAL_PRODUCT_3 === "number" ? item?.TOTAL_PRODUCT_3 : 0;
        const aksesoris =
          typeof item?.TOTAL_PRODUCT_4 === "number" ? item?.TOTAL_PRODUCT_4 : 0;
        const total = typeof item?.AMOUNT === "number" ? item?.AMOUNT : 0;
        const diskon = typeof item?.DISC_VAL === "number" ? item?.DISC_VAL : 0;
        const netto =
          typeof item?.AMOUNT_NET === "number" ? item?.AMOUNT_NET : 0;

        totalSunglass += sunglass;
        totalFrame += frame;
        totalLensa += lensa;
        totalAksesoris += aksesoris;
        totalTotal += total;
        totalDiskon += diskon;
        totalNetto += netto;
      });
    } else {
      data?.slice(startIndex, endIndex).forEach((item: any) => {
        const sunglass =
          typeof item?.TOTAL_PRODUCT_1 === "number" ? item?.TOTAL_PRODUCT_1 : 0;
        const frame =
          typeof item?.TOTAL_PRODUCT_2 === "number" ? item?.TOTAL_PRODUCT_2 : 0;
        const lensa =
          typeof item?.TOTAL_PRODUCT_3 === "number" ? item?.TOTAL_PRODUCT_3 : 0;
        const aksesoris =
          typeof item?.TOTAL_PRODUCT_4 === "number" ? item?.TOTAL_PRODUCT_4 : 0;
        const total = typeof item?.AMOUNT === "number" ? item?.AMOUNT : 0;
        const diskon = typeof item?.DISC_VAL === "number" ? item?.DISC_VAL : 0;
        const netto = typeof item?.NETTO_VAL === "number" ? item?.NETTO_VAL : 0;

        totalSunglass += sunglass;
        totalFrame += frame;
        totalLensa += lensa;
        totalAksesoris += aksesoris;
        totalTotal += total;
        totalDiskon += diskon;
        totalNetto += netto;
      });
    }

    return {
      totalSunglass,
      totalFrame,
      totalLensa,
      totalAksesoris,
      totalTotal,
      totalDiskon,
      totalNetto,
    };
  } else if (title === "Daftar Total Penjualan Per Bulan") {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, data?.length);
    let totalQty = 0;
    let totalSunglass = 0;
    let totalFrame = 0;
    let totalLensa = 0;
    let totalAksesoris = 0;
    let totalTotal = 0;
    let totalDiskon = 0;
    let totalNetto = 0;

    if (data?.length <= limit) {
      data?.forEach((item: any) => {
        const totalqty = typeof item?.TTL_QTY === "number" ? item?.TTL_QTY : 0;
        const sunglass =
          typeof item?.TOTAL_PRODUCT_1 === "number" ? item?.TOTAL_PRODUCT_1 : 0;
        const frame =
          typeof item?.TOTAL_PRODUCT_2 === "number" ? item?.TOTAL_PRODUCT_2 : 0;
        const lensa =
          typeof item?.TOTAL_PRODUCT_3 === "number" ? item?.TOTAL_PRODUCT_3 : 0;
        const aksesoris =
          typeof item?.TOTAL_PRODUCT_4 === "number" ? item?.TOTAL_PRODUCT_4 : 0;
        const total = typeof item?.AMOUNT === "number" ? item?.AMOUNT : 0;
        const diskon = typeof item?.DISC_VAL === "number" ? item?.DISC_VAL : 0;
        const netto =
          typeof item?.AMOUNT_NET === "number" ? item?.AMOUNT_NET : 0;
        totalQty += totalqty;
        totalSunglass += sunglass;
        totalFrame += frame;
        totalLensa += lensa;
        totalAksesoris += aksesoris;
        totalTotal += total;
        totalDiskon += diskon;
        totalNetto += netto;
      });
    } else {
      data?.slice(startIndex, endIndex).forEach((item: any) => {
        const totalqty = typeof item?.TTL_QTY === "number" ? item?.TTL_QTY : 0;
        const sunglass =
          typeof item?.TOTAL_PRODUCT_1 === "number" ? item?.TOTAL_PRODUCT_1 : 0;
        const frame =
          typeof item?.TOTAL_PRODUCT_2 === "number" ? item?.TOTAL_PRODUCT_2 : 0;
        const lensa =
          typeof item?.TOTAL_PRODUCT_3 === "number" ? item?.TOTAL_PRODUCT_3 : 0;
        const aksesoris =
          typeof item?.TOTAL_PRODUCT_4 === "number" ? item?.TOTAL_PRODUCT_4 : 0;
        const total = typeof item?.AMOUNT === "number" ? item?.AMOUNT : 0;
        const diskon = typeof item?.DISC_VAL === "number" ? item?.DISC_VAL : 0;
        const netto = typeof item?.NETTO_VAL === "number" ? item?.NETTO_VAL : 0;

        totalQty += totalqty;
        totalSunglass += sunglass;
        totalFrame += frame;
        totalLensa += lensa;
        totalAksesoris += aksesoris;
        totalTotal += total;
        totalDiskon += diskon;
        totalNetto += netto;
      });
    }
    return {
      totalQty,
      totalSunglass,
      totalFrame,
      totalLensa,
      totalAksesoris,
      totalTotal,
      totalDiskon,
      totalNetto,
    };
  } else {
    return 0;
  }
};
