import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint()
export class IsCompletelyNameConstraint {
  validate(name: string) {
    const splitName = name.trim().split(' ');
    if (splitName.length < 2 || splitName.some(value => value.length < 3)) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'The name should be completely, not used abreviation';
  }
}

export function IsCompletelyName(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    Validate(IsCompletelyNameConstraint, validationOptions)(
      object,
      propertyName,
    );
  };
}
