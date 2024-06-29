const mongoose = require('mongoose');
const express = require('express');
const { User, Course, Admin } = require('../db');
const jwt = require('jsonwebtoken');
const { SECRET, authorizeRole } = require('../middleware/auth');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authenticateJwt, authorizeRole(['admin']), async (req, res) => {
	const admin = await Admin.findOne({ username: req.user.username });
	if (!admin) {
		res.status(403).json({ msg: 'Admin doesnt exist' });
		return;
	}
	res.json({
    username: admin.username,
    role: ['admin'],
	});
});

router.post('/signup', (req, res) => {
	const { username, password } = req.body;
	function callback(admin) {
		if (admin) {
			res.status(403).json({ message: 'Admin already exists' });
		} else {
			const obj = { username: username, password: password };
			const newAdmin = new Admin(obj);
			newAdmin.save();

			const token = jwt.sign({ username, role: 'admin' }, SECRET, {
				expiresIn: '1h',
			});
			res.json({ message: 'Admin created successfully', token });
		}
	}
	Admin.findOne({ username }).then(callback);
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const admin = await Admin.findOne({ username, password });
	if (admin) {
		const token = jwt.sign({ username, role: 'admin' }, SECRET, {
			expiresIn: '1h',
		});
		res.json({ message: 'Logged in successfully', token });
	} else {
		res.status(403).json({ message: 'Invalid username or password' });
	}
});

router.post('/courses', authenticateJwt, authorizeRole(['admin']), async (req, res) => {
	const course = new Course(req.body);
	await course.save();
	res.json({ message: 'Course created successfully', courseId: course.id });
});

router.put('/courses/:courseId', authenticateJwt, authorizeRole(['user', 'admin']), async (req, res) => {
	const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
		new: true,
	});
	if (course) {
		res.json({ message: 'Course updated successfully' });
	} else {
		res.status(404).json({ message: 'Course not found' });
	}
});

router.get('/courses', authenticateJwt, authorizeRole(['admin']), async (req, res) => {
	const courses = await Course.find({});
	res.json({ courses });
});

router.get('/course/:courseId', authenticateJwt, authorizeRole(['admin']), async (req, res) => {
	const courseId = req.params.courseId;
	const course = await Course.findById(courseId);
	res.json({ course });
});

router.delete('/remove-course/:courseId', authenticateJwt, authorizeRole(['admin']), async (req, res) => {
	const courseId = req.params.courseId;
	const course = await Course.findByIdAndDelete(courseId);
	if (course) {
		res.json({ message: 'Course Deleted Successfully' });
	} else {
		res.status(404).json({ message: 'Course not found' });
	}
});

module.exports = router;
