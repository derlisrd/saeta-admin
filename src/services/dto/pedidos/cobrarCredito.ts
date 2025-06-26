export class CobrarCreditoResponse {
  success: boolean;
  status: number;
  results: CobrarCreditoResults;
  message: string;

  constructor({ success, status, results, message }: { success: boolean; status: number; results: CobrarCreditoResults; message: string }) {
    this.success = success;
    this.status = status;
    this.results = results;
    this.message = message;
  }
}

export class CobrarCreditoResults {
  credito_pagado: boolean;
  deuda_restante: number;

  constructor({ credito_pagado, deuda_restante }: { credito_pagado: boolean; deuda_restante: number }) {
    this.credito_pagado = credito_pagado;
    this.deuda_restante = deuda_restante;
  }
}