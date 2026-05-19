/**
 * Google Apps Script for Beta Narrative Contact Form
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Click Extensions > Apps Script
 * 3. Delete any code there and paste this entire file
 * 4. Click Deploy > New deployment
 * 5. Select type "Web app"
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy (Authorize if prompted)
 * 9. Copy the Web app URL and add it to your .env.local as GOOGLE_APPS_SCRIPT_URL
 */

function doPost(e) {
  try {
    // Get the active sheet (Sheet1)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-generate headers if the sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Email",
        "Role",
        "Leadership Journey",
        "Challenge"
      ]);
      
      // Style the headers to look nice
      var headerRange = sheet.getRange("A1:F1");
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#6B4FAD");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
    
    // Parse incoming JSON data from the Next.js API
    var data = JSON.parse(e.postData.contents);
    
    // Append the new submission
    sheet.appendRow([
      new Date(), // Timestamp
      data.fullName,
      data.email,
      data.role,
      data.journey,
      data.challenge || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
