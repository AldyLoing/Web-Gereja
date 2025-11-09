-- Migration: Rename column from headOfFamily to familyHead
-- This fixes the "familyHead does not exist" error

-- Check if old column exists and rename it
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'families' AND column_name = 'headOfFamily'
  ) THEN
    ALTER TABLE families RENAME COLUMN "headOfFamily" TO "familyHead";
    RAISE NOTICE 'Column renamed from headOfFamily to familyHead';
  END IF;
END $$;

-- Verify the change
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'families' 
  AND column_name IN ('familyHead', 'headOfFamily');
