'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [msg, setMsg] = useState('');
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setMsg('Processing...');
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMsg('Account created. If email confirmation is enabled, check your inbox. Then Sign in.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMsg('Signed in! Redirecting...');
        router.replace('/dashboard');
      }
    } catch (err) {
      setMsg(err.message || String(err));
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '48px auto' }}>
      <h2>{mode === 'signup' ? 'Create account' : 'Sign in'}</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: '1px solid #2a3240', background: '#0f141b', color: 'white' }} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: '1px solid #2a3240', background: '#0f141b', color: 'white' }} required />
        <button type="submit" style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #2a3240', background: '#121820', color: 'white' }}>
          {mode === 'signup' ? 'Sign up' : 'Sign in'}
        </button>
        <button type="button" onClick={()=>setMode(mode==='signup'?'login':'signup')} style={{ background: 'transparent', color: '#9fb0c7' }}>
          {mode === 'signup' ? 'Have an account? Sign in' : "New here? Create an account"}
        </button>
      </form>
      <p style={{ marginTop: 12, minHeight: 24, color: '#9fb0c7' }}>{msg}</p>
    </div>
  );
}
