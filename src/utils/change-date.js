import { DateObject } from "react-multi-date-picker";
import gregorian from 'react-date-object/calendars/gregorian';


export const changeDate = (dateString) => {
    let parts = dateString.split(" ");

    let datePart = parts[0];
    let timePart = parts[1];

    return { datePart, timePart };
};


export const formatDate = (dateFrom, dateTo) => {

    let formattedDateFrom = dateFrom;
    let formattedDateTo = dateTo;
  
    if (dateFrom instanceof DateObject) {
      formattedDateFrom = persianToEnglishNumber(dateFrom.convert(gregorian).format('YYYY-MM-DD'));
    }
    if (dateTo instanceof DateObject) {
      formattedDateTo = persianToEnglishNumber(dateTo.convert(gregorian).format('YYYY-MM-DD'));
    }
  
    return { formattedDateFrom, formattedDateTo }
  };


  
  const persianToEnglishNumber = (persianNumber) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return persianNumber.replace(/[۰-۹]/g, (d) => englishDigits[persianDigits.indexOf(d)]);
  };
