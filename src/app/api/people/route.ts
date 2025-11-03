import { NextResponse } from 'next/server';
import { supabase } from "@/utils/supabase/supabaseClient";

export async function GET() {
    // Fetch user data from a database or external API
    const { data, error } = await supabase
      .from('people')
      .select(`
        name,
        title,
        description,
        image,
        image_alt,
        website,
        active,
        projects ( title )
        `)

    if (error){
        console.log(error)
        return NextResponse.json({ message: error.message}, { status: 400})
    }
    else{  
        return NextResponse.json({ people: data }, { status: 200 });
    }
}