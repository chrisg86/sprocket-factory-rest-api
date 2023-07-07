export interface SprocketFactoryResponse {
  factory: {
    chart_data: {
      sprocket_production_actual: number[];
      sprocket_production_goal: number[];
      time: number[];
    };
  };
}

export interface ErrorEnvelope {
  error: any;
}

export interface ValidationErrorEnvelope {
  error: {
    validation: any;
  };
}
