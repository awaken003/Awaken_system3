'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Page() {
  const router = useRouter();
  async function go() {
    const { data: { user } } = await supabase.auth.getUser();
    router.push(user ? '/dashboard' : '/login');
  }
  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 48, margin: 0 }}>AWAKEN</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>The Real-Life Solo Leveling System</p>
        <button onClick={go} style={{ marginTop: 24, padding: '10px 16px', borderRadius: 8, border: '1px solid #2a3240', background: '#121820', color: 'white' }}>Enter</button>
        <p style={{ marginTop: 16 }}>
          <Link href="/login">Or Sign in / Sign up</Link>
        </p>
      </div>
    </main>
  );
}
