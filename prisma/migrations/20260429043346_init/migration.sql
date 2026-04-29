-- CreateTable
CREATE TABLE "checklistitems" (
    "id" SERIAL NOT NULL,
    "propertyid" INTEGER NOT NULL,
    "taskdescription" TEXT NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "checklistitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklistsubmissions" (
    "id" SERIAL NOT NULL,
    "timesheetid" INTEGER NOT NULL,
    "checklistitemid" INTEGER NOT NULL,
    "photourl" TEXT NOT NULL,
    "completedat" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "checklistsubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "starttime" VARCHAR(50),

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheets" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "propertyid" INTEGER NOT NULL,
    "clockedin" TIMESTAMP(6) NOT NULL,
    "clockedout" TIMESTAMP(6),

    CONSTRAINT "timesheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'password',
    "phonenumber" VARCHAR(50),
    "role" VARCHAR(50) NOT NULL DEFAULT 'PORTER',
    "schedule" JSONB,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "checklistitems" ADD CONSTRAINT "fk_checklistitem_property" FOREIGN KEY ("propertyid") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "checklistsubmissions" ADD CONSTRAINT "fk_submission_checklistitem" FOREIGN KEY ("checklistitemid") REFERENCES "checklistitems"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "checklistsubmissions" ADD CONSTRAINT "fk_submission_timesheet" FOREIGN KEY ("timesheetid") REFERENCES "timesheets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "fk_timesheet_property" FOREIGN KEY ("propertyid") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "fk_timesheet_user" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
