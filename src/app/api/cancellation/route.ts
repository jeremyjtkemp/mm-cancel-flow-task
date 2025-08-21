// src/app/api/cancellation/route.ts
// Simple API routes for cancellation flow (as per brief requirements)

import { NextRequest, NextResponse } from 'next/server';
import { cancellationService, CancellationService } from '@/lib/cancellation-service';

// Simple input sanitization for security
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>\"'&]/g, '');
}

/**
 * POST /api/cancellation
 * Create a new cancellation (as per brief requirements)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.userId || !body.subscriptionId) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, subscriptionId' },
        { status: 400 }
      );
    }

    // Determine A/B test variant (deterministic)
    const downsellVariant = CancellationService.getDownsellVariant(body.userId);

    const cancellationData = {
      userId: sanitizeInput(body.userId),
      subscriptionId: sanitizeInput(body.subscriptionId),
      downsellVariant,
      reason: body.reason ? sanitizeInput(body.reason) : undefined,
      acceptedDownsell: false,
    };

    const cancellation = await cancellationService.createCancellation(cancellationData);

    // Mark subscription as pending_cancellation (as per brief)
    await cancellationService.markSubscriptionPendingCancellation(body.subscriptionId);

    return NextResponse.json({
      success: true,
      cancellation,
      downsellVariant,
    });

  } catch (error) {
    console.error('Error creating cancellation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cancellation/[id]
 * Update cancellation (simplified for brief requirements)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const url = new URL(request.url);
    const cancellationId = url.pathname.split('/').pop();

    if (!cancellationId) {
      return NextResponse.json(
        { error: 'Cancellation ID is required' },
        { status: 400 }
      );
    }

    if (body.action === 'accept_downsell') {
      // Apply downsell discount based on variant
      await cancellationService.applyDownsellDiscount(
        body.subscriptionId,
        body.downsellVariant
      );

      // Update cancellation to accepted downsell
      await cancellationService.updateCancellation(cancellationId, {
        acceptedDownsell: true,
      });

    } else if (body.action === 'decline_downsell') {
      // Update cancellation with reason
      await cancellationService.updateCancellation(cancellationId, {
        reason: body.reason ? sanitizeInput(body.reason) : undefined,
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating cancellation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


