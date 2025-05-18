export const calculateBMI = (req, res) => {
    const { age, gender, height, weight } = req.body;
  
    const heightInMeters = height / 100;
    const bmi = +(weight / (heightInMeters ** 2)).toFixed(1);
  
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obese';
  
    const healthyMin = +(18.5 * heightInMeters ** 2).toFixed(1);
    const healthyMax = +(24.9 * heightInMeters ** 2).toFixed(1);
    const ponderalIndex = +(weight / (heightInMeters ** 3)).toFixed(1);
  
    res.json({
      bmi,
      category,
      healthy_bmi_range: '18.5 - 24.9 kg/m²',
      healthy_weight_range: `${healthyMin} kg - ${healthyMax} kg`,
      ponderal_index: `${ponderalIndex} kg/m³`
    });
};