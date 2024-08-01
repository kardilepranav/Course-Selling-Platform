const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
	authenticateJwt,
	SECRET,
	authorizeRole,
} = require('../middleware/auth');
const { User, Course, Admin } = require('../db');
const router = express.Router();

router.get(
	'/me',
	authenticateJwt,
	authorizeRole(['user']),
	async (req, res) => {
		const user = await Admin.findOne({ username: req.user.username });
		if (!user) {
			res.status(403).json({ msg: 'Admin doesnt exist' });
			return;
		}
		res.json({
			username: user.username,
		});
	}
);

router.post('/signup', async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (user) {
		res.status(403).json({ message: 'User already exists' });
	} else {
		const hashedPassword = bcrypt.hashSync(password, 10)
		const obj = { username: username, password: hashedPassword };
		const newUser = new User(obj);
		delete req.body.password
		newUser.save();
		const token = jwt.sign({ username, role: 'user' }, SECRET, {
			expiresIn: '1h',
		})
		res.json({ message: 'User created successfully', token });
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (!user) {
		return res.status(403).json({ message: 'Invalid username or password' });
	}
	const validPassword = bcrypt.compareSync(password, user.password);
	if (!validPassword) {
		return res.status(403).json({ message: 'Invalid username or password' });
	}
	delete req.body.password;
	const token = jwt.sign({ username, role: 'user' }, SECRET, {
		expiresIn: '1h',
	});
	res.json({ message: 'Logged in successfully', token });
});

router.get(
	'/courses',
	authenticateJwt,
	authorizeRole(['user']),
	async (req, res) => {
		const courses = await Course.find({ published: true });
		res.json({ courses });
	}
);

router.post(
	'/courses/:courseId',
	authenticateJwt,
	authorizeRole(['user']),
	async (req, res) => {
		const course = await Course.findById(req.params.courseId);
		if (course) {
			const user = await User.findOne({ username: req.user.username });
			if (user.purchasedCourses.includes(course._id)) {
				return res.status(207).json({ message: 'Course have been already purchased' })
			}
			if (user) {
				user.purchasedCourses.push(course);
				await user.save();
				res.json({ message: 'Course purchased successfully' });
			} else {
				res.status(403).json({ message: 'User not found' });
			}
		} else {
			res.status(404).json({ message: 'Course not found' });
		}
	}
);

router.get(
	'/purchasedCourses',
	authenticateJwt,
	authorizeRole(['user']),
	async (req, res) => {
		const user = await User.findOne({ username: req.user.username }).populate(
			'purchasedCourses'
		);
		if (user) {
			res.json({ purchasedCourses: user.purchasedCourses || [] });
		} else {
			res.status(403).json({ message: 'User not found' });
		}
	}
);

module.exports = router;
