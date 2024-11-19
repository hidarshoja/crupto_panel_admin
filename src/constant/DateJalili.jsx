import jalaali from 'jalaali-js';

export const toPersianDate = () => { 
    const currentDate = new Date();

    // Extract year, month, and day from the current date
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // JavaScript months are 0-based
    const day = currentDate.getDate();
    
    // Convert to Jalali date
    const jalaliDate = jalaali.toJalaali(year, month, day);

    return  `${jalaliDate.jy}/${padWithZero(jalaliDate.jm)}/${padWithZero(jalaliDate.jd)}`
 }

 function padWithZero(number) {
    return number < 10 ? '0' + number : number;
}

export function convertPersianToEnglish(persianNumber) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return persianNumber.replace(/[۰-۹]/g, (w) => englishDigits[persianDigits.indexOf(w)]);
  }