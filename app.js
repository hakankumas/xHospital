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
const Admin = require("./models/Admin");

app.get("/", async (req, res) => {
    const count_department = await Department.countAmount();
    const count_doctor = await Doctor.countAmount();
    const count_sick = await Sick.countAmount();

    const list_department = await Department.getAll();
    const list_doctor = await Doctor.getAll();

    res.render("index", {
        title: "Ana Sayfa | Hastane KDS",
        subtitle: "Ana Sayfa | Hastane Karar Destek Sistemleri",

        count_department: count_department[0],
        count_doctor: count_doctor[0],
        count_sick: count_sick[0],

        list_department: list_department[0],
        list_doctor: list_doctor[0],
    });
});

app.get("/login", async (req, res) => {
    res.render("login", {
        title: "Admin Giriş | Hastane KDS",
    });
});

app.post("/api/login", async (req, res) => {
    const admin = await Admin.get(req.body);
    if (admin[0][0]) res.redirect("/");
    else res.redirect("/login");
});

app.get("/department/", async (req, res) => {
    const list_numberOfDoctorInDepartment =
        await Department.numberOfDoctorInDepartment();
    const list_numberOfSickByDepartment =
        await Department.numberOfSickByDepartment();
    res.render("./department/index", {
        title: "Departmanlar | Hastane KDS",
        subtitle: "Departmanlar | Hastane Karar Destek Sistemleri",

        list_numberOfDoctorInDepartment: list_numberOfDoctorInDepartment[0],
        list_numberOfSickByDepartment: list_numberOfSickByDepartment[0],
    });
});

app.get("/doctor/", async (req, res) => {
    const list_sumNumberOfSickByDoctor = await Doctor.sumNumberOfSickByDoctor();
    res.render("./doctor/index", {
        title: "Doktorlar | Hastane KDS",
        subtitle: "Doktorlar | Hastane Karar Destek Sistemleri",

        list_sumNumberOfSickByDoctor: list_sumNumberOfSickByDoctor[0],
    });
});

app.get("/sick/", async (req, res) => {
    const list_sick = await Sick.getAll();
    res.render("./sick/index", {
        title: "Hastalar | Hastane KDS",
        subtitle: "Hastalar | Hastane Karar Destek Sistemleri",

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

app.get("/api/dailyNumberOfSickByDoctor", async (req, res) => {
    const dailyNumberOfSickByDoctor = await Doctor.dailyNumberOfSickByDoctor();

    res.status(200).json({
        dailyNumberOfSickByDoctor: dailyNumberOfSickByDoctor[0],
    });
});

app.get("/api/genderBySickid", async (req, res) => {
    const genderBySickid = await Sick.genderBySickid();

    res.status(200).json({
        genderBySickid: genderBySickid[0],
    });
});

app.get("/api/genderByTcno", async (req, res) => {
    const genderByTcno = await Sick.genderByTcno();

    res.status(200).json({
        genderByTcno: genderByTcno[0],
    });
});

app.get("/api/genderByDoctor", async (req, res) => {
    const genderByDoctor = await Doctor.genderByDoctor();

    res.status(200).json({
        genderByDoctor: genderByDoctor[0],
    });
});

app.get("/api/numberOfSickByDepartment", async (req, res) => {
    const numberOfSickByDepartment =
        await Department.numberOfSickByDepartment();

    res.status(200).json({
        numberOfSickByDepartment: numberOfSickByDepartment[0],
    });
});

app.get("/api/numberOfExaminationPerDoctor", async (req, res) => {
    const numberOfExaminationPerDoctor =
        await Doctor.numberOfExaminationPerDoctor();

    res.status(200).json({
        numberOfExaminationPerDoctor: numberOfExaminationPerDoctor[0],
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
