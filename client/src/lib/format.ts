/**
 * Utility Functions - Formatação e helpers
 */

/**
 * Formata valor em moeda brasileira
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formata volume em milhões/bilhões
 */
export function formatVolume(value: number): string {
  if (value >= 1e9) {
    return `R$ ${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `R$ ${(value / 1e6).toFixed(1)}M`;
  }
  return formatCurrency(value);
}

/**
 * Formata data e hora
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Formata apenas a hora
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Traduz status para português
 */
export function translateStatus(status: string): string {
  const translations: Record<string, string> = {
    APPROVED: 'Aprovado',
    PENDING: 'Pendente',
    REJECTED: 'Rejeitado',
  };
  return translations[status] || status;
}

/**
 * Retorna cor para status
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
}
