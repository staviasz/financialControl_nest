import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({
  name: 'isNotStringWithDigitOrSpecialChars',
  async: false,
})
export class IsNotStringWithDigitOrSpecialCharsConstraint {
  validate(value: string) {
    return /^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$/.test(value);
  }

  defaultMessage(validationArguments?: any) {
    return `The ${validationArguments.property} must not contain digits or special characters`;
  }
}

export function IsNotStringWithDigitOrSpecialChars(
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsNotStringWithDigitOrSpecialCharsConstraint, validationOptions)(
      object,
      property,
    );
  };
}
