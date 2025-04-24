export interface DomainCheckResponse {
  available: boolean;
  error?: string;
}

export interface NamecheapResponse {
  ApiResponse: {
    Status: string;
    Errors?: {
      Error: {
        _attributes: {
          Number: string;
          Message: string;
        };
      }[];
    };
    CommandResponse?: {
      DomainCheckResult: {
        _attributes: {
          Domain: string;
          Available: string;
        };
      }[];
    };
  };
}