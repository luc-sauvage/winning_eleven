const express = require("express");
const router = new express.Router();

const db = require("../db");
const { compare, hash } = require("../bc");

const ses = require("../ses.js");
const cryptoRandomString = require("crypto-random-string");

router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
});

router.post("/register", (req, res) => {
    if (
        !req.body.first ||
        !req.body.last ||
        !req.body.email ||
        !req.body.pass ||
        !req.body.email.includes("@")
    ) {
        res.json({ success: false });
    } else {
        hash(req.body.pass)
            .then((hashedPw) => {
                console.log("req.body", req.body);
                return db.addUser(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hashedPw
                );
            })
            .then((registrationReturn) => {
                req.session.userId = registrationReturn.rows[0].id;
                req.session.firstName = registrationReturn.rows[0].first;
                res.json({ success: true });
            })
            .catch((e) => {
                console.log("e: ", e);
                res.json(e);
            });
    }
});

router.post("/login", (req, res) => {
    if (!req.body.email || !req.body.pass || !req.body.email.includes("@")) {
        res.json({ success: false });
    } else {
        db.getPassword(req.body.email)
            .then((returnedPassword) => {
                const userId = returnedPassword.rows[0].id;
                const firstName = returnedPassword.rows[0].first;
                compare(req.body.pass, returnedPassword.rows[0].password)
                    .then((comparedValues) => {
                        if (comparedValues === true) {
                            req.session.userId = userId;
                            req.session.firstName = firstName;
                            res.json({ success: true });
                        } else {
                            res.json({ success: false });
                        }
                    })
                    .catch((e) => {
                        console.log("e: ", e);
                        res.json(e);
                    });
            })
            .catch((e) => {
                console.log("e: ", e);
                res.json(e);
            });
    }
});

// password reset post-routes

router.post("/password/reset/start", (req, res) => {
    if (!req.body.email || !req.body.email.includes("@")) {
        res.json({ success: false });
    } else {
        req.session.email = req.body.email;
        const secretCode = cryptoRandomString({ length: 6, });
        db.insertCode(req.body.email, secretCode)
            .then((returnedCode) => {
                let email = returnedCode.rows[0].email;
                let code = returnedCode.rows[0].code;
                ses.send(email, code);
            })
            .then(() => {
                res.json({ success: true });
            })
            .catch((e) => {
                res.json(e);
            });
    }
});

router.post("/password/reset/set", (req, res) => {
    if (!req.body.code || !req.body.pass) {
        res.json({ success: false });
    } else {
        db.checkCode(req.body.email)
            .then((codeCheck) => {
                let dbCode = codeCheck.rows[0].code;
                if (req.body.code === dbCode) {
                    hash(req.body.pass).then((newPassword) => {
                        return db
                            .changePassword(req.body.email, newPassword)
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((e) => {
                                res.json(e);
                            });
                    });
                } else {
                    res.json({ success: false });
                }
            })
            .catch((e) => res.json(e));
    }
});

module.exports = router; 
