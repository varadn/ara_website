import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/utils/supabase/supabaseClient";
import { createClient } from '@/utils/supabase/server';
import { formatDateToSupabase } from '@/utils/dateHelpers';

export async function GET() {
    //Fetch user data from a database or external API
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        title,
        description,
        image,
        image_alt,
        date_created
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
                image_alt: image_alt || title,
                date_created: formatDateToSupabase(new Date())
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
        const { id, title, description, image, image_alt } = body;

        //Validates required fields
        if (!id || !title || !description) {
            return NextResponse.json(
                { message: 'ID, title, and description are required' },  
                { status: 400 }
            );
        }

        //Updates that project in the database
        const { data, error } = await supabase
            .from('projects')
            .update({
                title,
                description, 
                image: image || '',
                image_alt: image_alt || title
            })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error updating project:', error);
            return NextResponse.json(
                { message: error.message }, 
                { status: 400 }
            ); 
        }

        return NextResponse.json(
            { message: 'Project updated successfully', data: data }, 
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

        //Deletes that article from the database
        const { error } = await supabase
            .from('projects') 
            .delete()
            .eq('id', id); 

        if (error) {
            console.error('Error deleting project:', error);
            return NextResponse.json( 
                { message: error.message }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Project deleted successfully' }, 
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