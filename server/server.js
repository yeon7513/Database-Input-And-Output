const express = require('express');
const app = express();
const db = require('./config/mysql');
const cors = require('cors');
const bodyParser = require("body-parser");
const PORT = 3300;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Root');
});

// DB연결 확인 -> 확인됨
// app.get('/user', (req, res) => {
//   const query = 'SELECT * FROM famous_mountains';
//   db.query(query, (error, results, fields) => {
//     if (error) {
//       console.error('MySQL query error:', error);
//       res.status(500).send('Error querying MySQL database');
//     } else {
//       res.json(results);
//     }
//   });
// });

// send - famous_mountains
app.post('/famous_mountains', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const data = req.body;

  const region = data.region;
  const mt_name = data.mt_name;
  const AMSL = data.AMSL;

  const query = `insert into famous_mountains values(null, '${region}', '${mt_name}', '${AMSL}')`;

  db.query(query, [region, mt_name, AMSL], (error, results, fields) => {
    if (error) {
      console.error('MySQL query error:', error);
      res.status(500).send('Error inserting data into MySQL database');
    } else {
      res.send('Data inserted successfully');
    }
  });
});
// load - famous_mountains
app.get('/resultFamousMountains', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  db.connect(function(err) {
    const query = 'select * from famous_mountains'
    db.query(query, (err, data) => {
      if(!err) res.send({data : data});
      else res.send(err);
    });
  });
});


// send - korean_tourist
app.post('/korean_tourist', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const data = req.body;

  const spot = data.spot;
  const addr = data.addr;
  const keyword = data.keyword;

  const query = `insert into korean_tourist values(null, '${spot}', '${addr}', '${keyword}')`;

  db.query(query, [spot, addr, keyword], (error, results, fields) => {
    if (error) {
      console.error('MySQL query error:', error);
      res.status(500).send('Error inserting data into MySQL database');
    } else {
      res.send('Data inserted successfully');
    }
  });
});
// load - korean_tourist
app.get('/resultKoreanTourist', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  db.connect(function(err) {
    const query = 'select * from korean_tourist'
    db.query(query, (err, data) => {
      if(!err) res.send({data : data});
      else res.send(err);
    });
  });
});


// send - world_travel
app.post('/world_travel', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const data = req.body;

  const destination = data.destination;
  const country = data.country;
  const img = data.img;
  const img_src = data.img_src;

  const query = `insert into world_travel values(null, '${destination}', '${country}', '${img}', '${img_src}')`;

  db.query(query, [destination, country, img, img_src], (error, results, fields) => {
    if (error) {
      console.error('MySQL query error:', error);
      res.status(500).send('Error inserting data into MySQL database');
    } else {
      res.send('Data inserted successfully');
    }
  });
});
// load - world_travel
app.get('/resultWorldTravel', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  db.connect(function(err) {
    const query = 'select * from world_travel'
    db.query(query, (err, data) => {
      if(!err) res.send({data : data});
      else res.send(err);
    });
  });
});


// send - movies
app.post('/movies', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const data = req.body;

  const title = data.title;
  const title_en = data.title_en;
  const summary = data.summary;
  const production_year = data.production_year;
  const director = data.director;
  const country = data.country;

  const query = `insert into movies values(null, '${title}', '${title_en}', '${summary}', '${production_year}', '${director}', '${country}')`;

  db.query(query, [title, title_en, summary, production_year, director, country], (error, results, fields) => {
    if (error) {
      console.error('MySQL query error:', error);
      res.status(500).send('Error inserting data into MySQL database');
    } else {
      res.send('Data inserted successfully');
    }
  });
});
// load - movies
app.get('/resultMovies', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  db.connect(function(err) {
    const query = 'select * from movies'
    db.query(query, (err, data) => {
      if(!err) res.send({data : data});
      else res.send(err);
    });
  });
});


// send - masterpiece 
app.post('/masterpiece', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const data = req.body;

  const book_name = data.book_name;
  const author = data.author;
  const summary = data.summary;

  const query = `insert into masterpiece values(null, '${book_name}', '${author}', '${summary}')`;

  db.query(query, [book_name, author, summary], (error, results, fields) => {
    if (error) {
      console.error('MySQL query error:', error);
      res.status(500).send('Error inserting data into MySQL database');
    } else {
      res.send('Data inserted successfully');
    }
  });
});
// load - masterpiece
app.get('/resultMasterpiece', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  db.connect(function(err) {
    const query = 'select * from masterpiece'
    db.query(query, (err, data) => {
      if(!err) res.send({data : data});
      else res.send(err);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server Run : http://localhost:${PORT}/`);
})