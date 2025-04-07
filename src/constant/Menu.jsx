

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
      { name: 'سطوح دسترسی', href: '/accessLevels' },
      { name: 'حسابداری', href: '/accounting' },
      { name: 'سند', href: '/document' },
      { name: 'نگاه آماری', href: '/statistical' },
      { name: 'وضعیت پایداری', href: '/status' },
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
      { name: 'ایجاد استراتژی', href: '/bot/strategy' },
      { name: 'لیست استراتژی', href: '/bot/strategy-list' },
      // { name: 'صرافی ها', href: '/bot/exchange' },
      { name: 'معامله دستی', href: '/bot/transaction' },
      { name :"حسابداری" , href :"/bot/accounting"},
      { name :"سند بات" , href :"/bot/document"},
      { name :"وضعیت معاملات" , href :"/bot/transactionStatus"},
      { name :"وضعیت پایداری" , href :"/bot/stableCondition"},
      { name :"نوتیفیکیشن" , href :"/bot/notification"},
      { name :"نگاه آماری" , href :"/bot/statisticalViewBot"},
      { name :"مانده صرافی" , href :"/bot/remaining"},
      { name :"درگاه" , href :"/bot/port"},
      { name :"لیست حساب‌ها و شناسه‌ها" , href :"/bot/account-list"}
    ],
  }, 
  { name: "دریافت اکسل ها", href: "/excelPage", current: false, },
  // { name: "لیبل ها", href: "/libel", current: false, },
];


