const calculateCalorie = (req, res) => {
    const { usia, gender, tinggi, berat } = req.body;
  
    let bmr;
    if (gender === 'male') {
      bmr = 10 * berat + 6.25 * tinggi - 5 * usia + 5;
    }
    else {
      bmr = 10 * berat + 6.25 * tinggi - 5 * usia - 161;
    }
  
    res.json({
      bmr: Math.round(bmr)
    });
};

module.exports = {
  calculateCalorie,
};