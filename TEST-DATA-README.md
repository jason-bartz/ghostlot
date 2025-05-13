# GhostLot Test Data Generation

## Overview

This README provides documentation for the test data generation system in GhostLot. The system helps developers and demonstrators quickly populate the application with realistic sample data for development, testing, and demonstration purposes.

## Components

The test data generation system consists of three main components:

1. **TestDataSetup.jsx**: The user interface component that allows users to configure, generate, and manage test data.
2. **SampleDataGenerator.js**: A utility library that generates realistic sample data for vehicles, dealers, consumers, and other entities.
3. **DataImportService.js**: A service that handles the actual data import process, providing progress updates and error handling.

## Usage

### Accessing the Test Data Setup

The Test Data Setup interface is available in the admin section of the GhostLot application. You can access it by:

1. Logging in as an administrator
2. Navigating to Settings
3. Selecting "Test Data" from the menu

### Generating Test Data

To generate test data:

1. Configure the options according to your needs:
   - **Include Sample Images**: Toggle to include sample vehicle images
   - **Generate Complete Vehicle Specs**: Toggle to generate detailed vehicle specifications
   - **Create Sample Consumer Accounts**: Toggle to create sample consumer accounts
   - **Generate Realistic Analytics**: Toggle to generate analytics data with realistic patterns
   - **Number of Vehicles**: Adjust the slider to set the number of vehicles (5-50)
   - **Data Time Range**: Select the time range for generated data (30-365 days)

2. Click "Generate Test Data" to start the process
   - You can monitor progress in real-time
   - A summary of generated data will be displayed upon completion

3. If needed, click "Cancel" to stop the generation process

### Clearing Test Data

To clear all test data:

1. Click "Clear All Test Data"
2. Confirm the action when prompted
3. Wait for the operation to complete

**Note**: The clear operation only removes data created by the test data generator, not any real data in your system.

## Data Generated

The test data generator creates the following types of data:

1. **Dealer Profiles**: Sample dealerships with logos, contact information, and customized settings
2. **Vehicles**: Sample vehicles with specifications, features, and images
3. **QR Codes**: QR codes mapped to vehicles for testing scanning functionality
4. **Test Drive Requests**: Sample test drive requests in various statuses
5. **Reservations**: Sample vehicle reservations with payment information
6. **Consumer Accounts**: Sample consumer profiles if enabled
7. **Analytics Data**: QR code scans, page views, interactions, and other analytics events

## Customizing the Data Generator

Developers can customize the sample data generation by modifying the `SampleDataGenerator.js` file. This file contains:

- Arrays of sample data (makes, models, features, colors, etc.)
- Utility functions for generating random data
- Generator functions for each entity type
- Batch generation utilities

## Implementation Notes

- The current implementation uses a simulation approach with timeouts to demonstrate the process
- In a production environment, this would connect to your Supabase database
- Progress and status updates are provided through callbacks
- The generator is designed to produce consistent, related data (e.g., matching QR codes to vehicles)

## Best Practices

1. Use the test data generator only in development and staging environments
2. Clear test data before generating new data to avoid duplication
3. Use the time range option to simulate data over realistic periods
4. For demos, start with a smaller number of vehicles (15-25) for better performance
5. Use the cancel button if needed to stop a long-running generation process

## Troubleshooting

If you encounter issues with the test data generator:

1. Check the browser console for any error messages
2. Ensure your Supabase instance is properly configured and accessible
3. Try clearing all test data and starting fresh
4. If generating a large amount of data, try a smaller batch size
5. Check that your account has appropriate permissions

For persistent issues, contact the development team or open an issue in the project repository.