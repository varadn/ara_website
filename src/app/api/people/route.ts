import { NextRequest, NextResponse } from 'next/server';
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
        return NextResponse.json({ data: data }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, title, description, image, image_alt, website, active } = body;

        //Validate required fields
        if (!name || !title) {
            return NextResponse.json(
                { message: 'Name and title are required' }, 
                { status: 400 }
            );
        }

        //Inserts the new person into the database
        const { data, error } = await supabase
            .from('people')
            .insert([{
                name,
                title,
                description: description || '',
                image: image || '',
                image_alt: image_alt || name,
                website: website || '',
                active: active !== undefined ? active : true
            }])
            .select();

        if (error) {
            console.error('Error adding person:', error);
            return NextResponse.json(
                { message: error.message }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Person added successfully', data: data }, 
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Server error:', error);
        return NextResponse.json(
            { message: 'Internal server error' }, 
            { status: 500 }
        );
    }
}