import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/utils/supabase/supabaseClient";

export async function DELETE(request: NextRequest) {
    try {
        console.log('DELETE request received');
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        console.log('Attempting to delete news article with ID:', id);

        if (!id) {
            console.error('No ID provided in request');
            return NextResponse.json(
                { message: 'News ID is required' },
                { status: 400 }
            );
        }

        // Use the server-side Supabase client
        const { error } = await supabase
            .from('news')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Supabase delete error:', error);
            return NextResponse.json(
                { message: `Delete failed: ${error.message}`, details: error },
                { status: 400 }
            );
        }

        console.log('News article deleted successfully');
        return NextResponse.json(
            { message: 'News article deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Server error:', error);
        return NextResponse.json(
            { message: `Server error: ${error.message}`, stack: error.stack },
            { status: 500 }
        );
    }
}

export async function GET() {
    // Fetch user data from a database or external API
    const { data, error } = await supabase
      .from('news')
      .select(`
        id,
        title,
        date,
        location,
        image,
        image_alt,
        description,
        people ( name )
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