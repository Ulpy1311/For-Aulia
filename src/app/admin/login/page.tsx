'use client';

import { SignInPage } from '@/components/ui/sign-in';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AdminLoginPage() {
    const router = useRouter();

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success('Login successful, redirecting...');
                router.push('/admin');
                router.refresh();
            } else {
                throw new Error(data.error || 'Invalid credentials');
            }
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "An error occurred");
            throw error;
        }
    };

    return (
        <SignInPage
            title={<span className="font-serif tracking-tight text-foreground">Admin Portal</span>}
            description="Access control for managing memories and site configurations securely."
            heroImageSrc="https://cdn.cosmos.so/8b0252bd-cb64-45f4-aef8-672c7f628f76?format=jpeg"
            onSignIn={handleSignIn}
        />
    );
}
