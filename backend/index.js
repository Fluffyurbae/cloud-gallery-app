const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
const AWS = require('aws-sdk');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const s3Config = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

if (process.env.S3_ENDPOINT) {
  s3Config.endpoint = process.env.S3_ENDPOINT;
  s3Config.s3ForcePathStyle = true; // Wajib untuk MinIO
}

const s3 = new AWS.S3(s3Config);

app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  const key = Date.now() + '-' + file.originalname;

  try {
    await s3.upload({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }).promise();

    let url;
    if (process.env.S3_ENDPOINT) {
      // Untuk MinIO (URL lokal)
      const endpointHost = process.env.S3_ENDPOINT.replace(/^https?:\/\//, '');
      url = `http://${endpointHost}/${process.env.S3_BUCKET}/${key}`;
    } else {
      // Untuk AWS
      url = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }

    await pool.query('INSERT INTO images(name, url) VALUES($1, $2)', [key, url]);
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

app.get('/images', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM images ORDER BY id DESC');
  res.json(rows);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
