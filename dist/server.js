import app from './app.js'; // ESM এ .js দেওয়া জরুরি
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map