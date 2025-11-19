import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/utils/supabase/supabaseClient";
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    // Fetch user data from a database or external API
    const { data, error } = await supabase
      .from('people')
      .select(`
        id,
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
        const supabaseAuth = await createClient();

        const claims = await supabaseAuth.auth.getClaims();

        if (!claims.data) {
            return NextResponse.json(
                { message: 'You are not authorized to perform this action.' }, 
                { status: 403 }
            );
        }

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

export async function PUT(request: NextRequest) {
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
        const { id, name, title, description, image, image_alt, website, active } = body;

        //Validates required fields
        if (!id || !name || !title) {
            return NextResponse.json(
                { message: 'ID, name, and title are required' },  
                { status: 400 }
            );
        }

        //Updates that person in the database
        const { data, error } = await supabase
            .from('people')
            .update({
                name, 
                title,
                description: description || '',
                image: image || '',
                image_alt: image_alt || name,
                website: website || '',
                active: active !== undefined ? active : true
            })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error updating person:', error);
            return NextResponse.json(
                { message: error.message }, 
                { status: 400 }
            ); 
        }

        return NextResponse.json(
            { message: 'Person updated successfully', data: data }, 
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Server error:', error);
        return NextResponse.json(
            { message: 'Internal server error' }, 
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const supabaseAuth = await createClient();

        const claims = await supabaseAuth.auth.getClaims();

        if (!claims.data) {
            return NextResponse.json(
                { message: 'You are not authorized to perform this action.' }, 
                { status: 403 }
            );
        }
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { message: 'ID is required' }, 
                { status: 400 }
            );
        }

        //Deletes that person from the database
        const { error } = await supabase
            .from('people') 
            .delete()
            .eq('id', id); 

        if (error) {
            console.error('Error deleting person:', error);
            return NextResponse.json( 
                { message: error.message }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Person deleted successfully' }, 
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Server error:', error);
        return NextResponse.json(
            { message: 'Internal server error' }, 
            { status: 500 }
        );
    }
}