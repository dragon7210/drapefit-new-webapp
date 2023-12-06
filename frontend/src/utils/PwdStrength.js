import DFnewLogger from 'utils/DFnewLogger';
import value from 'assets/scss/_themes-vars.module.scss';

const hasNumber = (number) => new RegExp(/[0-9]/).test(number);
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

export const strengthColor = (count) => {
  try {
    if (count < 2) return { label: 'Poor', color: value.errorMain };
    if (count < 3) return { label: 'Weak', color: value.warningDark };
    if (count < 4) return { label: 'Normal', color: value.orangeMain };
    if (count < 5) return { label: 'Good', color: value.successMain };
    if (count < 6) return { label: 'Strong', color: value.successDark };
    return { label: 'Poor', color: value.errorMain };
  } catch (e) {
    DFnewLogger(e?.message);
    return null;
  }
};

export const strengthIndicator = (number) => {
  try {
    let strengths = 0;
    if (number.length > 5) strengths += 1;
    if (number.length > 7) strengths += 1;
    if (hasNumber(number)) strengths += 1;
    if (hasSpecial(number)) strengths += 1;
    if (hasMixed(number)) strengths += 1;
    return strengths;
  } catch (e) {
    DFnewLogger(e?.message);
    return null;
  }
};
