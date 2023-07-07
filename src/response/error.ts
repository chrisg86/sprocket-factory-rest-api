import { type ValidationErrorEnvelope, type ErrorEnvelope } from '../types';

export const errorEnvelope = (data: any): ErrorEnvelope => {
  return {
    error: data,
  };
};

export const validationEnvelope = (data: any): ValidationErrorEnvelope => {
  return errorEnvelope({ validation: data });
};

const response = {
  errorEnvelope,
  validationEnvelope,
};

export default response;
