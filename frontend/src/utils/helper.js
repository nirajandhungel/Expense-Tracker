export const isEmailValid=(email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

};
export const isPasswordValid=(password)=>{
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};
export const doPasswordsMatch=(password,confirmPassword)=>{
    return password === confirmPassword;
}
