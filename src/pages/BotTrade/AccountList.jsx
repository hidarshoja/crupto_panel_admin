
import { useEffect , useState } from "react";
import TableAccount from "../../components/Bot/TableAccount";
import axiosClient2 from "../../axios-client";



export default function AccountList() {

  const [paymentsList, setPaymentsList] = useState([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient2.get("/jibit/payments-id");
        setPaymentsList(response.data.data);
        console.log(`response.data.data`, response.data.data);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
     <TableAccount paymentsList={paymentsList} isloading={isloading} />
    </div>
  )
}
