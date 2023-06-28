-- CreateTable
CREATE TABLE `ClientAccount` (
    `AccountId` VARCHAR(191) NOT NULL,
    `LoginName` VARCHAR(191) NOT NULL,
    `FirstName` VARCHAR(191) NULL,
    `LastName` VARCHAR(191) NULL,
    `Description` VARCHAR(191) NULL,
    `RoleId` ENUM('SUPERADMIN', 'MOD', 'USER') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ClientAccount_AccountId_key`(`AccountId`),
    UNIQUE INDEX `ClientAccount_LoginName_key`(`LoginName`),
    PRIMARY KEY (`AccountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientLogin` (
    `AccountId` VARCHAR(191) NOT NULL,
    `LoginName` VARCHAR(191) NOT NULL,
    `PasswordHash` VARCHAR(191) NOT NULL,
    `PasswordSalt` INTEGER NOT NULL,
    `EmailAddress` VARCHAR(191) NOT NULL,
    `HashAlgorithmId` ENUM('BCRYPT', 'ARGON2') NOT NULL,
    `AccessToken` VARCHAR(191) NULL,
    `RefreshToken` VARCHAR(191) NULL,
    `ConfirmationToken` VARCHAR(191) NULL,
    `TokenGenerationTime` DATETIME(3) NULL,
    `EmailValidationStatusId` INTEGER NULL,
    `PasswordRecoveryToken` VARCHAR(191) NULL,
    `RecoveryTokenTime` DATETIME(3) NULL,

    UNIQUE INDEX `ClientLogin_LoginName_key`(`LoginName`),
    UNIQUE INDEX `ClientLogin_EmailAddress_key`(`EmailAddress`),
    PRIMARY KEY (`AccountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
