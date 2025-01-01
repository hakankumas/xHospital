const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const homeRoutes = require("./routes/home");
const departmentRoutes = require("./routes/department");
const doctorRoutes = require("./routes/doctor");
const sickRoutes = require("./routes/sick");
const apiRoutes = require("./routes/api");

app.use(homeRoutes);
app.use("/department", departmentRoutes);
app.use("/doctor", doctorRoutes);
app.use("/sick", sickRoutes);
app.use("/api", apiRoutes);

const PORT = 3000;
app.locals.baseURL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
