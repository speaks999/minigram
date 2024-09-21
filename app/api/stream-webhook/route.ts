import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const body = await req.json();
console.log('body from webhook', body);
    // Extract relevant data from the webhook payload
    const { type, user } = body;

    if (type === 'user.unread_message_reminder') {
        const supabase = createServerComponentClient({ cookies });
        
        // Extract the channel ID from the webhook payload
        const channelId = Object.keys(body.channels)[0];
        console.log('Extracted channel ID:', channelId);

        // If you need just the numeric part, you can further process it
        const chatId = channelId.split('-')[1];
        console.log('Extracted chat ID:', chatId);
        const { data, error } = await supabase
            .from('notifications')
            .insert({
                user_id: user.id,
                message: `You have unread messages in chat ${chatId}`,
                read: false
            });

        if (error) {
            console.error('Error inserting notification:', error);
        }
    }

    // Return a success response
    return NextResponse.json({ success: true, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Error processing Stream webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}