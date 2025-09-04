# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website project for "irent-food" - a business targeting food delivery riders in Bucharest/Romania. The project aims to provide:

1. PFA (Persoană Fizică Autorizată) setup services for couriers
2. Self-accounting guidance and training 
3. Electric bike rental services optimized for food delivery riders

## Target Audience

- Food delivery riders (Bolt Food, Glovo, Wolt, etc.) in Bucharest
- Includes non-Romanian speakers (Nepali/Sri Lankan/Indian riders)
- Focus on helping riders transition from employee status to PFA (independent contractor)

## Technical Requirements

Based on the project specifications in `propt.txt`:

- **Plain HTML + JavaScript** only (no frameworks)
- **Tailwind CSS** via CDN
- Single-page application with internal sections and modals
- **Bilingual support**: Romanian (default) and English
- Language switcher with localStorage persistence
- Internationalization via `i18n` object in `lang.js`
- Mobile-first, accessible design (WCAG-friendly)
- Lightweight for good Lighthouse scores

## Expected File Structure

```
index.html          # Main single-page application
app.js             # Navigation, i18n, accordions, modals, forms
lang.js            # I18N object with RO/EN translations
favicon.svg        # Simple favicon
```

## Key Features to Implement

### Core Sections
1. Header with navigation and language switcher
2. Hero section with primary CTAs
3. Value propositions (3 cards)
4. PFA setup step-by-step guide
5. DIY accounting guide
6. E-bike rental information and booking
7. Pricing cards for all services
8. Social proof/testimonials
9. FAQ accordion
10. Contact/lead form
11. Footer

### Interactive Elements
- Smooth scrolling navigation
- FAQ accordions
- "Book a bike" modal
- Form submission with toast notifications
- Language switching functionality
- Sticky mobile bottom bar with CTAs

### Business Model
- PFA setup: Fixed fee or monthly support
- DIY accounting course: One-time payment
- E-bike rental: Weekly/monthly rates
- Target income improvement from ~3,500 lei (employee) to 5,000-6,500 lei (PFA)

### Key Value Proposition
Help food delivery riders earn more money by:
- Setting up legal PFA status
- Teaching tax-efficient accounting
- Providing electric bikes optimized for delivery work
- Showing how to properly deduct business expenses

## Development Notes

- No backend required initially - forms can log to console with success toast
- Include comments for future integration with form services (Formspree)
- Include analytics integration points (GA4) in comments
- WhatsApp integration for customer support
- SEO optimization with hreflang tags for bilingual content
- Structured data for local business (Bucharest)

## Content Guidelines

- Use short, friendly copy aimed at couriers
- Prefer bullet points and numbered lists
- Include specific Romanian business terminology (PFA, ANAF, etc.)
- Emphasize concrete financial benefits and calculations
- Maintain professional yet approachable tone in both languages