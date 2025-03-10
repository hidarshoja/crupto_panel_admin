const convertPersianToEnglishNumbers = (str) => {
 const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
 const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

 let result = str;
 persianNumbers.forEach((persian, index) => {
   result = result.replace(new RegExp(persian, 'g'), englishNumbers[index]);
 });

 return result;
};

export default convertPersianToEnglishNumbers;