# Component Synchronization Guide

## Overview

This project uses a special build process that replaces some files with fixed versions to ensure successful production builds. This document explains how this works and what developers need to know.

## Consumer View Page Special Handling

The `/src/app/consumer-view/page.tsx` file is replaced during the build process with the content from `/src/app/consumer-view/page-fixed.tsx`. This is done to fix TypeScript issues and ensure consistent behavior in production.

### Important Rules

1. **Keep Both Files in Sync**: When making changes to either file, you must ensure the same changes are applied to both.

2. **Component Structure**: Both files must have the same component structure, especially:
   - Vehicle Stats Banner
   - Dealer Header
   - Photo Carousel
   - Vehicle Header
   - Linktree-style buttons
   - Test Drive Calendar Modal
   - Vehicle Reservation Flow

3. **Sync Checking**: A sync checking script has been added that runs:
   - During the build process
   - As a pre-commit hook if you modify the page.tsx file

## How to Update Correctly

When making changes to the consumer view page:

1. Make your changes to `page.tsx` first
2. Copy the same changes to `page-fixed.tsx`
3. Run `node sync-check.js` to verify both files are in sync
4. Commit your changes

## Setting Up Git Hooks

To enable the pre-commit hook, run:

```bash
git config core.hooksPath .githooks
```

This will activate the sync check before each commit that modifies the consumer view page.

## Troubleshooting

If you encounter sync issues:

1. Run `node sync-check.js` to see which components are out of sync
2. Compare the files manually to identify differences
3. Update the files to match

## Why This Is Necessary

The build process modifies TypeScript configurations to make deployment succeed. The `page-fixed.tsx` file contains proper TypeScript type annotations that ensure the page works correctly after these modifications.