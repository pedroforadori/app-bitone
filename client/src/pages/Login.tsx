'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Phone, Shield, ArrowLeft, Sun, Moon } from 'lucide-react';
import { formatPhone, normalizePhone } from '@/utils/formatPhone';

export default function Login() {
  const { login, requestToken, tokenSent, phoneNumber, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [step, setStep] = useState<'phone' | 'token'>('phone');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');


  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const plainPhone = normalizePhone(phone);

    if (!plainPhone || plainPhone.length < 10) {
      setError('Digite um número de telefone válido');
      return;
    }

    const success = await requestToken(phone);
    if (success) {
      setStep('token');
    }
  };

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token || token.length !== 6) {
      setError('Digite um token válido de 6 dígitos');
      return;
    }

    const success = await login(phone, token);
    if (!success) {
      setError('Token inválido. Tente novamente.');
    }
  };

  const handleBack = () => {
    setStep('phone');
    setToken('');
    setError('');
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-4">
      {toggleTheme && (
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      )}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">BitOne Command Center</CardTitle>
          <CardDescription>
            {step === 'phone'
              ? 'Digite seu número de telefone para receber o código de acesso'
              : 'Digite o código de 6 dígitos enviado por SMS'
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Número do telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    inputMode="numeric"
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando código...
                  </>
                ) : (
                  'Enviar código por SMS'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Código de verificação
                </label>
                <Input
                  type="text"
                  placeholder="000000"
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground text-center">
                  Código enviado para {phoneNumber}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    'Verificar código'
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}