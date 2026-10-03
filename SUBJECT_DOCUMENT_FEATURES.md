# StudyOS - Subject & Document Management Features

## What Was Added

### 1. Custom Subject Creation
Users can now create their own subjects with:
- **Name**: Any subject name (e.g., "Biology", "Economics", "Art History")
- **Icon**: Choose from 16 emoji icons (📚, 🧮, 🔬, 🌍, 🎨, 💻, etc.)
- **Color**: Pick from 12 color options for visual distinction
- **Description**: Optional brief description

**Location**: Subjects page → "Add Subject" button (top right)

### 2. Document Management
Each custom subject can have multiple documents of different types:

#### Supported Document Types
| Type | Description | How to Add |
|------|-------------|------------|
| **PDF** | PDF documents | Upload file |
| **Notes** | Text-based notes | Type or paste text |
| **Book** | Books/textbooks | Upload PDF or EPUB |
| **Link** | External URLs | Paste URL |
| **Image** | Images (JPG, PNG, etc.) | Upload file |
| **Audio** | Audio files (MP3, WAV, etc.) | Upload file |
| **Video** | Video files (MP4, WebM, etc.) | Upload file |

**Location**: Subject detail page → "Add Document" button

### 3. Document Viewer
Built-in viewer for different document types:
- **PDFs**: Embedded PDF viewer with iframe
- **Images**: Full image display
- **Notes**: Formatted text display
- **Links**: External link with open button
- **Audio**: Audio player with controls
- **Video**: Video player with controls
- **Other files**: Download option

**Location**: Click "View" on any document card

### 4. Data Persistence
- All user-created subjects and documents are saved to **localStorage**
- Data persists across browser sessions
- Files are stored as base64 (demo mode)
- Future: Will migrate to Supabase Storage

### 5. Subject Management
- **Edit**: Click subject to view/edit (future feature)
- **Delete**: Hover over custom subject → trash icon
- **Documents**: View all documents for a subject
- **Document Count**: Shows number of documents per subject

## Technical Implementation

### New Types (src/types/index.ts)
```typescript
interface UserSubject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface StudyDocument {
  id: string;
  subjectId: string;
  name: string;
  type: DocumentType; // 'pdf' | 'notes' | 'book' | 'link' | 'image' | 'audio' | 'video'
  description?: string;
  fileData?: string; // base64 for localStorage
  fileSize?: number;
  mimeType?: string;
  url?: string; // for links
  content?: string; // for notes
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}
```

### New Components
- `AddSubjectModal.tsx` - Modal for creating subjects
- `AddDocumentModal.tsx` - Modal for uploading documents
- `DocumentCard` - Card component for displaying documents
- `DocumentViewer` - Modal viewer for documents

### Updated Pages
- `SubjectsPage.tsx` - Shows both mock and custom subjects, add button
- `SubjectDetailPage.tsx` - Shows chapters (mock) or documents (custom)

### State Management (AppContext.tsx)
Added actions:
- `addUserSubject(subject)` - Create new subject
- `updateUserSubject(id, updates)` - Update subject
- `deleteUserSubject(id)` - Delete subject and its documents
- `addDocument(doc)` - Add document to subject
- `updateDocument(id, updates)` - Update document
- `deleteDocument(id)` - Delete document
- `getDocumentsBySubject(subjectId)` - Get all docs for subject

## Usage Flow

### Creating a Custom Subject
1. Go to **Subjects** page
2. Click **"Add Subject"** button (top right)
3. Fill in name, choose icon and color
4. Optionally add description
5. Click **"Add Subject"**
6. Subject appears in the list with "Custom" badge

### Adding Documents to a Subject
1. Click on a custom subject to open it
2. Click **"Add Document"** button
3. Select document type (PDF, Notes, Link, etc.)
4. Upload file or enter content
5. Add name and optional description
6. Click **"Add Document"**
7. Document appears in the subject's document list

### Viewing Documents
1. In subject detail page, click **"View"** on any document
2. Document opens in modal viewer
3. For PDFs: Scroll through pages
4. For images: View full image
5. For audio/video: Use player controls
6. For links: Click "Open Link" to visit
7. Click **×** to close viewer

### Managing Documents
- **Delete**: Hover over document card → click trash icon
- **Download**: In viewer → click download icon (for files)
- **Open Link**: For link documents → click "Open Link"

## Future Enhancements

### Planned Features
1. **Supabase Integration**
   - Store subjects and documents in PostgreSQL
   - Use Supabase Storage for file uploads
   - Sync across devices

2. **Advanced Document Features**
   - OCR for scanned documents
   - AI-powered document summarization
   - Auto-tagging based on content
   - Document search within subjects

3. **Subject Features**
   - Subject templates (pre-configured subjects)
   - Subject sharing between users
   - Subject categories/tags
   - Progress tracking for custom subjects

4. **Collaboration**
   - Share documents with study groups
   - Collaborative notes
   - Comment system

5. **File Management**
   - Folder organization within subjects
   - Bulk upload
   - File versioning
   - Cloud storage integration (Google Drive, Dropbox)

## Limitations (Current Demo)

1. **File Size**: Limited by localStorage (~5-10MB total)
2. **No Cloud Sync**: Data only on current browser
3. **No Backup**: Clearing browser data deletes everything
4. **Single User**: No authentication yet
5. **No File Preview**: Some file types can't be previewed

## Migration Path to Production

When ready to move to production:

1. **Replace localStorage with Supabase**
   ```typescript
   // Current (localStorage)
   localStorage.setItem('studyos_user_subjects', JSON.stringify(subjects));
   
   // Future (Supabase)
   await supabase.from('user_subjects').insert(subject);
   ```

2. **Replace base64 with Supabase Storage**
   ```typescript
   // Current (base64 in localStorage)
   const fileData = await fileToBase64(file);
   
   // Future (Supabase Storage)
   const { data } = await supabase.storage
     .from('documents')
     .upload(path, file);
   ```

3. **Add authentication**
   - Supabase Auth for user management
   - Row Level Security for data isolation
   - File access control

4. **Add real-time sync**
   - Supabase Realtime for live updates
   - Offline support with service workers

## Testing the Features

### Test Case 1: Create Custom Subject
1. Navigate to `/subjects`
2. Click "Add Subject"
3. Enter name: "Biology"
4. Select icon: 🧬
5. Select color: Green (#059669)
6. Add description: "Study of life and living organisms"
7. Click "Add Subject"
8. Verify: Subject appears in list with "Custom" badge

### Test Case 2: Add PDF Document
1. Click on "Biology" subject
2. Click "Add Document"
3. Select type: "PDF"
4. Upload a PDF file
5. Enter name: "Chapter 1 - Cell Biology"
6. Click "Add Document"
7. Verify: Document card appears
8. Click "View" → PDF opens in viewer

### Test Case 3: Add Notes
1. In "Biology" subject, click "Add Document"
2. Select type: "Notes"
3. Enter name: "Key Terms"
4. Type notes content
5. Click "Add Document"
6. Verify: Document appears
7. Click "View" → Notes display in modal

### Test Case 4: Add Link
1. Click "Add Document"
2. Select type: "Link"
3. Enter URL: "https://example.com/biology-resource"
4. Enter name: "External Resource"
5. Click "Add Document"
6. Verify: Document appears with link icon
7. Click "View" → Shows "Open Link" button

### Test Case 5: Delete Subject
1. Go to Subjects page
2. Hover over custom subject
3. Click trash icon
4. Confirm deletion
5. Verify: Subject and all its documents are deleted

### Test Case 6: Persistence
1. Create subject and add documents
2. Refresh the page
3. Verify: Subject and documents still exist
4. Close browser and reopen
5. Verify: Data persists

## Summary

StudyOS now supports:
✅ Custom subject creation with icons and colors
✅ Document upload (PDF, images, audio, video)
✅ Text-based notes
✅ External links
✅ Built-in document viewer
✅ localStorage persistence
✅ Delete subjects and documents
✅ Responsive design for all features
✅ Accessibility (ARIA labels, keyboard navigation)

The foundation is ready for Supabase migration when needed.
