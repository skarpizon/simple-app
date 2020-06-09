
const requiredValidator = (value) => {
  if (!value) return 'Обязательно для заполнения';
  return null;
};

const strLengthValidator = (value, count = 3) => {
  if (!value || value.length < count) return `Минимум ${count} символов`;
  return null;
};



export {
  requiredValidator,
  strLengthValidator,
}
