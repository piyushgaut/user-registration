const express = require('express');
const router = express.Router();
//const gravator = require('gravator');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");
const User = require('../models/User');

router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include the valid email').isEmail(),
        check(
            'password',
            'Please enter the password with 6 or more characters'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email }); // findone is not a method , its findOne

            if (user) {
                res.status(400).json({ error: [{ msg: 'User already exists' }] });
            }

            /*const avatar = gravator.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })*/

            user = new User({
                name,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.send('User registered');
        } catch (err) {
            console.error(err.message);
            res.status(400).send('server error');
        }
    }
);

module.exports = router;

/*const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('user route'));

module.exports = router;*/

