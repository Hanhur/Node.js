const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const homeRoutes = require('./routes/home');
const carRoutes = require('./routes/card');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

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

async function start() 
{
    try{
        const url = `mongodb+srv://Mango:nE2ZFBZREBbK3xsu@cluster0.qbdnx7h.mongodb.net/shop`;

        await mongoose.connect(url, { useNewUrlParser: true });
        console.log('Connected to MongoDB successfully');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(error)
    {
        console.error('Connection error:', error);
    }
}

start();
