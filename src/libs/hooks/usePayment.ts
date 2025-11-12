// src/libs/hooks/usePayment.ts
import { useState, useEffect } from 'react';
import api from '../apis/api';
import { Payment } from '../../types/payment.type';

export const usePayment = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await api.get('/payments/all');
      setPayments(res.data || []);
    } catch (error) {
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const createPayment = async (payment: any) => {
    const res = await api.post('/payments/create', payment);
    return res.data;
  };

  const deletePayment = async (id: number) => {
    await api.delete(`/payments/${id}`);
  };

  useEffect(() => { fetchAll(); }, []);

  return { payments, loading, createPayment, deletePayment, fetchAll };
};