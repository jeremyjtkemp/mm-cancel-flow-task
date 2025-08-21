# MigrateMate Cancellation Flow - Technical Assessment

A fully functional subscription cancellation flow built with Next.js 15, TypeScript, and Tailwind CSS. Features deterministic A/B testing, mobile optimization, and pixel-perfect Figma design replication.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🎯 Features

- **Progressive Flow**: Multi-step cancellation journey with proper state management
- **Deterministic A/B Testing**: 50/50 split with Variant A (50% off) and Variant B ($10 off)
- **Mobile Optimization**: Responsive design with conditional image visibility and text wrapping fixes
- **Form Validation**: Client-side validation with proper error handling
- **Navigation**: Consistent back/forward flow with proper URL parameter preservation

## 🧪 A/B Testing

The app implements deterministic A/B testing based on user ID:

- **Variant A** (`demo-user-123`): 50% off - $25 → $12.50/month
- **Variant B** (`demo-user-456`): $10 off - $25 → $15/month

### Testing Both Variants

1. Start with: `http://localhost:3000/?userId=demo-user-123` (Variant A)
2. Switch to: `http://localhost:3000/?userId=demo-user-456` (Variant B)
3. Follow the "Not yet - I'm still looking" flow to see variant-specific offers

## 📱 Mobile Features

- **Conditional Image Display**: Images hidden on mobile for most pages, shown on top for completion pages
- **Responsive Layouts**: Stacked content on mobile, horizontal on desktop
- **Touch Optimization**: Proper button sizes and spacing for mobile devices
- **Text Wrapping**: Fixed overflow issues and responsive typography

## 🗄️ Database Schema

The app includes a simplified database structure with:

- **Users table**: Basic user information
- **Subscriptions table**: Subscription details with status tracking
- **Cancellations table**: Cancellation records with A/B variant, reason, and acceptance data

## ⚡ Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (local setup with seed data)
- **State Management**: React hooks with URL parameter persistence

## 📁 Project Structure

```
src/
├── app/
│   ├── cancel/           # Cancellation flow pages
│   │   ├── page.tsx      # Initial trigger
│   │   ├── offer/        # A/B testing offers
│   │   ├── survey/       # Usage survey
│   │   ├── reasons/      # Cancellation reasons
│   │   ├── feedback/     # User feedback
│   │   ├── confirmation/ # Visa lawyer question
│   │   └── complete/     # Final completion
│   └── layout.tsx        # Root layout
├── lib/
│   ├── supabase.ts       # Database client
│   └── cancellation-service.ts # Business logic
└── globals.css           # Global styles
```

## 🎨 Design Implementation

- **Figma Fidelity**: Pixel-perfect replication of provided designs
- **Color Scheme**: Consistent with MigrateMate brand colors
- **Typography**: DM Sans font family for modern, readable text
- **Components**: Reusable UI components with proper accessibility

## 🧪 Testing the Flow

1. **Start**: Navigate to `/` (profile page)
2. **Trigger**: Click "Cancel Migrate Mate"
3. **Choose Path**: 
   - "Yes, I've found a job" → Job survey flow
   - "Not yet - I'm still looking" → A/B offer flow
4. **Test Variants**: Change `userId` in URL to see different offers
5. **Complete Flow**: Follow through to final confirmation

## 🔒 Security Features

- **Input Validation**: Client-side validation with minimum character requirements
- **XSS Protection**: Basic input sanitization
- **RLS Policies**: Row-level security for database access
- **Parameter Validation**: URL parameter validation and sanitization

## 📝 Notes

- **Demo Mode**: App runs without Supabase setup for immediate evaluation
- **Environment Variables**: Add Supabase credentials for full database functionality
- **Mobile Testing**: Use Chrome DevTools responsive design mode for mobile testing
- **A/B Consistency**: Variant assignment is consistent throughout the entire user journey

## 🚀 Production Ready

The app is production-ready with:
- Proper error handling
- Loading states
- Form validation
- Responsive design
- Accessibility features
- Clean, maintainable code

---

Built with ❤️ for MigrateMate's technical assessment
