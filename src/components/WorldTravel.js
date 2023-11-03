import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WorldTravel() {
  const [data, setData] = useState({
    destination : '',
    country : '',
    img : null,
    img_src : ''
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
      await axios.post('http://localhost:3300/world_travel', data);
      console.log('data sent to server')
      setText(true);
      setData({
        destination : '',
        country : '',
        img : null,
        img_src : ''
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
    const response = await axios.get('http://localhost:3300/resultWorldTravel');
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
    // 죽기 전에 가봐야 할 세계 100대 여행지
    <section>
      <form action="/saveWorldTravel" method="post" id="world-travel">
        <div className="title">
          <p>죽기 전에 가봐야 할 세계 100대 여행지</p>
        </div>
        <label htmlFor="destination">
          <span>여행지</span>
          <input type="text" name="destination" id="destination" value={data.destination} onChange={handleChange}  />
        </label>
        <label htmlFor="country">
          <span>국가</span>
          <input type="text" name="country" id="country" value={data.country} onChange={handleChange}  />
        </label>
        <label htmlFor="img">
          <span>이미지</span>
          <input type="file" name="img" id="img" onChange={handleChange}  />
        </label>
        <label htmlFor="img_src">
          <span>이미지 주소</span>
          <input type="text" name="img_src" id="img_src" value={data.img_src} onChange={handleChange} />
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
                  <th>여행지</th>
                  <th>국가</th>
                  <th>이미지</th>
                  <th>이미지 주소</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <tr key={index}>
                    <td>{item.no}</td>
                    <td>{item.destination}</td>
                    <td>{item.country}</td>
                    <td>
                      {item.img === null ? (
                        'No Image'
                      ) : (
                        <img
                          src={`data:image/jpeg;base64,${btoa(
                            String.fromCharCode.apply(null, new Uint8Array(item.img.data))
                          )}`}
                          alt="Travel"
                        />
                      )}
                    </td>
                    <td>{item.img_src}</td>
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

export default WorldTravel;