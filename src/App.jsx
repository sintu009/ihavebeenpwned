
import { useState } from 'react'
import './App.css'
import ExcelSheet from './Excelsheet';


function App() {
  const [email, setEmail] = useState([])
  const [result, setResult] = useState([])

  const options = {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
    }
  };

  function handleClick(e) {
    e.preventDefault()
    const fetchData = async () => {
      const response = await fetch("http://localhost:3600/getdata", options);
      const data = await response.json()

      setResult(data);

    }

    fetchData()
  }
  return (


    <div className='app' >

      <div className='content' >
        <h1>I Have Been Pwned</h1>
        <input className="search-box" type="text" placeholder='   Enter Mail' value={email} onChange={(e) => {

          var emails = e.target.value.split(',');
          setEmail(emails.map(email => email.trim()));
        }} />

        <button className='btnnn' onClick={handleClick}>Submit</button>


        <div >
          {result?.map(res => {
            return <>

              <div>
                <div className="row">
                  <div className="col-sm-6 offset-3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Email</th>
                          <th scope="col">Data</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{res.email}</td>

                          {res.data.map(resData =>

                            <td>{resData.Name}</td>

                          )}
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

              </div>



            </>

          })}

        </div>
        <div>
          <ExcelSheet />
        </div>
      </div>
    </div>

  )
}

export default App
