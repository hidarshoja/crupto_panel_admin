// import { useEffect, useState } from "react";
// import { CSVLink } from "react-csv";
// import jalaali from "jalaali-js";

// const CvExcel = ({ listTransaction }) => {
//   const [data2, setData2] = useState([]);
// console.log(`data2`, data2);
//   useEffect(() => {
//     setData2(listTransaction || []);
//   }, [listTransaction]);

//   const csvData = data2.map((person) => {
//     if (!person?.created_at) return {}; 
    
    
//     const [datePart, timePart] = person.created_at.split("T"); 
//   const [year, month, day] = datePart.split("-").map(Number);
//   const [hour, minute] = timePart.split(":").map(Number);


//   let jalaliDate = { jy: "-", jm: "-", jd: "-" };
//   if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
//     jalaliDate = jalaali.toJalaali(year, month, day);
//   }
//     return {
//       تاریخ: `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`,
//     ساعت: `${hour}:${minute}`,
//       "نام مشتری": `${person.user?.name || ""} ${person.user?.lastname || ""}`,
//       "نوع کیف پول": "ریالی",
//       "نام کیف پول": person.asset?.name || "-",
//       "نوع تراکنش": person.type_label || "-",
//       مبلغ: person.amount ? Math.floor(person.amount) : "-",
//       "پس از کسر کارمزد": person.amount_after_fee ? Math.floor(person.amount_after_fee) : "-",
//       توضیحات: person.des || "-",
//       "کد رهگیری سامانه": person.txid || "-",
//       "کد رهگیری بانک": person.bank_txid || "-",
//       کارمزد: person.fee ? Math.floor(person.fee) : 0,
//       وضعیت: person.status_label || "-",
//     };
//   });

//   return (
//     <>
//       {data2?.length ? (
//         <CSVLink
//           data={csvData}
//           filename={"data.csv"}
//           className="bg-green-500 px-5 py-2 text-white rounded-lg text-sm cursor-pointer"
//         >
//           خروجی اکسل
//         </CSVLink>
//       ) : (
//         <p className="bg-green-500 px-5 py-2 text-white rounded-lg text-sm cursor-pointer">
//           در حال دریافت ...
//         </p>
//       )}
//     </>
//   );
// };

// export default CvExcel;


import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jalaali from "jalaali-js";

const CvExcel = ({ listTransaction }) => {
  const [data2, setData2] = useState([]);

  useEffect(() => {
    setData2(listTransaction || []);
  }, [listTransaction]);
console.log(`data2`, data2);
  const exportToExcel = () => {
    const csvData = data2.map((person) => {
      if (!person?.created_at) return {};
      
      const [datePart, timePart] = person.created_at.split("T"); 
      const [year, month, day] = datePart.split("-").map(Number);
      const [hour, minute] = timePart.split(":").map(Number);

      let jalaliDate = { jy: "-", jm: "-", jd: "-" };
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        jalaliDate = jalaali.toJalaali(year, month, day);
      }

      return {
        "تاریخ": `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`,
        "ساعت": `${hour}:${minute.toString().padStart(2, "0")}`,
        "نام مشتری": `${person.user?.name || ""} ${person.user?.lastname || ""}`,
        "نوع کیف پول": person.asset?.name_fa || "-",
        "نام کیف پول": person.asset?.name_fa || "-",
        "نوع تراکنش": person.type_label || "-",
        "مبلغ": person.amount ? Math.floor(person.amount) : "-",
        "پس از کسر کارمزد": person.amount_after_fee ? Math.floor(person.amount_after_fee) : "-",
        "توضیحات": person.des || "-",
        "شماره سند سیستمی": person.txid || "-",
        "شماره سند": person.bank_txid || "-",
        "کارمزد": person.amount ? Math.floor(person.amount) - Math.floor(person.amount_after_fee) : 0,
        "وضعیت": person.status_label || "-",
      };
    });

    const ws = XLSX.utils.json_to_sheet(csvData);
    const colWidths = csvData.length
      ? Object.keys(csvData[0]).map((key) => ({
          wch: Math.max(...csvData.map((row) => (row[key] ? row[key].toString().length : 10)), key.length),
        }))
      : [];

    ws["!cols"] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

    saveAs(data, "data.xlsx");
  };

  return (
    <>
      {data2?.length ? (
        <button
          onClick={exportToExcel}
          className="bg-green-500 px-5 py-2 text-white rounded-lg text-sm cursor-pointer"
        >
          خروجی اکسل (1000-)
        </button>
      ) : (
        <p className="bg-green-500 px-5 py-2 text-white rounded-lg text-sm cursor-pointer">
         فایل خالی است !
        </p>
      )}
    </>
  );
};

export default CvExcel;

