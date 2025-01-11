function EmailChecker(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
    return emailRegex.test(email);
}
export default EmailChecker;