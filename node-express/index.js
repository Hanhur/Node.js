const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const homeRoutes = require('./routes/home');
const carRoutes = require('./routes/card');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');

require('dotenv').config();

const app = express();

const hbs = exphbs.create({
    handlebars: require('handlebars'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', carRoutes);


const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
    }
}

start();
