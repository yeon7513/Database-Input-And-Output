import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Masterpiece() {
  const [data, setData] = useState({
    book_name: '',
    author: '',
    summary: ''
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
      await axios.post('http://localhost:3300/masterpiece', data);
      console.log('data sent to server')
      setText(true);
      setData({
        book_name: '',
        author: '',
        summary: ''
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
    const response = await axios.get('http://localhost:3300/resultMasterpiece');
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
    // 100대 명작
    <section>
      <form id="masterpiece">
        <div className="title">
          <p>100대 명작</p>
        </div>
        <label htmlFor="book_name">
          <span>책 이름</span>
          <input type="text" name="book_name" id="book_name" value={data.book_name} onChange={handleChange} />
        </label>
        <label htmlFor="author">
          <span>작가</span>
          <input type="text" name="author" id="author" value={data.author} onChange={handleChange} />
        </label>
        <label htmlFor="summary">
          <span>줄거리</span>
          <textarea name="summary" id="summary" value={data.summary} onInput={handleChange}></textarea>
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
                  <th>책 이름</th>
                  <th>작가</th>
                  <th>줄거리</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <tr key={index}>
                    <td>{item.no}</td>
                    <td>{item.book_name}</td>
                    <td>{item.author}</td>
                    <td>{item.summary}</td>
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

export default Masterpiece;