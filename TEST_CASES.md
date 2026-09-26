# TaskFlow Lite – User Profile Module Test Cases

## Test Case 1 – View Profile

**Test:** Open the profile page.

**Steps:**

1. Start the backend server.
2. Start the frontend application.
3. Open `http://localhost:5173`.
4. View the User Profile page.

**Expected Result:**
Profile information is loaded from the backend and displayed correctly.

**Result:** PASS

---

## Test Case 2 – Valid Profile Update

**Test:** Update profile information with valid data.

**Steps:**

1. Click **Edit**.
2. Enter a valid Display Name.
3. Enter a valid 10-digit Phone Number.
4. Enter a valid Short Bio.
5. Click **Save**.

**Expected Result:**
The profile is updated successfully and a success message is displayed.

**Result:** PASS

---

## Test Case 3 – Cancel Profile Update

**Test:** Verify that Cancel does not save changes.

**Steps:**

1. Click **Edit**.
2. Change the Display Name or Phone Number.
3. Click **Cancel**.
4. Check the profile values.

**Expected Result:**
The unsaved changes are discarded and the last saved values are restored.

**Result:** PASS

---

## Test Case 4 – Invalid Name

**Test:** Verify required validation for Display Name.

**Steps:**

1. Click **Edit**.
2. Remove the Display Name.
3. Click **Save**.

**Expected Result:**
The profile is not updated and the message `Display Name is required` is displayed.

**Result:** PASS

---

## Test Case 5 – Invalid Phone Number

**Test:** Verify phone number validation.

**Steps:**

1. Click **Edit**.
2. Enter an invalid phone number such as `123`.
3. Click **Save**.

**Expected Result:**
The profile is not updated and a phone number validation message is displayed.

**Result:** PASS

---

## Test Case 6 – Nonexistent Profile

**Test:** Request a profile that does not exist.

**Steps:**

1. Send a GET request to:
   `http://localhost:5000/api/profile/999`
2. Check the API response.

**Expected Result:**
The API returns HTTP status `404` with the message `Profile not found`.

**Result:** PASS

---

## Test Case 7 – Optional Bio

**Test:** Verify that Short Bio is optional.

**Steps:**

1. Click **Edit**.
2. Remove the Short Bio.
3. Keep a valid Display Name and Phone Number.
4. Click **Save**.

**Expected Result:**
The profile is saved successfully without a bio. The profile displays `Not provided` when the bio is empty.

**Result:** PASS
