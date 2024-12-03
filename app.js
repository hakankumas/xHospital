const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const departmentRoutes = require("./routes/department");
// const doctorRoutes = require("./routes/doctor");
// const sickRoutes = require("./routes/sick");

// app.use("/department", departmentRoutes);
// app.use("/doctor", doctorRoutes);
// app.use("/sick", sickRoutes);

const Department = require("./models/Department");
const Doctor = require("./models/Doctor");
const Sick = require("./models/Sick");

app.get("/", async (req, res) => {
    const count_department = await Department.countAmount();
    const count_doctor = await Doctor.countAmount();
    const count_sick = await Sick.countAmount();

    const list_numberOfDoctorInDepartment =
        await Department.numberOfDoctorInDepartment();
    const list_numberOfSickByDepartment =
        await Department.numberOfSickByDepartment();
    const list_sumNumberOfSickByDoctor = await Doctor.sumNumberOfSickByDoctor();

    res.render("index", {
        title: "Ana Sayfa | Hastane KDS",

        count_department: count_department[0],
        count_doctor: count_doctor[0],
        count_sick: count_sick[0],

        list_numberOfDoctorInDepartment: list_numberOfDoctorInDepartment[0],
        list_numberOfSickByDepartment: list_numberOfSickByDepartment[0],
        list_sumNumberOfSickByDoctor: list_sumNumberOfSickByDoctor[0],
    });
});

app.get("/department/", async (req, res) => {
    const list_numberOfDoctorInDepartment =
        await Department.numberOfDoctorInDepartment();
    const list_numberOfSickByDepartment =
        await Department.numberOfSickByDepartment();
    res.render("./department/index", {
        title: "Departmanlar | Hastane KDS",
        list_numberOfDoctorInDepartment: list_numberOfDoctorInDepartment[0],
        list_numberOfSickByDepartment: list_numberOfSickByDepartment[0],
    });
});

app.get("/doctor/", async (req, res) => {
    const list_sumNumberOfSickByDoctor = await Doctor.sumNumberOfSickByDoctor();
    res.render("./doctor/index", {
        title: "Doktorlar | Hastane KDS",
        list_sumNumberOfSickByDoctor: list_sumNumberOfSickByDoctor[0],
    });
});

app.get("/sick/", async (req, res) => {
    const list_sick = await Sick.getAll();
    res.render("./sick/index", {
        title: "Hastalar | Hastane KDS",
        list_sick: list_sick[0],
    });
});

app.get("/api/dailySickAmount", async (req, res) => {
    const dailySickAmount = await Sick.dailySickAmount();

    res.status(200).json({
        dailySickAmount: dailySickAmount[0],
    });
});

app.get("/api/dailyNumberOfSickByDepartment", async (req, res) => {
    const dailyNumberOfSickByDepartment =
        await Department.dailyNumberOfSickByDepartment();

    res.status(200).json({
        dailyNumberOfSickByDepartment: dailyNumberOfSickByDepartment[0],
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
