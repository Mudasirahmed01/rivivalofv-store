import { useEffect, useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import BackendService from '../lib/backend';
import { supabase } from '../lib/supabaseClient';

interface ResetPasswordPageProps {
  onBackToSignIn: () => void;
}

export default function ResetPasswordPage({ onBackToSignIn }: ResetPasswordPageProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      setReady(Boolean(data.session) && !sessionError);
      if (sessionError || !data.session) setError('This reset link is invalid or expired. Request a new one and try again.');
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === 'PASSWORD_RECOVERY' || session) {
        setReady(true);
        setError('');
      }
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const result = await BackendService.updatePassword(password);
    setLoading(false);
    if (!result.success) {
      setError(result.message);
      return;
    }
    setMessage('Your password has been changed. You can now sign in with it.');
  };

  return <main className="grid min-h-screen place-items-center bg-[#FAFAFA] px-4 py-20">
    <section className="w-full max-w-md rounded-xl border border-black/5 bg-white p-7 shadow-sm md:p-9">
      <div className="mb-6 grid h-12 w-12 place-items-center rounded-lg bg-[#edf2ee] text-[#315b43]"><LockKeyhole size={21} /></div>
      <p className="text-xs font-bold uppercase tracking-wider text-[#68756c]">REVIVAL OF V</p>
      <h1 className="mt-2 text-2xl font-bold text-[#111]">Set a new password</h1>
      <p className="mt-2 text-sm text-[#6E6E73]">Choose a new password for your account.</p>
      {error && <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {message ? <div className="mt-5"><p role="status" className="text-sm text-green-700">{message}</p><button onClick={onBackToSignIn} className="mt-5 w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white">Back to sign in</button></div> : <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-[#222]">New password<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black" /></label>
        <label className="block text-sm font-medium text-[#222]">Confirm new password<input required minLength={8} type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black" /></label>
        <button disabled={!ready || loading} className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{loading ? 'Updating...' : 'Update password'}</button>
      </form>}
    </section>
  </main>;
}