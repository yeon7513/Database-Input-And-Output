import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Movies() {
  const [data, setData] = useState({
    title: '',
    title_en: '',
    summary: '',
    production_year: '',
    director: '',
    country: ''
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
      await axios.post('http://localhost:3300/movies', data);
      console.log('data sent to server')
      setText(true);
      setData({
        title: '',
        title_en: '',
        summary: '',
        production_year: '',
        director: '',
        country: ''
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
    const response = await axios.get('http://localhost:3300/resultMovies');
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
    // 100대 영화
    <section>
      <form action="/saveMovies" method="post" id="movies">
        <div className="title">
          <p>100대 영화</p>
        </div>
        <label htmlFor="title">
          <span>영화 제목</span>
          <input type="text" name="title" id="title" value={data.title} onChange={handleChange} />
        </label>
        <label htmlFor="title_en">
          <span>영어 제목</span>
          <input type="text" name="title_en" id="title_en" value={data.title_en} onChange={handleChange} />
        </label> 
        <label htmlFor="summary">
          <span>줄거리</span>
          <textarea name="summary" id="summary" value={data.summary} onInput={handleChange}></textarea>
        </label>
        <label htmlFor="production_year">
          <span>제작연도</span>
          <input type="number" min="0" max="9999" name="production_year" id="production_year" value={data.production_year} onChange={handleChange} />
        </label>
        <label htmlFor="director">
          <span>영화 감독</span>
          <input type="text" name="director" id="director" value={data.director} onChange={handleChange} />
        </label>
        <label htmlFor="country">
          <span>국가</span>
          <input type="text" name="country" id="country" value={data.country} onChange={handleChange} />
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
                  <th>영화 제목</th>
                  <th>영어 제목</th>
                  <th>줄거리</th>
                  <th>제작연도</th>
                  <th>영화 감독</th>
                  <th>국가</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <tr key={index}>
                    <td>{item.no}</td>
                    <td>{item.title}</td>
                    <td>{item.title_en}</td>
                    <td>{item.summary}</td>
                    <td>{item.production_year}</td>
                    <td>{item.director}</td>
                    <td>{item.country}</td>
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

export default Movies;