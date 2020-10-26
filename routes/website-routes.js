const router = require('express').Router();
const User = require('../models/users');
const Pets = require('../models/pets');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const cloudinary = require('cloudinary').v2;
const upload = require('../config/multer');
<<<<<<< HEAD
const quotes = require("quotesy");
const nodemailer = require("nodemailer");

var c=1;
=======
var c = 1;
const nodemailer = require('nodemailer');

// Step 1
>>>>>>> 52bf44d63bbd88345cc75bdc350487d25f8de5fe
let transporter = nodemailer.createTransport({
	service : 'gmail',
	auth    : {
		user : 'wpproject264@gmail.com',
		pass : 'Sachin@100'
	}
});

require('../config/cloudinary');
router.get('', (req, res) => {
	c = 1;
	res.render('home');
});

// login route
router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/register', upload.single('image'), async (req, res) => {
	const { name,phone, email, password, password2 } = req.body;

	const loc = await cloudinary.uploader
		.upload(req.file.path, function(error, result) {
			console.log('no error');
		})
		.catch((e) => console.log(e));

	let errors = [];
	if (!name || !email || !password || !password2) {
		errors.push({ msg: 'All fields are compulsory' });
	}
	if (phone.length!=10){
		errors.push({ msg: 'Wrong Phone number' });

	}
	if (password.length < 6) {
		errors.push({ msg: 'Passwords too short' });
	}
	if (password != password2) {
		errors.push({ msg: 'Passwords do not match' });
	}

	if (errors.length > 0) {
		res.render('register', { errors, name, email, password, password2 });
	} else {
		User.findOne({ email: email })
			.then((user) => {
				if (user) {
					errors.push({ msg: 'Email already exists' });
					res.render('register', { errors, name, email, password, password2 });
				} else {
					const newUser = new User({
						name,
						email,
						password,
						phone
						// profile_img : loc.url
					});

					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) {
								console.log(err);
							} else {
								newUser.password = hash;
								newUser.profile_image = loc.url;
								newUser.save();
								res.redirect('/login');
							}
						});
					});
				}
			})
			.catch((e) => console.log(e));
	}
});

// Login
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect : '/showPets',
		failureRedirect : '/login'
	})(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});
// register route
router.get('/register', (req, res) => {
	res.render('register');
});

<<<<<<< HEAD


router.get('/showPets', (req, res) => {
	const b=req.user.profile_image;
	
	if(req.query.search){
		c=0
		
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Pets.find({$or:[{petname:regex} ,{breed:regex}]}, (err, pets) => {
			if (err) {
				console.log(err);
			} else {
				console.log(req.user);
				res.render('showPets', {
					pets : pets,
					user : req.user,
					value : c,
					img :b
				});
			}
		});

	}
	else{
		Pets.find({}, (err, pets) => {
			if (err) {
				console.log(err);
			} else {
				console.log(req.user);
				res.render('showPets', {
					pets : pets,
					user : req.user,
					value : c,
					img :b
					
				});
			}
		});

	}
	
});

router.post('/showPets',(req,res)=>{
	const a=req.body.load;
	
	console.log(a);
    c=0;
=======
router.get('/users', (req, res) => {
	c = 1;
	console.log(req.user);
	res.render('users', {
		user : req.user
	});
});

// router.get('/showPets', (req, res) => {
// 	if (req.query.search) {
// 		c = 0;

// 		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
// 		Pets.find({ $or: [ { petname: regex }, { breed: regex } ] }, (err, pets) => {

// 	if(req.query.search){
// 		c=0

// 		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
// 		Pets.find({$or:[{petname:regex} ,{breed:regex}]}, (err, pets) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				console.log(req.user);
// 				res.render('showPets', {
// 					pets  : pets,
// 					user  : req.user,
// 					value : c
// 				});
// 			}
// 		});
// 	} else {
// 		Pets.find({}, (err, pets) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				console.log(req.user);
// 				res.render('showPets', {
// 					pets  : pets,
// 					user  : req.user,
// 					value : c

// 				});
// 			}
// 		});
// 	}
// });

router.post('/showPets', (req, res) => {
	const a = req.body.load;
	email = req.body.email;
	console.log(req.body);
	// Step 2
	let mailOptions = {
		from    : 'wpproject264@gmail.com',
		to      : email,
		subject : 'Test',
		text    : 'mail sent....'
	};

	// Step 3
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Email sent!!!');
		}
	});

	c = 0;
>>>>>>> 52bf44d63bbd88345cc75bdc350487d25f8de5fe
	res.redirect('/showPets');
});

router.get('/add_pets', (req, res) => {
	res.render('add_pets');
});
<<<<<<< HEAD
router.post('/add_pets', upload.single('pet_image'), async (req, res) => {
	console.log(req.body);
=======
router.post('/add-pets', upload.single('pet_image'), async (req, res) => {
>>>>>>> 52bf44d63bbd88345cc75bdc350487d25f8de5fe
	const { petname, petage, breed, color, phone } = req.body;
	const img_loc = await await cloudinary.uploader
		.upload(req.file.path, function(error, result) {
			console.log('no error');
		})
		.catch((e) => console.log(e));
	console.log(req.user.email);
	var new_pet = new Pets({
		petname   : petname,
		petage    : petage,
		color     : color,
		breed     : breed,
		phone     : phone,
		pet_image : img_loc.url,
	});
	new_pet.owner_email = req.user.email;

	new_pet.save(function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/showPets');
		}
	});
});

<<<<<<< HEAD
router.get('/user',(req,res)=>{
	user = req.user;
	Pets.find({owner_email:user.email}, (err, pets) => {
		if (err) {
			console.log(err);
		} else {
			console.log(pets);
		let inspire =quotes.random();
		console.log(inspire);
		res.render('user',{quote:inspire,users:user,pets:pets});
			
			
		}
	});
	
	

});

router.get("/showPets/:topic",(req,res)=>{
    let a=0;
	const re=req.params.topic;
	console.log(re);
	Pets.find({}, (err, pets) => {
		if (err) {
			console.log(err);
		} else {
			res.render('PetProfile', {
				pets  : pets,
				user : req.user,
				name : re
				
			});
		}
	});

});

router.post("/showPets/:topic",(req,res)=>{
	email = req.body.email;
	name = req.body.name;
	user_name=req.user.name;
	// phone = req.user.phone;
	email_id=req.user.email;


	console.log(req.body);
	// Step 2
	let mailOptions = {
		from    : 'wpproject264@gmail.com',
		to      : email,
		subject : 'Looks like Someone is interested in your pet',
		html    : 'Dear user,<br><br>This is regarding your pet <strong>'+name+'</strong> registered with us. <br> A user has shown interest in your pet. You can contact him with the credentials given below:</br><br>  <strong>Name :</strong>'+user_name+'<br><strong>Phone No :</strong> 1111122223<br><strong>Email_id :</strong>'+email_id
	};
	// Step 3
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Email sent!!!');
		}
	});
	c = 0;
	res.redirect('/showPets');


});
router.post("/delete",(req,res)=>{
	u= req.body.id;

	Pets.findOneAndRemove({_id:u},(err)=>{
		if(err){
			console.log(err);
		}else{
			
			res.redirect('/user');


		}
	});

});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


=======
function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
>>>>>>> 52bf44d63bbd88345cc75bdc350487d25f8de5fe
// export the routes
module.exports = router;
