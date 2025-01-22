type ValidationRule = {
    rule: (value: any) => boolean;
    message: string;
  };
  
  export class Validator {
    private rules: Record<string, ValidationRule[]> = {};
  
    // Agregar reglas de validación para un campo específico
    addRule(field: string, rule: (value: any) => boolean, message: string) {
      if (!this.rules[field]) {
        this.rules[field] = [];
      }
      this.rules[field].push({ rule, message });
    }
  
    // Validar todos los campos según las reglas establecidas
    validate(formData: Record<string, any>): Record<string, string> {
      const errors: Record<string, string> = {};
  
      for (const field in this.rules) {
        for (const { rule, message } of this.rules[field]) {
          if (!rule(formData[field])) {
            errors[field] = message;
            break; // Solo mostramos el primer error por campo
          }
        }
      }
  
      return errors;
    }
  }
  