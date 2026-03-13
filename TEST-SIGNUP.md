# 🧪 Test Signup Issue

## Quick Diagnostic Steps

### Step 1: Open Browser Console
1. Go to your Vercel site
2. Press `F12` (or right-click → Inspect)
3. Click "Console" tab
4. Refresh the page

### Step 2: Check for Errors
Look for any RED error messages. Common ones:

❌ **"login-script.js not found"**
- Solution: File not deployed to Vercel

❌ **"showRegister is not defined"**
- Solution: Script not loading properly

❌ **"Cannot read property 'style' of null"**
- Solution: Form elements not found

### Step 3: Test Manually
In the console, type:
```javascript
showRegister()
```
Press Enter. Does the form appear?

### Step 4: Check Form Elements
In console, type:
```javascript
console.log(document.getElementById('loginForm'));
console.log(document.getElementById('registerForm'));
```

Both should show HTML elements, not `null`.

---

## Quick Fix Options

### Option A: Use Backup Script (Simplest)

Replace the script tag in `login.html`:

**Change from:**
```html
<script src="login-script.js"></script>
```

**To:**
```html
<script src="login-script-backup.js"></script>
```

This uses a simpler, more compatible version.

### Option B: Inline Script (Most Reliable)

Add this RIGHT BEFORE `</body>` in `login.html`:

```html
<script>
function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    return false;
}

function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    return false;
}
</script>
<script src="login-script.js"></script>
</body>
```

### Option C: Direct Link (Temporary)

Create a separate signup page:

1. Copy `login.html` to `signup.html`
2. In `signup.html`, change:
```html
<div id="loginForm" style="display: none;">
<div id="registerForm" style="display: block;">
```

3. Update link in `login.html`:
```html
<a href="signup.html">SIGN UP</a>
```

---

## What to Share

If still not working, please share:

1. **Console errors** (screenshot or copy text)
2. **What happens** when you click SIGN UP
3. **Browser** you're using
4. **Vercel URL** (so I can test)

---

## Emergency Contact Test

Try this test account:
- Email: `test@jit.ac.in`
- Password: `test1234`

If login works but signup doesn't, it's definitely a form switching issue.
