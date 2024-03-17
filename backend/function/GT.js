function BMI_calculator(height, weight) {
  let meterHeight = height / 100;
  const squarOfHeight = meterHeight * meterHeight;
  const bmi = (weight / squarOfHeight).toFixed(2);

  return bmi;
}

module.exports = { BMI_calculator };
