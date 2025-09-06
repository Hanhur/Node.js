const { Router } = require('express');
const Course = require('../models/course');
const router = Router();
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    const courses = await Course.find();

    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    });
});

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    const course = await Course.findById(req.params.id);

    res.render('course-edit', {
        title: `Рудактировать ${course.title}`,
        course
    });
});

router.post('/edit', async (req, res) => {
    const { id } = req.body;

    delete req.body.id;

    await Course.findByIdAndUpdate(id, req.body);

    res.redirect('/courses');
});

// router.get('/:id', async (req, res) => {
//     try {
//         const course = await Course.findById(req.params.id);
//         res.render('course', {
//             layout: 'empty',
//             title: `Курс ${course.title}`,
//             course
//         });
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // проверка валидности id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid course id');
        }

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).send('Course not found');
        }

        res.render('course', {
            layout: 'empty',
            title: `Курс ${course.title}`,
            course
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



module.exports = router;