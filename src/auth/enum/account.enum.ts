export enum AccountEncodePass {
  BCRYPT = 'BCRYPT',
  ARGON2 = 'ARGON2',
}

export enum AccountRole {
  SUPERADMIN = 'SUPERADMIN',
  MOD = 'MOD',
  USER = 'USER',
}

export enum AccountValidationStatus {
  DEFAULT = 0,
  SUCCESS = 1,
  FAILED = 2,
  PENDING = 3,
}

// export default AccountEncodePass;
