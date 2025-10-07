# 🔐 Investor Portal Access

## Access Information

The investor portal at `/investidores` is password-protected to ensure confidential information remains secure.

### Access Code

```
GREENCHECK222
```

> **Note**: This code is case-insensitive and stored in the frontend for MVP demonstration purposes. In production, this should be validated via a secure backend API.

## How It Works

1. **User Flow**:
   - User navigates to `/investidores/acesso`
   - Enters access code
   - Upon successful verification, access is stored in `localStorage`
   - User is redirected to `/investidores`

2. **Access Check**:
   - Every time `/investidores` is accessed, the page checks for `greencheck_investor_access` in localStorage
   - If not present, user is redirected to `/investidores/acesso`

3. **Contact Information**:
   - Email: **partners@greencheck.pt**
   - Phone: **+351 931 721 901**

## Testing

To test the access flow:

1. Navigate to: `http://localhost:5000/investidores`
   - You'll be redirected to the access page

2. Enter the code: `GREENCHECK222`
   - You'll be granted access and redirected to the investor portal

3. To reset access (logout):
   - Open browser console
   - Run: `localStorage.removeItem('greencheck_investor_access')`
   - Refresh the page

## Security Notes

⚠️ **For MVP/Development Only**

This implementation is suitable for MVP demonstration. For production:

- [ ] Move access validation to backend API
- [ ] Implement proper JWT authentication
- [ ] Add rate limiting for login attempts
- [ ] Use encrypted tokens instead of plain localStorage
- [ ] Implement session expiration
- [ ] Add audit logging for access attempts
- [ ] Consider multi-factor authentication for sensitive materials

## Design

The access page follows the GreenCheck design system:
- ✅ Minimalista e elegante (Apple-style)
- ✅ Cores consistentes: `#044050`, `#5FA037`, `#E5FFBA`
- ✅ Animações suaves com Framer Motion
- ✅ Mobile-first e totalmente responsivo
- ✅ Feedback visual claro (loading, success, error states)

## Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/investidores/acesso` | Access gate with password input | Public |
| `/investidores` | Investor portal with confidential materials | Protected |

---

**Last Updated**: October 2025  
**Status**: MVP Implementation

