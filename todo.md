# Todo: Implementing a Quiz Section

This document outlines the steps to implement a quiz section in the MHNGraphics project.

## 1. Database Schema (Prisma)

First, we need to define the data models for the quizzes in `prisma/schema.prisma`. We'll add fields for scheduling, time limits, scoring, and detailed results.

```prisma
// In prisma/schema.prisma

// Model for a Quiz
model Quiz {
  id           String     @id @default(cuid())
  title        String
  description  String?
  questions    Question[]
  published    Boolean    @default(false)
  publishedAt  DateTime?  // For scheduling the quiz publication
  timeLimit    Int?       // Optional: Time limit in minutes
  passingScore Int?       // Optional: Minimum score to pass
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
}

// Model for a Question in a Quiz
model Question {
  id        String   @id @default(cuid())
  text      String
  order     Int      // To control the sequence of questions
  quizId    String
  quiz      Quiz     @relation(fields: [quizId], references: [id], onDelete: Cascade)
  options   Option[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Model for an Option in a Question
model Option {
  id         String   @id @default(cuid())
  text       String
  isCorrect  Boolean  @default(false)
  questionId String
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

// Model to store user's quiz results
model QuizResult {
  id             String   @id @default(cuid())
  userId         String
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  quizId         String
  score          Int
  totalQuestions Int      // Store total questions for historical accuracy
  answers        Json     // Store user's answers for review { questionId: selectedOptionId }
  timeSpent      Int?     // Time taken in seconds
  completedAt    DateTime @default(now())

  @@unique([userId, quizId])
}
```

After updating the schema, run `npx prisma db push` and `npx prisma generate` to apply the changes.

## 2. API Endpoints

We'll need several API endpoints to handle quizzes.

-   **`POST /api/quiz/create`** (Admin only): Create a quiz, including `timeLimit`, `passingScore`, and question `order`.
-   **`GET /api/quiz`**: Fetch published quizzes that are past their `publishedAt` date.
-   **`GET /api/quiz/[id]`**: Fetch a single quiz, ordered by the `order` of questions.
-   **`POST /api/quiz/[id]/submit`**: Submit answers. The endpoint will store the `answers` JSON, `timeSpent`, and `totalQuestions`.
-   **`GET /api/quiz/result/[id]`**: Fetch a user's result, including their `answers` for review.

## 3. Scheduled Publishing Logic

To handle the `publishedAt` field, we have two main options:

1.  **API-level Filtering (Simpler):** The `GET /api/quiz` endpoint will filter out quizzes whose `publishedAt` date is in the future.
2.  **Scheduled Task / Cron Job (More Advanced):** A background job updates the `published` flag for quizzes whose `publishedAt` time has passed.

## 4. Frontend Pages and Components

We'll create new pages and components in `src/app/(pages)/quiz/` and `src/components/`.

-   **/quiz**: Page to display available quizzes.
-   **/quiz/[id]**: The main quiz page.
-   **/quiz/[id]/review**: (New) A page for users to review their answers before submission.
-   **/quiz/[id]/result**: Page to show the user's score and a link to review their answers.

## 5. State Management (Client-side)

Use `useState`, `useContext`, or Zustand to manage:

-   `currentQuestionIndex`, `answers`, `quizData`, `score`, `isLoading`.
-   `startTime`: To calculate `timeSpent`.
-   User's answers should be auto-saved to `localStorage` to prevent data loss on refresh.

## 6. UX Improvements

The following features should be implemented for a better user experience:

-   **Progress Indicator**: Show the user's progress (e.g., "Question 5 of 20").
-   **Timer Display**: If `timeLimit` is set, display a countdown timer. Auto-submit when the timer runs out.
-   **Review Before Submit**: A dedicated screen (`/quiz/[id]/review`) that shows all questions and the user's selected answers, allowing them to navigate back and change them before final submission.
-   **Auto-save Progress**: As the user answers questions, save their progress to the browser's `localStorage`. If they accidentally close the tab, their answers can be restored.
-   **Accessibility**:
    -   Ensure full keyboard navigation (e.g., using `Tab` to move between options and `Space` or `Enter` to select).
    -   Use proper ARIA attributes for screen readers.

## 7. (Optional) Admin Interface for Quiz Management

-   **`/admin/quizzes`**: A page to list, edit, or delete quizzes.
-   **`/admin/quizzes/new`** & **`/admin/quizzes/edit/[id]`**: Forms to create/edit a quiz. Should include fields for:
    -   `publishedAt` (date/time picker).
    -   `timeLimit` and `passingScore`.
    -   An interface to re-order questions (e.g., drag-and-drop).
