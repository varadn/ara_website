import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/supabaseClient';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    // Fetch user data from a database or external API
    const { data, error } = await supabase
      .from('news')
      .select(`
        title,
        date,
        location,
        image,
        image_alt,
        description
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
        const supabaseAuth = await createClient();

        const claims = await supabaseAuth.auth.getClaims();

        if (!claims.data) {
            return NextResponse.json(
                { message: 'You are not authorized to perform this action.' }, 
                { status: 403 }
            );
        }

        const body = await request.json();
        
        const { title, date, location, image, image_alt, description } = body;

        // Validate required fields
        if (!title || !date || !description) {
        return NextResponse.json(
            { message: 'Title, date, and description are required' }, 
            { status: 400 }
        );
        }

        // Insert the new news article into the database
        const { data, error } = await supabase
        .from('news')
        .insert([{
            title,
            date,
            location: location || '',
            image: image || '',
            image_alt: image_alt || title,
            description
        }])
        .select();

        if (error) {
            console.error('Error adding news article:', error);
            return NextResponse.json(
                { message: error.message }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'News article added successfully', data: data }, 
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