import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/utils/supabase/supabaseClient";

export async function GET() {
    //Fetch user data from a database or external API
    const { data, error } = await supabase
      .from('projects')
      .select(`
        title,
        description,
        image,
        image_alt
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
        const { title, description, image, image_alt } = body;

            //validates required fields
            if (!title || !description) {  
                return NextResponse.json(
                    { message: 'Title and description are required' }, 
                    { status: 400 }
                );
            }

    //Inserts the new project into the database :)
    const { data, error } = await supabase
        .from('projects') 
        .insert([{
            title,
            description, 
            image: image || '',
            image_alt: image_alt || title
        }])
        .select();

        if (error) {
            console.error('Error adding project:', error);
            return NextResponse.json(
                { message: error.message }, 
                { status: 400 }
            );
        }

    return NextResponse.json(
        { message: 'Project added successfully', data: data }, 
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
