-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'HR', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleType" NOT NULL DEFAULT 'EMPLOYEE',
    "phone" TEXT,
    "department" TEXT,
    "designation" TEXT,
    "birthday" TIMESTAMP(3),
    "relationshipStatus" TEXT,
    "marriageDate" TIMESTAMP(3),
    "fatherName" TEXT,
    "motherName" TEXT,
    "spouseName" TEXT,
    "emergencyContact" TEXT,
    "childrenCount" INTEGER,
    "joiningDate" TIMESTAMP(3),
    "whatsappNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
