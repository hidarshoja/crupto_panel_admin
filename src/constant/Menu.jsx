

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
      { name: 'نگاه آماری', href: '#' },
      { name: 'وضعیت پایداری', href: '#' },
      { name: 'سطوح دسترسی', href: '/accessLevels' },
    ],
  },
  {
    name: 'کاربران',
    icon: CurrencyYenIcon,
    
    children: [
      { name: 'کاربر1', href: '#' },
      { name: 'کاربر2', href: '#' },
      { name: 'کاربر3', href: '#' },
      { name: 'کاربر4', href: '#' },
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
  },  {
    name: 'حسابداری',
    icon: CurrencyYenIcon,
    
    children: [
      { name: '1حسابداری', href: '#' },
      { name: 'حسابداری2', href: '#' },
      { name: 'حسابداری3', href: '#' },
      { name: 'حسابداری4', href: '#' },
    ],
  },
  {
    name: 'سند مالی ',
    icon: CurrencyYenIcon,
    
    children: [
      { name: 'مالی1', href: '#' },
      { name: 'مالی2', href: '#' },
      { name: 'مالی3', href: '#' },
      { name: 'مالی4', href: '#' },
    ],
  },
  {
    name: 'حساب ها',
    icon: CurrencyYenIcon,
    
    children: [
      { name: 'حساب1', href: '#' },
      { name: 'حساب2', href: '#' },
      { name: 'حساب3', href: '#' },
      { name: 'حساب4', href: '#' },
    ],
  },
  {
    name: 'وضعیت ارزها',
    icon: CurrencyYenIcon,
    
    children: [
      { name: 'ارز1', href: '#' },
      { name: 'ارز2', href: '#' },
      { name: 'ارز3', href: '#' },
      { name: 'ارز4', href: '#' },
    ],
  },
  {
    name: 'وضعیت معاملات',
    icon: CurrencyYenIcon,
    
    children: [
      { name: 'معاملات1', href: '#' },
      { name: 'معاملات2', href: '#' },
      { name: 'معاملات3', href: '#' },
      { name: 'معاملات4', href: '#' },
    ],
  },
  {
    name: 'وضعیت پایداری',
    icon: CurrencyYenIcon,
    
    children: [
      { name: 'پایداری1', href: '#' },
      { name: 'پایداری2', href: '#' },
      { name: 'پایداری3', href: '#' },
      { name: 'پایداری4', href: '#' },
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