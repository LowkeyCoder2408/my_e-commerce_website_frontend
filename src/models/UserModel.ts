import AuthenticationType from './AuthenticationType';

class UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photo: string;
  verificationCode: string;
  resetPasswordToken: string;
  createdTime: Date;
  enabled: boolean;
  roles: string[];
  authenticationType: AuthenticationType;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    photo: string,
    verificationCode: string,
    resetPasswordToken: string,
    createdTime: Date,
    enabled: boolean,
    roles: string[],
    authenticationType: AuthenticationType,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.photo = photo;
    this.verificationCode = verificationCode;
    this.resetPasswordToken = resetPasswordToken;
    this.createdTime = createdTime;
    this.enabled = enabled;
    this.roles = roles;
    this.authenticationType = authenticationType;
  }
}

export default UserModel;
