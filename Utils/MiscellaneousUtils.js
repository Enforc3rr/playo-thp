exports.isValidEmail = (email) => {
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email && email !== '' && email.match(emailFormat))
        return true;
    console.log(`Invalid Email Detected ${email}`);
    return false;
}