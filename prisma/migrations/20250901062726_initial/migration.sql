-- CreateTable
CREATE TABLE "public"."booking" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sample" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "sample_pkey" PRIMARY KEY ("id")
);
