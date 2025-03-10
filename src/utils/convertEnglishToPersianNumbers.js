const convertEnglishToPersianNumbers = (str) => {
 const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
 const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

 let result = str;
 englishNumbers.forEach((english, index) => {
   result = result.replace(new RegExp(english, 'g'), persianNumbers[index]);
 });

 return result;
};

export default convertEnglishToPersianNumbers;
