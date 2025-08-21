const express = require("express");
const connectToDB = require("./configs/mongo.config");
const UserRouter = require("./routes/user.route");
const PostRouter = require("./routes/post.route");

const app = express();
const PORT = 3000;

connectToDB();

app.get("/", (req, res) => {
  res.json({ message: "Server working fine!!!" });
});

app.use(express.json());

app.use("/user", UserRouter)
app.use("/post",PostRouter )

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
