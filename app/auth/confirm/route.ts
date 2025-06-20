import { type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/confirm'

  if (code) {
    // CORRECTION ICI : AJOUT DE 'await' devant createClient()
    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      redirect(`${next}?success=true`)
    } else {
      redirect(`/error?message=${encodeURIComponent(error.message)}`)
    }
  } else {
    redirect('/error?message=Invalid or missing confirmation code.')
  }
}


