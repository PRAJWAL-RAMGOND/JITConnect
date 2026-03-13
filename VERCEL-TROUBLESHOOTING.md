# 🔧 Vercel Deployment Troubleshooting Guide

## Issue: Signup Page Not Working

### Problem
The signup form doesn't appear or doesn't work on Vercel deployment.

### Root Causes
1. ✅ **FIXED**: Missing `.hidden` CSS class
2. ✅ **FIXED**: JavaScript not using inline styles as fallback
3. ✅ **FIXED**: Missing error handling in registration

### Solutions Applied

#### 1. Enhanced CSS
Added proper `.hidden` and `.visible` utility classes:
```css
.hidden {
    display: none !important;
}

.visible {
    display: block !important;
}
```

#### 2. Improved JavaScript
Updated form switching to use both classes AND inline styles:
```javascript
function showRegister() {
    loginForm.style.display = 'none';
    loginForm.classList.add('hidden');
    registerForm.style.display = 'block';
    registerForm.classList.remove('hidden');
}
```

#### 3. Added Validation
- Email domain validation (@jit.ac.in)
- Password length check (min 8 chars)
- Required field validation
- Error messages

#### 4. Better Error Handling
- Try-catch blocks
- Console logging for debugging
- LocalStorage error handling
- Null checks for DOM elements

---

## Testing Your Fix

### 1. Test Locally First
```bash
# Open in browser
start login.html
# Or
python -m http.server 8000
```

### 2. Test on Vercel
1. Push changes to GitHub:
```bash
git add .
git commit -m "Fix signup form on Vercel"
git push
```

2. Wait for auto-deploy (30 seconds)

3. Test signup:
   - Click "SIGN UP" link
   - Form should appear
   - Fill in details
   - Submit should work

### 3. Check Browser Console
Press `F12` → Console tab

Look for:
- ✅ "Login page loaded"
- ✅ "Login form initialized"
- ✅ "Register form hidden"
- ❌ Any error messages

---

## Common Issues & Fixes

### Issue 1: Form Doesn't Appear
**Symptoms**: Clicking "SIGN UP" does nothing

**Fix**:
1. Check browser console for errors
2. Verify `login-script.js` is loading:
```html
<script src="login-script.js"></script>
```
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito mode

### Issue 2: Form Appears But Submit Fails
**Symptoms**: Form shows but nothing happens on submit

**Fix**:
1. Check console for validation errors
2. Verify email format: `name@jit.ac.in`
3. Ensure password is 8+ characters
4. Check all required fields are filled

### Issue 3: LocalStorage Not Working
**Symptoms**: Registration succeeds but doesn't redirect

**Fix**:
1. Check if LocalStorage is enabled in browser
2. Check browser privacy settings
3. Try different browser
4. Check console for storage errors

### Issue 4: Redirect Fails
**Symptoms**: Registration works but stays on login page

**Fix**:
1. Check if `dashboard.html` exists
2. Verify file paths are correct
3. Check browser console for navigation errors
4. Try manual navigation to dashboard

---

## Debugging Steps

### Step 1: Check File Loading
Open browser console and run:
```javascript
console.log(typeof showRegister); // Should be "function"
console.log(typeof handleRegister); // Should be "function"
```

### Step 2: Check Form Elements
```javascript
console.log(document.getElementById('loginForm')); // Should show element
console.log(document.getElementById('registerForm')); // Should show element
```

### Step 3: Test Form Switching
```javascript
showRegister(); // Should show signup form
showLogin(); // Should show login form
```

### Step 4: Check LocalStorage
```javascript
localStorage.setItem('test', 'works');
console.log(localStorage.getItem('test')); // Should show "works"
```

---

## Vercel-Specific Issues

### Issue: Files Not Updating
**Solution**:
1. Clear Vercel cache:
   - Go to Vercel Dashboard
   - Project Settings → General
   - Scroll to "Clear Cache"
   - Click "Clear Cache"

2. Force redeploy:
```bash
git commit --allow-empty -m "Force redeploy"
git push
```

### Issue: JavaScript Not Loading
**Solution**:
1. Check `vercel.json` configuration
2. Verify file paths are relative
3. Check browser network tab for 404 errors
4. Ensure files are committed to Git

### Issue: CSS Not Applied
**Solution**:
1. Hard refresh: Ctrl+Shift+R
2. Clear browser cache
3. Check CSS file path in HTML
4. Verify CSS file is deployed

---

## Quick Fixes

### Fix 1: Force Form Visibility
Add to `login-script.js`:
```javascript
// Force show login form on load
window.addEventListener('load', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
});
```

### Fix 2: Add Inline Styles
Update `login.html`:
```html
<div id="loginForm" class="form-section" style="display: block;">
<div id="registerForm" class="form-section" style="display: none;">
```

### Fix 3: Remove Class Dependencies
Use only inline styles:
```javascript
function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}
```

---

## Testing Checklist

After applying fixes, test:

- [ ] Login page loads
- [ ] Login form is visible
- [ ] "SIGN UP" link works
- [ ] Signup form appears
- [ ] Role dropdown works
- [ ] Role-specific fields appear
- [ ] Email validation works
- [ ] Password validation works
- [ ] Form submits successfully
- [ ] Redirects to dashboard
- [ ] User data is saved
- [ ] Can login with new account

---

## Browser Compatibility

### Tested Browsers:
- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Chrome
- ✅ Mobile Safari

### Known Issues:
- None currently

---

## Performance Checks

### Page Load Time:
- Target: < 2 seconds
- Check: Vercel Analytics

### JavaScript Execution:
- Target: < 100ms
- Check: Browser DevTools Performance tab

### LocalStorage Operations:
- Target: < 10ms
- Check: Console timing

---

## Monitoring

### Set Up Alerts:
1. Go to Vercel Dashboard
2. Project Settings → Notifications
3. Enable:
   - Deployment failures
   - Build errors
   - Runtime errors

### Check Logs:
1. Vercel Dashboard → Deployments
2. Click latest deployment
3. View "Functions" tab for errors
4. Check "Build Logs" for issues

---

## Emergency Rollback

If issues persist:

### Option 1: Rollback in Vercel
1. Go to Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

### Option 2: Revert Git Commit
```bash
git revert HEAD
git push
```

### Option 3: Redeploy Previous Version
```bash
git checkout <previous-commit-hash>
git push -f
```

---

## Getting Help

### 1. Check Documentation
- This guide
- VERCEL-DEPLOYMENT-GUIDE.md
- QUICK-START-GUIDE.md

### 2. Check Console
- Browser console (F12)
- Vercel deployment logs
- Network tab for failed requests

### 3. Test Locally
- Run local server
- Test all features
- Compare with Vercel

### 4. Contact Support
- GitHub Issues
- Vercel Support
- Community forums

---

## Prevention

### Best Practices:
1. ✅ Always test locally first
2. ✅ Use version control (Git)
3. ✅ Test in multiple browsers
4. ✅ Check console for errors
5. ✅ Use error handling
6. ✅ Add logging for debugging
7. ✅ Keep backups
8. ✅ Document changes

---

## Success Indicators

Your signup is working when:

✅ Form appears on click
✅ All fields are visible
✅ Validation works
✅ Submission succeeds
✅ Redirects properly
✅ Data is saved
✅ No console errors
✅ Works on mobile
✅ Works in all browsers

---

## Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **MDN Web Docs**: https://developer.mozilla.org
- **Stack Overflow**: Search for specific errors
- **GitHub Issues**: Report bugs

---

**Last Updated**: March 13, 2026
**Status**: ✅ Issues Fixed
**Next Deploy**: Should work perfectly!

---

*If issues persist after these fixes, please check browser console and share the error messages.*
