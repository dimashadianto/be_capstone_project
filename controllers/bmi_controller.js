exports.calculateBMI = (req, res) => {
  const { tinggi, berat } = req.body;

  // Validasi
  if (!tinggi || !berat) {
    return res.status(400).json({ message: 'Tinggi dan berat harus diisi' });
  }

  // Ubah tinggi ke meter
  const tinggiMeter = tinggi / 100;

  // Hitung BMI
  const bmi = berat / (tinggiMeter * tinggiMeter);

  // Kategori BMI
  let category = '';
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  // Rentang berat sehat
  const minWeight = 18.5 * (tinggiMeter ** 2);
  const maxWeight = 24.9 * (tinggiMeter ** 2);

  // Ponderal Index
  const ponderalIndex = berat / (tinggiMeter ** 3);

  res.json({
    bmi: parseFloat(bmi.toFixed(1)),
    category,
    healthy_bmi_range: "18.5 - 24.9 kg/m²",
    healthy_weight_range: `${minWeight.toFixed(1)} kg - ${maxWeight.toFixed(1)} kg`,
    ponderal_index: `${ponderalIndex.toFixed(1)} kg/m³`,
  });
};