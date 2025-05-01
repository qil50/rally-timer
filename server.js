import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();
app.use(helmet({
  contentSecurityPolicy: false   // عطل CSP لو تحتاج تحميل صوت من نفس الأصل فقط
}));
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist'), {
    extensions: ['html']         
  }));

// fallback  SPA
app.get('/*', (_, res) => {     
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
