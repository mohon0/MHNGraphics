# MHNGraphics Project TODO

This document outlines the development tasks for the MHNGraphics project.

---

### 📝 Quiz Feature Implementation Plan

This is the implementation plan for the new quiz feature, based on the models defined in `prisma/schema.prisma`.

**1. Backend API & Services**

*   `[ ]` **Create Quiz Service**: Create a new service file at `src/services/quiz.ts` to contain all business logic for interacting with the quiz models.
*   `[ ]` **Create API Routes Directory**: Create a new directory `src/app/api/quizzes/` for all quiz-related API endpoints.
*   `[ ]` **Endpoint: List Quizzes (`GET /api/quizzes`)**
    *   Create route `src/app/api/quizzes/route.ts`.
    *   Implement logic in `src/services/quiz.ts` to fetch all `published` quizzes.
    *   Support filtering by `category` and `difficulty`.
    *   Implement pagination.
*   `[ ]` **Endpoint: Get Single Quiz (`GET /api/quizzes/[quizId]`)**
    *   Create route `src/app/api/quizzes/[quizId]/route.ts`.
    *   Implement logic in `src/services/quiz.ts` to fetch a single quiz by its ID.
    *   The response **must** include `questions` and their `options`, but **exclude** the `isCorrect` field from the `Option` model to prevent cheating.
*   `[ ]` **Endpoint: Submit Quiz (`POST /api/quizzes/[quizId]/submit`)**
    *   Create route `src/app/api/quizzes/[quizId]/submit/route.ts`.
    *   This endpoint must be protected, requiring user authentication via `next-auth`.
    *   It will accept a payload of user answers, e.g., `[{ "questionId": "...", "selectedOptionId": "..." }]`.
    *   In `src/services/quiz.ts`, implement the submission logic:
        1.  Fetch the correct answers for the quiz from the database.
        2.  Compare the user's answers against the correct ones to calculate the `score`.
        3.  Determine if the user `passed` based on the quiz's `passingScore`.
        4.  Create a new `QuizResult` record in the database, saving the user's `score`, the answers JSON, `timeSpent`, etc.
        5.  Return the ID of the newly created `QuizResult` object.
*   `[ ]` **Endpoint: Get Quiz Result (`GET /api/quizzes/result/[resultId]`)**
    *   Create route `src/app/api/quizzes/result/[resultId]/route.ts`.
    *   Implement logic in `src/services/quiz.ts` to fetch a `QuizResult` by its ID.
    *   **Security**: Ensure the currently authenticated user is the owner of the result (or is an `ADMIN`).
    *   The response should include all data needed for a detailed review: the user's score, their answers, and the correct answers for each question.

**2. Frontend UI & Logic**

*   `[ ]` **Create Component Directory**: Create `src/components/quiz/` to store all new quiz-related React components.
*   `[ ]` **Page: Quiz Listing (`/quizzes`)**
    *   Create a new route at `src/app/(pages)/quizzes/page.tsx`.
    *   Use Tanstack Query to fetch the list of quizzes from `/api/quizzes`.
    *   Create a `QuizCard.tsx` component in `src/components/quiz/` to display each quiz's title, description, image, and difficulty.
    *   Each card should link to the quiz-taking page, e.g., `/quizzes/[quizId]`.
*   `[ ]` **Page: Take Quiz (`/quizzes/[quizId]`)**
    *   Create a new dynamic route at `src/app/(pages)/quizzes/[quizId]/page.tsx`.
    *   Fetch the specific quiz data using its ID from `/api/quizzes/[quizId]`.
    *   Create a primary component `QuizTaker.tsx` in `src/components/quiz/` to manage the quiz-taking state (current question, selected answers, timer).
    *   On submit, call the `POST /api/quizzes/[quizId]/submit` endpoint.
    *   After a successful submission, redirect the user to the result page using the returned `resultId`.
*   `[ ]` **Page: Quiz Result (`/quizzes/result/[resultId]`)**
    *   Create a new dynamic route at `src/app/(pages)/quizzes/result/[resultId]/page.tsx`.
    *   Fetch the result data from `/api/quizzes/result/[resultId]`.
    *   Create a `QuizResultDetails.tsx` component in `src/components/quiz/` to render the results, including the score, passed/failed status, and a detailed answer review.

**3. State Management & Data Fetching**

*   `[ ]` **Update Query Keys**: Add new keys for `quizzes`, `quiz`, and `quizResult` to `src/constant/QueryKeys.ts` for use with Tanstack Query.
*   `[ ]` **Create Custom Hooks**: To streamline data fetching, create `useQuizzes.ts` and `useQuizResult.ts` in the `src/hooks/` directory. These hooks will abstract the `useQuery` logic for their respective features.

**4. (Future Enhancement) Admin Quiz Management**

*   `[x]` **Admin Sidebar Options**: Added "Quiz" options to the admin sidebar (`DashboardSidebar.tsx`) for "Add New" and "View All" quizzes.
*   `[ ]` **Admin Section**: Create a new area under `/admin/quizzes` for managing quizzes.
*   `[ ]` **CRUD Interface**: Build pages and forms for creating, updating, and deleting quizzes, questions, and options.
*   `[ ]` **Publishing**: Add a UI to toggle the `published` status of a quiz and set the `publishedAt` date.
*   `[ ]` **Analytics**: Allow admins to view results and basic analytics for each quiz.
