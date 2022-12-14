router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        console.log('invalid email or password');
        return res.status(400).send(error.details[0].message);
    }

    let adminUser = await AdminUser.findOne({
        adminUserEmail: req.body.email
    });
    if (!adminUser) {
        console.log('invalid email or password');
        return res.status(400).send("Invalid email or password.");
    }
    if (!adminUser.adminUserStatus) {
        console.log('invalid user');
        return res.status(400).send("Sorry! you cannot login as admin has made you inactive.");
    }


    let validPassword = await bcrypt.compare(
        req.body.password,
        adminUser.password
    );

    if (!validPassword) {
        console.log('invalid email or password', validPassword);
        return res.status(400).send("Invalid email or password.");
    }

    const token = adminUser.generateAuthToken();

    res.header("x-auth-token", token).send(
        _.pick(adminUser, ["_id", "firstName", "lastName", "adminUserEmail", "mobilePhone", "isSuperAdmin", "adminUserStatus", "profilePicture"])

    );
});
