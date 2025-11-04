import { NextResponse } from 'next/server';
import { supabase } from "@/utils/supabase/supabaseClient";

export async function GET() {
    // Fetch user data from a database or external API
    const { data, error } = await supabase
      .from('projects')
      .select(`
        title,
        description,
        image,
        image_alt,
        date,
        `)

    if (error){
        console.log(error)
        return NextResponse.json({ message: error.message}, { status: 400})
    }
    else{  
        return NextResponse.json({ data: data }, { status: 200 });
    }
}