export const calculateCalorie = (req, res) => {
    const { age, gender, height, weight } = req.body;
  
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    res.json({
      bmr: Math.round(bmr)
    });
};