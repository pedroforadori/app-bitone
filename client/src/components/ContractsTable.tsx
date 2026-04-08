/**
 * Contracts Table Component
 * Tabela de contratos com filtros, busca e drawer de detalhes
 */

'use client';

import { useState, useMemo } from 'react';
import { Contract, ContractStatus } from '@/lib/types';
import { formatCurrency, formatDateTime, translateStatus, getStatusColor } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

interface ContractsTableProps {
  contracts: Contract[];
  isLoading?: boolean;
}

const ITEMS_PER_PAGE = 10;

export function ContractsTable({ contracts, isLoading = false }: ContractsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContractStatus | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filtra contratos
  const filteredContracts = useMemo(() => {
    if (!searchTerm && statusFilter === 'ALL') {
      return contracts;
    }

    return contracts.filter((contract) => {
      const searchLower = searchTerm.toLowerCase().trim();
      
      const matchesSearch = !searchTerm || 
        (contract.id && contract.id.toLowerCase().includes(searchLower)) ||
        (contract.customerName && contract.customerName.toLowerCase().includes(searchLower)) ||
        (contract.bankName && contract.bankName.toLowerCase().includes(searchLower));

      const matchesStatus = statusFilter === 'ALL' || contract.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contracts, searchTerm, statusFilter]);

  // Paginação
  const totalPages = Math.ceil(filteredContracts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedContracts = filteredContracts.slice(startIndex, endIndex);

  const handleRowClick = (contract: Contract) => {
    setSelectedContract(contract);
    setIsDrawerOpen(true);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="p-6">
        {/* Filtros */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:gap-3 flex-1">
            <Input
              placeholder="Buscar por ID, cliente ou banco..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="md:flex-1"
            />
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value as ContractStatus | 'ALL');
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos os Status</SelectItem>
                <SelectItem value="APPROVED">Aprovado</SelectItem>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="REJECTED">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">ID</th>
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Cliente</th>
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Banco</th>
                <th className="px-6 py-3 text-right font-semibold text-muted-foreground">Valor</th>
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Data/Hora</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    Carregando contratos...
                  </td>
                </tr>
              ) : paginatedContracts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    Nenhum contrato encontrado
                  </td>
                </tr>
              ) : (
                paginatedContracts.map((contract) => (
                  <tr
                    key={contract.id}
                    onClick={() => handleRowClick(contract)}
                    className="border-b border-border hover:bg-muted cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-primary">{contract.id}</td>
                    <td className="px-6 py-4 text-foreground">{contract.customerName}</td>
                    <td className="px-6 py-4 text-muted-foreground">{contract.bankName}</td>
                    <td className="px-6 py-4 text-right font-semibold text-foreground">
                      {formatCurrency(contract.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(contract.status)}>
                        {translateStatus(contract.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      {formatDateTime(contract.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {paginatedContracts.length > 0 ? startIndex + 1 : 0} a{' '}
            {Math.min(endIndex, filteredContracts.length)} de {filteredContracts.length} contratos
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 px-3 text-sm font-medium">
              Página {currentPage} de {totalPages || 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Drawer de Detalhes */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:w-96 overflow-y-auto px-3">
          {selectedContract && (
            <>
              <SheetHeader>
                <SheetTitle className="text-xl">Detalhes do Contrato</SheetTitle>
                <SheetDescription>{selectedContract.id}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Informações Básicas */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Informações Básicas</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID do Contrato:</span>
                      <span className="font-mono font-semibold text-primary">
                        {selectedContract.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cliente:</span>
                      <span className="font-semibold text-foreground">
                        {selectedContract.customerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Banco:</span>
                      <span className="font-semibold text-foreground">
                        {selectedContract.bankName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(selectedContract.amount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Status</h3>
                  <Badge className={`${getStatusColor(selectedContract.status)} text-base px-3 py-1`}>
                    {translateStatus(selectedContract.status)}
                  </Badge>
                </div>

                {/* Data */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Data e Hora</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(selectedContract.createdAt)}
                  </p>
                </div>

                {/* Erro (se houver) */}
                {selectedContract.status === 'REJECTED' && selectedContract.errorCode && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-900 dark:text-red-200 mb-1">Erro Detectado</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                          <span className="font-mono font-semibold">{selectedContract.errorCode}</span>
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          {selectedContract.errorMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ações */}
                <div className="pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
