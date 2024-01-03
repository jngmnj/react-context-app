import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../context/OrderContext'
import axios from 'axios';

const CompletePage = ({ setStep }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderData] = useContext(OrderContext);

  useEffect(() => {
    orderComplete(orderData)
  }, [orderData]);

  const orderComplete = async (orderData) => {
    try {
      const response = await axios.post('http://localhost:4000/order',orderData)
      setOrderHistory(response.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  
  if(loading) {
    return <div> loading... </div>
  } else {
    return (
      <div style={{ textAlign: 'center'}}>
        <h1>주문이 완료되었습니다.</h1>
        <h3>주문내역</h3>
        <table style={{ margin: 'auto', border: '1px solid black'}}>
          <tr>
            <th>주문번호</th>
            <th>주문가격</th>
          </tr>
          {orderHistory.map((item) => (
            <tr key={item.orderNumber}>
              <td>{item.orderNumber}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </table>
        <br />
        <button onClick={() => setStep(0)}>첫 페이지로</button>
      </div>
    )
  }
}

export default CompletePage