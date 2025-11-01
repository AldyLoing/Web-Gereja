import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

/**
 * Test Database Connection
 * 
 * This endpoint tests the Supabase connection by querying the members table.
 * Access at: https://<your-domain>/api/test-db
 */
export async function GET() {
  try {
    // Test 1: Check if Supabase client is initialized
    if (!supabase) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Supabase client not initialized" 
        },
        { status: 500 }
      );
    }

    // Test 2: Query members table (limit 1)
    const { data: members, error: membersError } = await supabase
      .from("members")
      .select("*")
      .limit(1);

    if (membersError) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to query members table",
          details: membersError.message,
          hint: membersError.hint || "Check if the table exists and has proper RLS policies",
        },
        { status: 500 }
      );
    }

    // Test 3: Query families table (limit 1)
    const { data: families, error: familiesError } = await supabase
      .from("families")
      .select("*")
      .limit(1);

    if (familiesError) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to query families table",
          details: familiesError.message,
          hint: familiesError.hint || "Check if the table exists and has proper RLS policies",
        },
        { status: 500 }
      );
    }

    // Test 4: Count total records
    const { count: memberCount } = await supabase
      .from("members")
      .select("*", { count: "exact", head: true });

    const { count: familyCount } = await supabase
      .from("families")
      .select("*", { count: "exact", head: true });

    // Success response
    return NextResponse.json({
      success: true,
      message: "Database connection successful! ✅",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: {
        url: process.env.SUPABASE_URL?.replace(/https?:\/\//, ""),
        connected: true,
      },
      tables: {
        members: {
          exists: true,
          sampleData: members?.[0] || null,
          totalRecords: memberCount || 0,
        },
        families: {
          exists: true,
          sampleData: families?.[0] || null,
          totalRecords: familyCount || 0,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected error occurred",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
