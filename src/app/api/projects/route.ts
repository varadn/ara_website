import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/utils/supabase/supabaseClient";
import { createClient } from '@/utils/supabase/server';
import { PostAction } from '@/utils/types';

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
        const supabaseAuth = await createClient();

        const claims = await supabaseAuth.auth.getClaims();

        if (!claims.data) {
            return NextResponse.json(
                { message: 'You are not authorized to perform this action.' }, 
                { status: 403 }
            );
        }

        const body = await request.json();
        
        const { action } = body;

        let response;
        
        switch(action) {
            case PostAction.Create:
                response = await createProject(body);
                break;
            case PostAction.Update:
                response = await updateProject(body);
                break;
            case PostAction.Delete:
                response = await deleteProject(body);
                break;
            default:
                response = NextResponse.json(
                            { message: 'Unknown POST action.' }, 
                            { status: 400 }
                        );
        }
        return response;


    } catch (error: any) {
        console.error('Server error:', error);
        return NextResponse.json( 
            { message: 'Internal server error' },  
            { status: 500 }
        );
    }
}

async function createProject(body: any){
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
}

async function updateProject(body: any){
    return NextResponse.json(
        { message: 'project update not implemented' }, 
        { status: 501 }
    )
}

async function deleteProject(body: any){
    return NextResponse.json(
        { message: 'project delete not implemented' }, 
        { status: 501 }
    )
}