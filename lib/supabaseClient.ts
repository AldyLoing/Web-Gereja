import { createClient } from "@supabase/supabase-js";

// Validate environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type-safe database types (optional, can be generated from Supabase)
export type Database = {
  public: {
    Tables: {
      members: {
        Row: {
          id: string;
          nik: string;
          kk: string;
          name: string;
          birthPlace: string;
          birthDate: Date;
          maritalStatus: string;
          occupation: string | null;
          familyId: string;
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date | null;
        };
        Insert: Omit<Database["public"]["Tables"]["members"]["Row"], "id" | "createdAt" | "updatedAt">;
        Update: Partial<Database["public"]["Tables"]["members"]["Insert"]>;
      };
      families: {
        Row: {
          id: string;
          headOfFamily: string;
          address: string;
          totalMember: number;
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date | null;
        };
        Insert: Omit<Database["public"]["Tables"]["families"]["Row"], "id" | "createdAt" | "updatedAt">;
        Update: Partial<Database["public"]["Tables"]["families"]["Insert"]>;
      };
      // Add other tables as needed
    };
  };
};
