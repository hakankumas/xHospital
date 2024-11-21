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

const Views = require("./models/Views");
const Department = require("./models/Department");
const Doctor = require("./models/Doctor");
const Sick = require("./models/Sick");

app.get("/", async (req, res) => {
    const department = await Department.countAmount();
    const doctor = await Doctor.countAmount();
    const sick = await Sick.countAmount();
    res.render("index", {
        title: "xHospital",
        department: department[0],
        doctor: doctor[0],
        sick: sick[0],
    });
});

app.use("/views/department_doctor", async (req, res) => {
    const department_doctor = await Views.get_department_doctor_info();
    if (!department_doctor) return res.status(404).end();
    res.status(200).json(department_doctor[0]);
});

app.use("/views/doctor_sick", async (req, res) => {
    const doctor_sick = await Views.get_doctor_sick_info();
    if (!doctor_sick) return res.status(404).end();
    res.status(200).json(doctor_sick[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
