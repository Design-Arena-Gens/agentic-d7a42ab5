import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Using browser's built-in Web Speech API via a fallback
    // Since we can't use ElevenLabs without API key, we'll use a different approach
    // We'll use a public TTS API that supports Indian voices

    // Option 1: Use Google Cloud TTS (requires API key)
    // Option 2: Use Microsoft Azure TTS (requires API key)
    // Option 3: Use browser's speechSynthesis (client-side only)
    // Option 4: Use a free TTS service

    // For this implementation, we'll use a workaround with ResponsiveVoice or similar
    // But since server-side TTS needs API keys, we'll create a demo response

    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB', {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY || 'demo_key',
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      // Fallback: Return error with instructions
      return NextResponse.json(
        {
          error: 'Voice generation service unavailable. Please add ELEVENLABS_API_KEY to environment variables.',
          fallback: true
        },
        { status: 503 }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error: any) {
    console.error('Error generating voice:', error);
    return NextResponse.json(
      { error: 'Failed to generate voice. Please configure API credentials.' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
