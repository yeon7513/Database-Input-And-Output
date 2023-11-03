import React, { useEffect, useState } from 'react';
import axios from 'axios';

function KoreanTourist() {
  const [data, setData] = useState({
    spot : '',
    addr : '',
    keyword : ''
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
      await axios.post('http://localhost:3300/korean_tourist', data);
      console.log('data sent to server')
      setText(true);
      setData({
        spot: '',
        addr: '',
        keyword: ''
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
    const response = await axios.get('http://localhost:3300/resultKoreanTourist');
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
    // 한국관광 100선
    <section>
      <form id="korean-tourist">
        <div className="title">
          <p>한국관광 100선</p>
        </div>
        <label htmlFor="spot">
          <span>관광지</span>
          <input type="text" name="spot" id="spot" value={data.spot} onChange={handleChange} />
        </label>
        <label htmlFor="addr">
          <span>주소</span>
          <input type="text" name="addr" id="addr" value={data.addr} onChange={handleChange} />
        </label>
        <label htmlFor="keyword">
          <span>키워드</span>
          <input type="text" name="keyword" id="keyword" value={data.keyword} onChange={handleChange} />
        </label>
        {showText && (
          <p className='success'>데이터 입력 성공!</p>
        )}
        <input type="submit" value="등록하기" onClick={sendData}/>
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
                  <th>관광지</th>
                  <th>주소</th>
                  <th>키워드</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <tr key={index}>
                    <td>{item.no}</td>
                    <td>{item.spot}</td>
                    <td>{item.addr}</td>
                    <td>{item.keyword}</td>
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

export default KoreanTourist;