import LoadingTable from "../LoadingTable";


export default function TableAccount({paymentsList , isloading}) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 mt-4">لیست حساب‌ها و شناسه‌ها</h3>
      <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                حساب مبدا
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                نام صاحب حساب
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                نام صاحب حساب مقصد
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                حساب مقصد
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                نام درگاه
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                شناسه
              </th>
            </tr>
          </thead>
          {isloading ? (
    <tbody>
      <tr>
        <td></td>
        <td></td>
          <LoadingTable />
        
      </tr>
    </tbody>
  ) : (
    <tbody className="bg-white divide-y divide-gray-200">
    {paymentsList?.length > 0 ? (
      paymentsList?.map((account, index) => (
        <tr key={index}>
          <td className="px-6 py-4 text-center text-sm text-gray-900">{account.userIban}</td>
          <td className="px-6 py-4 text-center text-sm text-gray-900">{account.userFullName}</td>
          <td className="px-6 py-4 text-center text-sm text-gray-900">{account.destinationOwnerName}</td>
          <td className="px-6 py-4 text-center text-sm text-gray-900">{account.destinationDepositNumber}</td>
          <td className="px-6 py-4 text-center text-sm text-gray-900">{account.merchantName}</td>
          <td className="px-6 py-4 text-center text-sm text-gray-900">{account.payId}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
          حسابی یافت نشد
        </td>
      </tr>
    )}
  </tbody>
  )}
     
        </table>
      </div>
    </div>
  );
}
