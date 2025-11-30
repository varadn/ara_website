import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/utils/supabase/supabaseClient";
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    const supabaseAuth = await createClient();

    const claims = await supabaseAuth.auth.getClaims();

    if (!claims.data) {
        return NextResponse.json(
            { message: 'You are not authorized to perform this action.' }, 
            { status: 403 }
        );
    }
    
    const { data, error } = await supabase
      .from('wikiArticles')
      .select('*')
      .order('id', { ascending: false });

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
        const { articleName, Content } = body;
        //Validate required fields
        if (!articleName || !Content) {
            return NextResponse.json(
                { message: 'articleName and Content are required' }, 
                { status: 400 }
            );
        }

        //Inserts the new wiki article into the database
        const { data, error } = await supabase
            .from('wikiArticles')
            .insert([{
                articleName,
                Content
            }])
            .select();

        if (error) {
            console.error('Error adding article:', error);
            return NextResponse.json(
                { message: error.message }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Article added successfully', data: data }, 
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
        const { id, articleName, Content } = body;

        //Validates required fields
        if (!id || !articleName || !Content) {
            return NextResponse.json(
                { message: 'ID, articleName, and Content are required' },  
                { status: 400 }
            );
        }

        //Updates that article in the database
        const { data, error } = await supabase
            .from('wikiArticles')
            .update({
                articleName, 
                Content
            })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error updating article:', error);
            return NextResponse.json(
                { message: error.message }, 
                { status: 400 }
            ); 
        }

        return NextResponse.json(
            { message: 'Article updated successfully', data: data }, 
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
            .from('wikiArticles') 
            .delete()
            .eq('id', id); 

        if (error) {
            console.error('Error deleting article:', error);
            return NextResponse.json( 
                { message: error.message }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Article deleted successfully' }, 
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