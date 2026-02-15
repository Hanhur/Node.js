const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const ordersRoutes = require("./routes/orders");
const User = require("./models/user");

const app = express();

const hbs = exphbs.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    defaultLayout: "main",
    extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
    try {
        const user = await User.findById("6991d77b840218be86cd00f4");
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
    }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const url = ``;
        await mongoose.connect(url);

        // create a new user
        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: "mango@mail.ru",
                name: "Mango",
                cart: { items: [] }
            });
            await user.save();
        };

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}

start();
// Полное руководство Node.JS. Урок 50. Страница логина