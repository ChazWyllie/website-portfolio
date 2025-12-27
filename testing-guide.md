# Portfolio Testing & Deployment Guide

## Pre-Deployment Checklist

### 1. HTML Validation
```bash
# Using W3C Validator online
# Or via Node.js:
npm install -D html-validate
html-validate index.html project1.html project2.html
```

### 2. CSS Validation
```bash
# Check for CSS errors
npm install -D stylelint
stylelint styles.css
```

### 3. JavaScript Linting
```bash
# Install ESLint
npm install -D eslint

# Check for JS errors
eslint js/*.js
```

### 4. Accessibility Testing
```bash
# Install axe DevTools
# Or use Lighthouse in Chrome DevTools
# Check for:
# - ARIA labels
# - Color contrast (WCAG AA)
# - Keyboard navigation
# - Screen reader compatibility
```

### 5. Performance Testing

#### Google Lighthouse (Chrome DevTools)
1. Open DevTools (F12)
2. Navigate to Lighthouse tab
3. Generate report for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

#### WebPageTest
1. Visit webpagetest.org
2. Enter your URL
3. Check:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)
   - First Input Delay (FID)

#### GTmetrix
1. Visit gtmetrix.com
2. Run report
3. Grade Performance Score (target: > 90)

### 6. Cross-Browser Testing

#### Desktop Browsers
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

#### Mobile Browsers
- [ ] Chrome Mobile (iOS/Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet

#### Tablet Testing
- [ ] iPad (various sizes)
- [ ] Android tablets

### 7. Responsive Design Testing

```bash
# Test at breakpoints:
# - 1920px (desktop)
# - 1440px (laptop)
# - 768px (tablet)
# - 480px (mobile)
# - 375px (mobile small)
```

Use Chrome DevTools or BrowserStack for device simulation.

### 8. SEO Testing

#### On-Page SEO
```
Checklist:
✅ Meta description present
✅ Open Graph tags
✅ Structured data (Schema.org)
✅ Mobile-friendly meta viewport
✅ Canonical URL (if applicable)
✅ Sitemap.xml
✅ robots.txt
```

#### Tools
1. **Google Search Console**
   - Submit sitemap
   - Check indexing status
   - Monitor ranking keywords

2. **Lighthouse SEO Audit**
   - Check heading structure
   - Verify links are crawlable
   - Validate meta tags

3. **Screaming Frog**
   - Crawl entire site
   - Find broken links
   - Check redirect chains

### 9. Security Testing

```
Checklist:
✅ No sensitive data in code
✅ HTTPS enabled (for production)
✅ Content Security Policy (CSP) headers
✅ X-Frame-Options header
✅ X-Content-Type-Options: nosniff
✅ No inline event handlers
✅ No eval() or other dangerous functions
```

Use:
- Mozilla Observatory (observatory.mozilla.org)
- OWASP ZAP (free security scanner)

### 10. Analytics Setup

Add to `<head>`:
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Deployment Checklist

### GitHub Pages Setup (Current)

1. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Set source to `main` branch

2. **CNAME Configuration**
   - File already exists: `CNAME`
   - Contains: `chazwyllie.com`

3. **Custom Domain DNS**
   ```
   A records:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
   
   CNAME record:
   - www.chazwyllie.com → chazwyllie.github.io
   ```

4. **HTTPS Enforcement**
   - GitHub Pages auto-provisions SSL certificates
   - Enable "Enforce HTTPS" in repository settings

### Pre-Deployment Testing Locally

```bash
# Start local server
cd /Users/chazwyllie/Git/website-portfolio
python3 -m http.server 8000

# Visit: http://localhost:8000

# Test all features:
# - Navigation links
# - Scroll animations
# - Project cards hover effects
# - Mobile responsiveness
# - Dark mode toggle
# - Form submission (if added)
```

### Git Commit Best Practices

```bash
# Check for uncommitted changes
git status

# Stage changes
git add .

# Commit with meaningful message
git commit -m "feat: implement 2026 web design trends

- Add GSAP scroll animations with ScrollTrigger
- Implement real-time GitHub stats integration
- Add data visualization charts with Chart.js
- Add 3D Vanilla Tilt effects to project cards
- Enhance CSS with micro-interactions and polish
- Add comprehensive error handling and fallbacks"

# Push to GitHub
git push origin main

# GitHub Pages auto-deploys (takes ~1-2 minutes)
```

### Post-Deployment Verification

```
Checklist:
✅ Website loads at custom domain
✅ All animations work smoothly
✅ GitHub stats display correctly
✅ Charts render properly
✅ Mobile menu toggles smoothly
✅ Links navigate correctly
✅ No console errors (check DevTools)
✅ Google Analytics tracking working
```

## Monitoring & Maintenance

### Weekly Checks
- [ ] Monitor GitHub API rate limits (github-stats)
- [ ] Check browser console for errors
- [ ] Verify all links are working

### Monthly Checks
- [ ] Update CDN library versions
- [ ] Review analytics data
- [ ] Check for security vulnerabilities

### Quarterly Checks
- [ ] Run full Lighthouse audit
- [ ] Update dependencies
- [ ] Performance benchmarking

## Troubleshooting

### Charts Not Rendering
**Problem**: Canvas elements show blank
**Solution**:
1. Check browser console for errors
2. Verify Chart.js CDN is loaded
3. Check canvas IDs match in HTML and JS
4. Clear browser cache (Cmd+Shift+R)

### Animations Not Working
**Problem**: Scroll animations appear static
**Solution**:
1. Check GSAP and ScrollTrigger CDN
2. Verify `prefers-reduced-motion` setting
3. Test on different browser
4. Check for JavaScript errors in console

### GitHub Stats Showing "—"
**Problem**: GitHub integration not fetching data
**Solution**:
1. Check GitHub API rate limits (60 requests/hour)
2. Verify network connection
3. Check browser CORS policy
4. Clear sessionStorage cache
5. Try in incognito window

### Mobile Menu Not Working
**Problem**: Menu doesn't toggle or stays stuck
**Solution**:
1. Check JavaScript console for errors
2. Verify event listeners are attached
3. Test on different mobile device
4. Check CSS `z-index` conflicts

## Performance Optimization Checklist

### Images
- [ ] Compress all images
- [ ] Use WebP format with fallbacks
- [ ] Implement lazy loading
- [ ] Add responsive image sizes

### CSS
- [ ] Minify and concatenate
- [ ] Remove unused styles
- [ ] Use CSS Grid/Flexbox (no floats)
- [ ] Optimize font loading

### JavaScript
- [ ] Minify and uglify
- [ ] Lazy load non-critical scripts
- [ ] Tree-shake unused code
- [ ] Implement code splitting

### Server
- [ ] Enable Gzip compression
- [ ] Set appropriate cache headers
- [ ] Use CDN for static assets
- [ ] Enable HTTP/2 push

## Summary

This portfolio is production-ready with:
- ✅ Modern 2026 design trends
- ✅ Comprehensive testing guidelines
- ✅ Performance optimization strategies
- ✅ Accessibility compliance (WCAG AA)
- ✅ SEO best practices
- ✅ Security hardening
- ✅ Easy deployment process
- ✅ Monitoring and maintenance plan
