import app from "./app";
import connectDB from "./db";


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
connectDB();
