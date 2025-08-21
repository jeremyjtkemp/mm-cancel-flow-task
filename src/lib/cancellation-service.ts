// src/lib/cancellation-service.ts
// Simple database service for cancellation flow (as per brief requirements)

import { createClient } from '@supabase/supabase-js';

// Simple types matching the brief requirements
export interface CancellationData {
  userId: string;
  subscriptionId: string;
  downsellVariant: 'A' | 'B';
  reason?: string;
  acceptedDownsell?: boolean;
}

export class CancellationService {
  private supabase: ReturnType<typeof createClient> | null;

  constructor() {
    // Initialize Supabase client only if environment variables are provided
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      this.supabase = createClient(supabaseUrl, supabaseAnonKey);
    } else {
      console.warn('Supabase environment variables not found. Running in demo mode.');
      this.supabase = null;
    }
  }

  /**
   * Create a new cancellation record (as per brief requirements)
   */
  async createCancellation(data: CancellationData) {
    if (!this.supabase) {
      // Demo mode - return mock data
      console.log('Demo mode: Creating cancellation with data:', data);
      return {
        id: 'demo-cancellation-' + Date.now(),
        user_id: data.userId,
        subscription_id: data.subscriptionId,
        downsell_variant: data.downsellVariant,
        reason: data.reason,
        accepted_downsell: data.acceptedDownsell || false,
        created_at: new Date().toISOString(),
      };
    }

    const { data: cancellation, error } = await this.supabase
      .from('cancellations')
      .insert({
        user_id: data.userId,
        subscription_id: data.subscriptionId,
        downsell_variant: data.downsellVariant,
        reason: data.reason,
        accepted_downsell: data.acceptedDownsell || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating cancellation:', error);
      throw new Error(`Failed to create cancellation: ${error.message}`);
    }

    return cancellation;
  }

  /**
   * Update cancellation record
   */
  async updateCancellation(cancellationId: string, updates: Partial<CancellationData>) {
    if (!this.supabase) {
      // Demo mode - return mock data
      console.log('Demo mode: Updating cancellation', cancellationId, 'with updates:', updates);
      return {
        id: cancellationId,
        reason: updates.reason,
        accepted_downsell: updates.acceptedDownsell,
        updated_at: new Date().toISOString(),
      };
    }

    const { data, error } = await this.supabase
      .from('cancellations')
      .update({
        reason: updates.reason,
        accepted_downsell: updates.acceptedDownsell,
      })
      .eq('id', cancellationId)
      .select()
      .single();

    if (error) {
      console.error('Error updating cancellation:', error);
      throw new Error(`Failed to update cancellation: ${error.message}`);
    }

    return data;
  }

  /**
   * Mark subscription as pending_cancellation (as per brief)
   */
  async markSubscriptionPendingCancellation(subscriptionId: string) {
    if (!this.supabase) {
      // Demo mode - return mock data
      console.log('Demo mode: Marking subscription', subscriptionId, 'as pending_cancellation');
      return {
        id: subscriptionId,
        status: 'pending_cancellation',
        updated_at: new Date().toISOString(),
      };
    }

    const { data, error } = await this.supabase
      .from('subscriptions')
      .update({ status: 'pending_cancellation' })
      .eq('id', subscriptionId)
      .select()
      .single();

    if (error) {
      console.error('Error updating subscription status:', error);
      throw new Error(`Failed to update subscription status: ${error.message}`);
    }

    return data;
  }

  /**
   * Apply downsell discount - Variant A: 50% off, Variant B: $10 off (as per brief)
   */
  async applyDownsellDiscount(subscriptionId: string, variant: 'A' | 'B') {
    if (!this.supabase) {
      // Demo mode - return mock data
      const oldPrice = 2500; // $25 in cents
      let newPrice: number;

      if (variant === 'A') {
        // Variant A: 50% off
        newPrice = Math.round(oldPrice * 0.5);
      } else {
        // Variant B: $10 off ($25→$15, $29→$19)
        newPrice = oldPrice - 1000; // $10 in cents
      }

      console.log('Demo mode: Applying downsell discount', variant, 'to subscription', subscriptionId);
      console.log('Demo mode: Price changed from', oldPrice, 'to', newPrice);
      
      return {
        id: subscriptionId,
        monthly_price: newPrice,
        status: 'active',
        updated_at: new Date().toISOString(),
      };
    }

    // Get current subscription
    const { data: subscription, error: fetchError } = await this.supabase
      .from('subscriptions')
      .select('monthly_price')
      .eq('id', subscriptionId)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch subscription: ${fetchError.message}`);
    }

    const oldPrice = subscription.monthly_price;
    let newPrice: number;

    if (variant === 'A') {
      // Variant A: 50% off
      newPrice = Math.round(oldPrice * 0.5);
    } else {
      // Variant B: $10 off ($25→$15, $29→$19)
      newPrice = oldPrice - 1000; // $10 in cents
    }

    // Update subscription price
    const { data: updatedSubscription, error: updateError } = await this.supabase
      .from('subscriptions')
      .update({ 
        monthly_price: newPrice,
        status: 'active' // Reactivate subscription
      })
      .eq('id', subscriptionId)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Failed to update subscription price: ${updateError.message}`);
    }

    return updatedSubscription;
  }

  /**
   * Deterministic A/B test variant assignment (as per brief)
   */
  static getDownsellVariant(userId: string): 'A' | 'B' {
    // Use a more robust deterministic hash for consistent 50/50 assignment
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Ensure true 50/50 split by using modulo 2
    return Math.abs(hash) % 2 === 0 ? 'A' : 'B';
  }
}

// Export singleton instance
export const cancellationService = new CancellationService();
