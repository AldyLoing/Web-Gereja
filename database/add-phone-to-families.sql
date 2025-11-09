-- Add phone column to families table
-- Execute this in Supabase SQL Editor

DO $$ 
BEGIN
  -- Check if column doesn't exist before adding
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'families' AND column_name = 'phone'
  ) THEN
    ALTER TABLE families ADD COLUMN phone VARCHAR(20);
    RAISE NOTICE 'Column phone added to families table';
  ELSE
    RAISE NOTICE 'Column phone already exists';
  END IF;
END $$;

-- Verify the change
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'families' 
ORDER BY ordinal_position;
