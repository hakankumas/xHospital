const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Department = require("./models/Department");
const Doctor = require("./models/Doctor");
const Sick = require("./models/Sick");
const Views = require("./models/Views");

app.use("/department/getall", async (req, res) => {
    const departments = await Department.getAll();
    if (!departments) return res.status(404).end();
    res.status(200).json(departments[0]);
});

app.use("/doctor/getall", async (req, res) => {
    const doctors = await Doctor.getAll();
    if (!doctors) return res.status(404).end();
    res.status(200).json(doctors[0]);
});

app.use("/sick/getall", async (req, res) => {
    const sicks = await Sick.getAll();
    if (!sicks) return res.status(404).end();
    res.status(200).json(sicks[0]);
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
