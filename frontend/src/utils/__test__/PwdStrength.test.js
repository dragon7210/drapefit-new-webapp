import { expect } from 'chai';

import { strengthColor, strengthIndicator } from 'utils/PwdStrength';
import value from 'assets/scss/_themes-vars.module.scss';

describe('strengthIndicator', () => {
  describe('hasNumber', () => {
    it('should return true if the number contains a digit', () => {
      expect(hasNumber('123')).toBeTruthy();
    });

    it('should return false if the number does not contain a digit', () => {
      expect(hasNumber('abc')).toBeFalsy();
    });
  });

  describe('hasMixed', () => {
    it('should return true if the number contains both lowercase and uppercase letters', () => {
      expect(hasMixed('aBc')).toBeTruthy();
    });

    it('should return false if the number does not contain both lowercase and uppercase letters', () => {
      expect(hasMixed('ABC')).toBeFalsy();
    });
  });

  describe('hasSpecial', () => {
    it('should return true if the number contains special characters', () => {
      expect(hasSpecial('!#@$%^&*)(+=._-')).toBeTruthy();
    });

    it('should return false if the number does not contain special characters', () => {
      expect(hasSpecial('abc123')).toBeFalsy();
    });
  });

  describe('strengthColor', () => {
    it('should return an object with label Poor and color errorMain when count is less than 2', () => {
      expect(strengthColor(1)).toEqual({
        label: 'Poor',
        color: value.errorMain
      });
    });

    it('should return an object with label Weak and color warningDark when count is between 2 and 3', () => {
      expect(strengthColor(2)).toEqual({
        label: 'Weak',
        color: value.warningDark
      });
    });

    it('should return an object with label Normal and color orangeMain when count is between 3 and 4', () => {
      expect(strengthColor(3)).toEqual({
        label: 'Normal',
        color: value.orangeMain
      });
    });

    it('should return an object with label Good and color successMain when count is between 4 and 5', () => {
      expect(strengthColor(4)).toEqual({
        label: 'Good',
        color: value.successMain
      });
    });

    it('should return an object with label Strong and color successDark when count is between 5 and 6', () => {
      expect(strengthColor(5)).toEqual({
        label: 'Strong',
        color: value.successDark
      });
    });

    it('should return an object with label Poor and color errorMain when count is greater than 6', () => {
      expect(strengthColor(6)).toEqual({
        label: 'Poor',
        color: value.errorMain
      });
    });
  });

  describe('strengthIndicator', () => {
    it('should return 0 if the number length is less than 5', () => {
      expect(strengthIndicator('1234')).toBe(0);
    });

    it('should return 1 if the number length is greater than 5', () => {
      expect(strengthIndicator('12345')).toBe(1);
    });

    it('should return 2 if the number length is greater than 7', () => {
      expect(strengthIndicator('1234567')).toBe(2);
    });

    it('should return 3 if the number contains a digit', () => {
      expect(strengthIndicator('abc123')).toBe(3);
    });

    it('should return 4 if the number contains special characters', () => {
      expect(strengthIndicator('!#@$%^&*)(+=._-')).toBe(4);
    });

    it('should return 5 if the number contains both lowercase and uppercase letters', () => {
      expect(strengthIndicator('aBc')).toBe(5);
    });
  });
});
