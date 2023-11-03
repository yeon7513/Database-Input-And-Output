import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FamousMountains() {
  const [data, setData] = useState({
    region : '',
    mt_name : '',
    AMSL : ''
  });
  const [result, setResult] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showText, setText] = useState(false);
  const handleChange = (e) => {
    setData({
      ...data, [e.target.name] : e.target.value
    });
  };
  const sendData = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3300/famous_mountains', data);
      console.log('data sent to server')
      setText(true);
      setData({
        region: '',
        mt_name: '',
        AMSL: ''
      });
      setTimeout(() => {
        setText(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios.get('http://localhost:3300')
    .then(res => {
      console.log('data load to server');
    })
    .catch(err => {
      console.log(err);
    })
  }, []);
  const loadData = async () => {
    const response = await axios.get('http://localhost:3300/resultFamousMountains');
    setResult(response.data.data);
    setShowTable(true);
    console.log(response.data);
  };

  const hideData = () => {
    setResult([]);
    setShowTable(false);
    console.clear();
  };
  return(
    // 100대 명산
    <section>
      <form id="famous-mountains">
        <div className="title">
          <p>100대 명산</p>
        </div>
        <label htmlFor="region">
          <span>지역</span>
          <input type="text" name="region" value={data.region} id="region" onChange={handleChange} />
        </label>
        <label htmlFor="mt_name">
          <span>산 이름</span>
          <input type="text" name="mt_name" value={data.mt_name} id="mt_name" onChange={handleChange} />
        </label>
        <label htmlFor="AMSL">
          <span>해발</span>
          <input type="number" step="0.1" min="0" max="9999" name="AMSL" value={data.AMSL} id="AMSL" onChange={handleChange} />
        </label>
        {showText && (
          <p className='success'>데이터 입력 성공!</p>
        )}
        <input type="submit" value="등록하기" onClick={sendData} />
        <input type="reset" value="다시 입력하기" />
        <button type='button' onClick={loadData}>데이터 조회</button>
      </form>
      <div className='showTables'>
        {showTable && result.length > 0 && (
          <>
            <button type='button' onClick={hideData}>취소하기</button>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>지역</th>
                  <th>산 이름</th>
                  <th>해발</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <tr key={index}>
                    <td>{item.no}</td>
                    <td>{item.region}</td>
                    <td>{item.mt_name}</td>
                    <td>{item.AMSL}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  )
}

export default FamousMountains;