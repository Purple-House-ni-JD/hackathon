<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Document Status Update</title>
</head>
<body>
    <h2>Document Status Update</h2>
    
    <p>Hello,</p>
    
    <p>Your document status has been updated:</p>
    
    <ul>
        <li><strong>Event Name:</strong> {{ $document->event_name }}</li>
        <li><strong>Document Type:</strong> {{ $document->documentType->name }}</li>
        <li><strong>Organization:</strong> {{ $document->organization->name }}</li>
        <li><strong>Previous Status:</strong> {{ $previousStatus }}</li>
        <li><strong>New Status:</strong> {{ $newStatus }}</li>
        @if($currentOffice)
        <li><strong>Current Office:</strong> {{ $currentOffice->name }}</li>
        @endif
        <li><strong>Date Received:</strong> {{ $document->date_received->format('F d, Y') }}</li>
        <li><strong>Last Updated:</strong> {{ $document->updated_at->format('F d, Y h:i A') }}</li>
    </ul>
    
    @if($remarks)
    <h3>Remarks:</h3>
    <p>{{ $remarks }}</p>
    @endif
    
    <p>Thank you for using our document tracking system.</p>
</body>
</html>

