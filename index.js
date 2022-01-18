const express = require("express");
const session = require("express-session");
const db = require("./db"); //a benifit of naming the db connection file as index.js. We no need to specify the db connection file

const app = express();

// set the view engine for the application
app.set("view engine", "ejs");

//add support to form encoded
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: "mysecret",
		loggedIn: false, //set to true when logged interface
	})
);

app.get("/", (req, res) => {
	if (req.session.loggedIn)
		// user has logged in
		return res.render("home");
	//redirect to login page if user hasn't logged in
	else return res.redirect("/login");
});

app.get("/login", (req, res) => {
	return res.render("login"); //render login.ejs
});

app.post("/login", (req, res) => {
	db("users")
		.where({ email: req.body.email })
		.select("password")
		.then((data) => {
			//check whether an entry exist with email given
			// and check whether the password is correct
			if (data.length > 0 && data[0].password === req.body.password) {
				// set LoggedIn session to true
				req.session.loggedIn = true;
				return res.redirect("/");
			} else {
				//render login page with Login failed message
				return res.render("login", { message: "Login Failed" });
			}
		})
		.catch((err) => {
			console.error(err);
		});
});

app.get("/register", (req, res) => {
	return res.render("register"); //render register.ejs
});

app.post("/register", (req, res) => {
	// insert details to users database.
	db("users")
		.insert({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		})
		.then(() => {
			return res.redirect("/login");
		})
		.catch((err) => {
			return res.render("register", {
				message: "failed to register. Try with a different email",
			});
		});
});

app.listen(3000, () => {
	console.log("app is listening on http://localhost:3000");
});
