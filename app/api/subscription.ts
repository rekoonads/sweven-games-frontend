// API client for subscription management

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface SubscriptionPlan {
  planId: string;
  name: string;
  price: number;
  hours: number;
  validity: number;
  timeWindow?: string;
  description: string;
  features: string[];
  isActive: boolean;
}

export interface UserSubscription {
  subscriptionId: string;
  userId: number;
  userName: string;
  planId: string;
  status: string;
  startDate: string;
  endDate: string;
  hoursRemaining: number;
  hoursTotal: number;
  autoRenew: boolean;
  amountPaid: number;
  currency: string;
}

export interface BillingRecord {
  billingId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  billingDate: string;
  description: string;
  status: string;
}

export interface PaymentResponse {
  orderId: string;
  orderToken: string;
  paymentSessionId: string;
  paymentLink: string;
}

// Get all available subscription plans
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/plans`);
    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to fetch subscription plans');
    }

    return data.data;
  } catch (error: any) {
    // Re-throw with network-specific message
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network request failed');
    }
    throw error;
  }
}

// Get specific plan details
export async function getPlanById(planId: string): Promise<SubscriptionPlan> {
  const response = await fetch(`${API_BASE_URL}/subscription/plans/${planId}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to fetch plan details');
  }

  return data.data;
}

// Create a new subscription and initiate payment
export async function createSubscription(
  userId: string,
  userName: string,
  userEmail: string,
  userPhone: string,
  planId: string
): Promise<{ subscription: UserSubscription; payment: PaymentResponse }> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        userName,
        userEmail,
        userPhone,
        planId,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to create subscription');
    }

    return data.data;
  } catch (error: any) {
    // Re-throw with network-specific message
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Failed to fetch');
    }
    throw error;
  }
}

// Get user's active subscription
export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/user/${userId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to fetch user subscription');
    }

    return data.data;
  } catch (error: any) {
    // Re-throw with network-specific message
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network request failed');
    }
    throw error;
  }
}

// Get user's subscription history
export async function getUserSubscriptionHistory(userId: string): Promise<UserSubscription[]> {
  const response = await fetch(`${API_BASE_URL}/subscription/user/${userId}/history`);
  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to fetch subscription history');
  }

  return data.data;
}

// Get user's billing history
export async function getUserBillingHistory(userId: string): Promise<BillingRecord[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/user/${userId}/billing`);
    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to fetch billing history');
    }

    return data.data;
  } catch (error: any) {
    // Re-throw with network-specific message
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network request failed');
    }
    throw error;
  }
}

// Cancel subscription
export async function cancelSubscription(
  userId: string,
  subscriptionId: string,
  reason?: string
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        subscriptionId,
        reason,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to cancel subscription');
    }
  } catch (error: any) {
    // Re-throw with network-specific message
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Failed to fetch');
    }
    throw error;
  }
}

// Check if user has access to play games
export async function checkUserAccess(userId: string): Promise<{
  canPlay: boolean;
  subscription: UserSubscription | null;
  message: string;
}> {
  const response = await fetch(`${API_BASE_URL}/subscription/check-access/${userId}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to check user access');
  }

  return data.data;
}

// Deduct gaming hours
export async function deductGameHours(userId: string, hours: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/subscription/deduct-hours`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      hours,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Failed to deduct hours');
  }
}

// Get payment status
export async function getPaymentStatus(orderId: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/subscription/payment-status/${orderId}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to fetch payment status');
  }

  return data.data;
}
