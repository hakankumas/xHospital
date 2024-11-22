const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const departmentRoutes = require("./routes/department");
const doctorRoutes = require("./routes/doctor");
const sickRoutes = require("./routes/sick");

app.use("/department", departmentRoutes);
app.use("/doctor", doctorRoutes);
app.use("/sick", sickRoutes);

const Department = require("./models/Department");
const Doctor = require("./models/Doctor");
const Sick = require("./models/Sick");

app.get("/", async (req, res) => {
    const count_department = await Department.countAmount();
    const count_doctor = await Doctor.countAmount();
    const count_sick = await Sick.countAmount();

    const list_department = await Department.getAll();
    const list_doctor = await Doctor.getAll();
    const list_sick = await Sick.getAll();

    res.render("index", {
        title: "xHospital",
        count_department: count_department[0],
        count_doctor: count_doctor[0],
        count_sick: count_sick[0],

        list_department: list_department[0],
        list_doctor: list_doctor[0],
        list_sick: list_sick[0],
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
