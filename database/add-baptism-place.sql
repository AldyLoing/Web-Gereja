-- ============================================
-- ADD MISSING COLUMN: baptismPlace
-- ============================================

ALTER TABLE "baptisms" 
ADD COLUMN IF NOT EXISTS "baptismPlace" TEXT;

-- Verify column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'baptisms'
ORDER BY ordinal_position;
