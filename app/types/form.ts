export interface FormData {
    startup_name: string;
    founders: string;
    mission_statement: string;
    industry: string;
    product_or_service_description: string;
    current_revenue: string;
    funding_goal: string;
    market_opportunity: string;
    competitive_advantage: string;
    traction: string;
    team: string;
    current_investors: string;
    business_model: string;
    financial_projections: string;
    challenges: string;
    additional_details: string;
  }
  
  export interface ValidationErrors {
    [key: string]: string;
  }
  
  export function validateFormStep(data: Partial<FormData>, fields: string[]): ValidationErrors {
    const errors: ValidationErrors = {};
    
    // Only validate required fields
    const requiredFields = fields.filter(field => field !== 'additional_details');
    
    requiredFields.forEach(() => {
      // You can still add validation here if needed
      // For now, we'll accept any value since we'll replace empty ones with "Not specified"
    });
    
    return errors;
  }