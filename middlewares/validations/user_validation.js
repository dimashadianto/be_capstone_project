const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

const validateEmail = (req, res, next) => {
    const { email } = req.body;
    
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Format email tidak valid' });
    }

    next();
};

const validatePhoneNumber = (req, res, next) => {
    const { phone } = req.body;
    
    if (!/^\d+$/.test(phone)) {
        return res.status(400).json({ message: 'Nomor telepon harus berupa angka' });
    }
    next();
};

const validatePassword = (req, res, next) => {
    const { password, confirmPassword } = req.body;
    
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Format kata sandi tidak valid' });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Konfirmasi kata sandi tidak cocok' });
    }
    
    next();
};

const validateFields = (req, res, next) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }
    
    next();
};

module.exports = {
    validateEmail,
    validatePhoneNumber,
    validatePassword,
    validateFields
};