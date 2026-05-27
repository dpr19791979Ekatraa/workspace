-- CreateEnum
CREATE TYPE "PolicyCategory" AS ENUM ('CODE_OF_CONDUCT', 'LEAVE_POLICY', 'ATTENDANCE_WORKING_HOURS', 'IT_DATA_SECURITY', 'ANTI_HARASSMENT', 'TRAVEL_EXPENSE', 'EMPLOYEE_REFERRAL', 'INSURANCE');

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "PolicyCategory" NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
