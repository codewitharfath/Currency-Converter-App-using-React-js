import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';

import './App.css'

function App() {
  const [amount,setamout] = useState(1)
  const [fromCurrency,setfromCurrency] = useState("USD")
  const [ToCurrency,setToCurrency] = useState("INR")
  const [converted,setconverted] = useState(null)
  const [exchangedata,setexchangedata] = useState(null)

  useEffect(()=>{
    const generatedFetch = async ()=>{
      try{
        const url = `https://v6.exchangerate-api.com/v6/8f0ae9357f659a7f361b0e29/latest/${fromCurrency}`

        const response = await axios.get(url)
        console.log(response)
        setexchangedata(response.data.conversion_rates[ToCurrency])

      }
      catch(error){
        console.log("some thing went wrong",error)

      }
    }
    generatedFetch()

  },[fromCurrency,ToCurrency])
  function handleamount(e){
    const value = parseFloat(e.target.value)
    setamout(isNaN(value)? 0 :value)
  }
 const handlefromCurrency = (e)=>{
  setfromCurrency(e.target.value)

 }
 const handleToCurrency = (e)=>{
setToCurrency(e)
 }
useEffect(()=>{
  if(exchangedata !== null){
    setconverted((amount*exchangedata).toFixed(2))
  }

},[amount,exchangedata])
  return (
    <>
    <div className="container">
      <div className="box"></div>
      <div className="data">
        <h1>Currency Converter App</h1>
        <div className="input-container">
          <label htmlFor="amt">amount</label>
          <input type="number" onChange={handleamount} value={amount}  id='amt' />
        </div>
        <div className="input-container">
          <label htmlFor="fromCurrency">FromCurrency</label>
          <select onChange={handlefromCurrency} id="fromCurrency"  value={fromCurrency}>
            <option value="USD">USD- United States Dollar</option>
            <option value="INR">INR- Indian Rupee</option>
            <option value="EUR">EUR- Euro</option>
            <option value="AUD">AUD- Australian Dollar</option>
            <option value="JPY">JPY- Japanese Yen</option>
            <option value="NZD">NZD- New Zealand Dollar</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="ToCurrency">ToCurrency</label>
          <select onChange={handleToCurrency} id="ToCurrency" value={ToCurrency}>
            <option value="USD">USD- United States Dollar</option>
            <option value="INR">INR- India Rupee</option>
            <option value="EUR">EUR- Euro</option>
            <option value="AUD">AUD- Australian Dollar</option>
            <option value="JPY">JPY- Japanese Yen</option>
            <option value="NZD">NZD- New Zealand Dollar</option>
          </select>
        </div>
        <div className="result">
          <p>{amount} {fromCurrency} to equal {converted} {ToCurrency} </p>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default App
