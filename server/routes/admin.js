const bcrypt = require('bcrypt')
const express = require('express');
const { Course, Admin } = require('../db');
const jwt = require('jsonwebtoken');
const { SECRET, authorizeRole } = require('../middleware/auth');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.get(
	'/me',
	authenticateJwt,
	authorizeRole(['admin']),
	async (req, res) => {
		const admin = await Admin.findOne({ username: req.user.username });
		if (!admin) {
			res.status(403).json({ msg: 'Admin doesnt exist' });
			return;
		}
		res.json({
			username: admin.username,
			role: ['admin'],
		});
	}
);

router.post('/signup', async(req, res) => {
	const { username, password } = req.body;
	const admin = await Admin.findOne({ username });
	if (admin) {
		res.status(403).json({ message: 'Admin already exists' });
	} else {
		const hashedPassword = bcrypt.hashSync(password, 10)
		const obj = { username: username, password: hashedPassword };
		const newAdmin = new Admin(obj);
		delete req.body.password
		newAdmin.save();
		const token = jwt.sign({ username, role: 'admin' }, SECRET, {
			expiresIn: '1h',
		});
		res.json({ message: 'Admin created successfully', token });
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const admin = await Admin.findOne({ username });
	if (!admin) {
		res.status(403).json({ message: 'Invalid username or password' });
	}
	const validPassword = bcrypt.compareSync(password, admin.password)
	if (!validPassword) {
		res.status(403).json({ message: 'Invalid username or password' });
	}
	delete req.body.password
	const token = jwt.sign({ username, role: 'admin' }, SECRET, {
		expiresIn: '1h',
	});
	res.json({ message: 'Logged in successfully', token });
});

router.post(
	'/courses',
	authenticateJwt,
	authorizeRole(['admin']),
	async (req, res) => {
		const course = new Course(req.body);
		await course.save();
		res.json({ message: 'Course created successfully', courseId: course.id });
	}
);

router.put(
	'/courses/:courseId',
	authenticateJwt,
	authorizeRole(['user', 'admin']),
	async (req, res) => {
		const course = await Course.findByIdAndUpdate(
			req.params.courseId,
			req.body,
			{
				new: true,
			}
		);
		if (course) {
			res.json({ message: 'Course updated successfully' });
		} else {
			res.status(404).json({ message: 'Course not found' });
		}
	}
);

router.get(
	'/courses',
	authenticateJwt,
	authorizeRole(['admin']),
	async (req, res) => {
		const courses = await Course.find({});
		res.json({ courses });
	}
);

router.get(
	'/course/:courseId',
	authenticateJwt,
	authorizeRole(['admin']),
	async (req, res) => {
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);
		res.json({ course });
	}
);

router.delete(
	'/remove-course/:courseId',
	authenticateJwt,
	authorizeRole(['admin']),
	async (req, res) => {
		const courseId = req.params.courseId;
		const course = await Course.findByIdAndDelete(courseId);
		if (course) {
			res.json({ message: 'Course Deleted Successfully' });
		} else {
			res.status(404).json({ message: 'Course not found' });
		}
	}
);

module.exports = router;
