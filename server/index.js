const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const course = require("./routes/course");
const subject = require("./routes/subject");
const user = require("./routes/user");
const login = require("./routes/login");
const userCourses = require("./routes/userCourses");
const auth = require("./middleWare/auth");
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/cyberPro/courses", auth, course);
app.use("/api/cyberPro/subjects", subject);
app.use("/api/cyberPro/users", user);
app.use("/api/cyberPro/login", login);
app.use("/api/cyberPro/userCourses", auth, userCourses);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
