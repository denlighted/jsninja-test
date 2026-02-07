-- CreateTable
CREATE TABLE "super_heroes" (
    "id" TEXT NOT NULL,
    "nick_name" TEXT NOT NULL,
    "real_name" TEXT NOT NULL,
    "original_description" TEXT,
    "super_powers" TEXT NOT NULL,
    "catch_phrase" TEXT,
    "images" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "super_heroes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "super_heroes_nick_name_key" ON "super_heroes"("nick_name");
