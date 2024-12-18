

import {
  CurrencyYenIcon,

} from '@heroicons/react/24/outline'
export const navigation = [
  { name: "صفحه اصلی", href: "/", current: false, },
  {
    name: 'API مشتریان ',
    icon: CurrencyYenIcon,
    
    children: [
      { name: 'تعریف مشتری', href: '/customer_definition' },
      { name: 'حسابداری', href: '/accounting' },
      { name: 'سند', href: '/document' },
      { name: 'نگاه آماری', href: '/statistical' },
      { name: 'وضعیت پایداری', href: '/status' },
      { name: 'سطوح دسترسی', href: '/accessLevels' },
    ],
  },
  {
    name: 'کاربران',
    icon: CurrencyYenIcon,
    
    children: [
      { name: 'KYC', href: '/user/kyc' },
      { name: 'تعریف کاربر', href: '/user/definition' },
      { name: 'سطوح دسترسی', href: '/user/accesslevels' },
      { name: 'حسابداری', href: '/user/Accounting' },
      { name: 'سند کاربر', href: '/user/document' },
      { name: 'نگاه آماری کاربر', href: '/user/statistical' },
    ],
  },
  {
    name: 'بات ترید',
    icon: CurrencyYenIcon,
    
    children: [
      { name: 'ترید1', href: '#' },
      { name: 'ترید2', href: '#' },
      { name: 'ترید3', href: '#' },
      { name: ' ترید4', href: '#' },
    ],
  }, 
  
  

  // { name: "شرط ها", href: "/", current: false, src: <TbAirConditioning /> },
  // { name: "حجم ها", href: "/volume", current: false, src: <MdOutlineContentPaste /> },
  // { name: "داده ها", href: "/data", current: false, src: <FaDatabase /> },
  // { name: "نمودار ها", href: "/chart", current: false, src: <FaChartLine /> },
  // { name: "ساخت باکس جدید", href: "/new-box", current: false, src: <FaBox /> },
  // { name: "آدرس", href: "/address", current: false, src: <FaMapMarkerAlt /> },
  // { name: "ایجاد", href: "/create", current: false, src: <FaPlus /> },
  // { name: "رمز عبور", href: "/password", current: false, src: <FaKey /> },
];