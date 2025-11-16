# 🚀 DEPLOYMENT & LAUNCH GUIDE

**Web App Version:** 1.0.0  
**Framework:** v2.2.1 INTEGRATED  
**Date:** November 16, 2025  
**Status:** ✅ READY FOR PRODUCTION

---

## 📦 COMPLETE DELIVERABLE PACKAGE

### Files Included

#### Core Application Files
```
✅ index.html             - Main application shell (1 file)
✅ css/main.css           - Stylesheet with design system (1 file)
✅ js/core.js             - Navigation engine
✅ js/data.js             - Data store module
✅ js/dashboard.js        - Dashboard module
✅ js/timeline.js         - Timeline module  
✅ js/map.js              - Map module (Leaflet)
✅ js/categories.js       - Categories module
✅ js/statistics.js       - Statistics module
✅ js/impact.js           - Impact analysis module
✅ js/sources.js          - Sources module
```

#### Data Files (JSON)
```
✅ data_master.json         - Combined dataset (162 attacks)
✅ data_refineries.json     - 50 refinery attacks
✅ data_power_plants.json   - 7 power plant attacks
✅ data_substations.json    - 14 substation attacks
✅ data_ports.json          - 7 port terminal attacks
✅ data_defense.json        - 5 defense facility attacks
✅ data_fuel.json           - 11 fuel depot attacks
```

#### Documentation
```
✅ index.html               - Application (with embedded scripts)
✅ README.md                - Feature documentation
✅ CHANGELOG.md             - Version history
✅ DEPLOYMENT.md            - This file
```

### Total Package Size
- **HTML + CSS + JS:** ~150 KB
- **JSON Data:** ~85 KB
- **External libraries:** CDN hosted (Chart.js, Leaflet, Font Awesome)
- **Total:** ~235 KB core files

---

## 🎯 QUICK START

### Option 1: Direct File Opening (Simplest)

1. Extract all files maintaining folder structure:
   ```
   project-folder/
   ├── index.html
   ├── css/main.css
   ├── js/*.js (all JavaScript files)
   └── data_*.json (all JSON files)
   ```

2. Open `index.html` in web browser:
   - Double-click `index.html`
   - Or: Right-click → Open With → Browser

3. ⚠️ **Issue:** May encounter CORS errors loading JSON
   **Solution:** Use Option 2 below

### Option 2: Local Web Server (Recommended)

#### Using Python 3
```bash
# Navigate to project folder
cd /path/to/ukrainian-attacks

# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

#### Using Python 2
```bash
python -m SimpleHTTPServer 8000
```

#### Using Node.js
```bash
# Install if needed
npm install -g http-server

# Run
cd /path/to/ukrainian-attacks
http-server -p 8000

# Then open: http://localhost:8000
```

#### Using PHP
```bash
cd /path/to/ukrainian-attacks
php -S localhost:8000

# Then open: http://localhost:8000
```

#### Using Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens automatically on http://127.0.0.1:5500

---

## ☁️ CLOUD DEPLOYMENT

### Option 1: GitHub Pages (Free + Easy)

**Step 1:** Create GitHub Account
- Go to github.com
- Sign up (free)

**Step 2:** Create Repository
- Click "New" → Name: `ukrainian-attacks`
- Add description
- Public repository

**Step 3:** Upload Files
- Click "Upload files"
- Drag and drop all project files
- Or use Git CLI

**Step 4:** Enable Pages
- Settings → Pages
- Source: `main` branch
- Save

**Step 5:** Access Your App
- URL: `https://yourusername.github.io/ukrainian-attacks`
- Share this link for live stream

**Cost:** FREE ✅
**Bandwidth:** Unlimited
**Support:** GitHub community

---

### Option 2: Netlify (Free + Advanced)

**Step 1:** Sign Up
- Go to netlify.com
- Sign up with GitHub

**Step 2:** Connect Repository
- Connect your GitHub repo
- Auto-deploys on push

**Step 3:** Configure (Optional)
- Build command: (leave blank)
- Publish directory: `.` (current)

**Step 4:** Deploy
- Netlify auto-deploys
- Get custom domain
- Share URL

**Cost:** FREE ✅
**Features:** Auto SSL, Analytics, Forms

---

### Option 3: Vercel (Free + Fast)

**Step 1:** Sign Up
- Go to vercel.com
- Login with GitHub

**Step 2:** Import Project
- Click "New Project"
- Select your GitHub repo

**Step 3:** Deploy
- Click Deploy
- Vercel builds automatically

**Step 4:** Share
- Get URL: `ukrainian-attacks-x.vercel.app`
- Custom domain available

**Cost:** FREE ✅
**Performance:** Optimized CDN

---

### Option 4: AWS S3 + CloudFront (Enterprise)

**Step 1:** Create S3 Bucket
```bash
aws s3 mb s3://ukrainian-attacks-prod --region us-east-1
```

**Step 2:** Upload Files
```bash
aws s3 sync . s3://ukrainian-attacks-prod --exclude ".git/*"
```

**Step 3:** Enable Static Website
```bash
aws s3 website s3://ukrainian-attacks-prod \
  --index-document index.html \
  --error-document index.html
```

**Step 4:** CloudFront Distribution
- Create distribution pointing to S3
- Configure SSL certificate
- Set cache headers

**Cost:** ~$0.50-5/month depending on traffic
**Performance:** Global CDN
**Features:** DDoS protection, WAF support

---

## 📺 FOR YOUTUBE LIVE STREAMING

### Pre-Stream Setup

1. **Test URL Access**
   ```
   Navigate to your deployed URL
   Test all 7 tabs work correctly
   Verify maps load
   Check charts display
   ```

2. **Adjust Browser Zoom** (if streaming)
   ```
   Zoom: 100% for 1920x1080
   Or: 125% for better visibility
   Test on same resolution as stream
   ```

3. **Keyboard Shortcuts**
   ```
   Tab Key: Navigate between tabs
   Arrow Keys: Scroll within tabs
   F11: Fullscreen browser
   Ctrl+Shift+I: DevTools (hide before stream)
   ```

4. **Presentation Mode**
   - Navigate to Impact tab
   - Click charts to zoom in
   - Use calculator for live demos
   - Toggle between tabs smoothly

### During Stream

1. **Share Screen**
   - OBS/Streamlabs: Add "Browser" source
   - Input URL: `https://yourusername.github.io/ukrainian-attacks`
   - Set resolution: 1920x1080
   - Refresh before stream starts

2. **Pointer Visibility**
   - Use mouse cursor highlighting
   - Or draw circles in OBS
   - Highlight important chart areas

3. **Talking Points**
   - Reference specific attacks by date
   - Use maps to show penetration distance
   - Show impact calculations in real-time
   - Compare regions in statistics tab

### Post-Stream Archive

- Video automatically saved to YouTube
- Embed link in video description
- Pin comment with app URL
- Provide download links to data

---

## 🔄 UPDATING DATA

### Adding New Attacks

**Step 1:** Edit JSON File
- Open `data_fuel.json` (or appropriate category)
- Add entry with all fields:
  ```json
  {
    "date": "2025-11-16",
    "location": "New Target",
    "region": "Region Name",
    "coordinates": [lat, lon],
    "type": "Type",
    "attack_type": "Drone attack",
    "damage": "Description",
    "status": "Status",
    "distance_km": 250,
    "category": "Fuel_Depots"
  }
  ```

**Step 2:** Update Master Data
- Also add to `data_master.json`

**Step 3:** Verify
- Reload browser (Ctrl+Shift+R)
- Check in relevant category tab
- Verify appears in map and timeline

**Step 4:** Commit & Deploy
```bash
git add data_*.json
git commit -m "Add new attack: [Location] - [Date]"
git push
# GitHub Pages auto-deploys
```

---

## 🐛 TROUBLESHOOTING

### Issue: JSON Files Not Loading (CORS Error)

**Symptoms:**
- Charts show empty
- No attacks appear
- Console error: "CORS" or "fetch failed"

**Solutions:**
1. Use local web server (see Option 2 above)
2. Or: Embed JSON directly in JavaScript
3. Or: Use GitHub Pages/Netlify (handles CORS)

### Issue: Maps Not Displaying

**Symptoms:**
- Map tab shows gray area
- No markers visible

**Solutions:**
1. Check internet connection (Leaflet needs CDN)
2. Verify Leaflet CDN link in index.html
3. Check browser console for errors
4. Try different browser

### Issue: Charts Rendering Slowly

**Symptoms:**
- Charts take 2+ seconds to appear
- Animations stutter

**Solutions:**
1. Check browser is up-to-date
2. Close other browser tabs
3. Disable browser extensions
4. Try different browser
5. Update Chart.js library link

### Issue: Mobile View Broken

**Symptoms:**
- Layout looks wrong on phone
- Text overlaps
- Can't scroll properly

**Solutions:**
1. Check viewport meta tag in HTML
2. Ensure CSS media queries included
3. Test on actual device
4. Use Chrome DevTools mobile view

---

## 📊 MONITORING & ANALYTICS

### Track Usage

**GitHub Pages:**
- Settings → Pages → Insights

**Netlify:**
- Dashboard → Analytics
- Visitor tracking
- Performance metrics

**Vercel:**
- Dashboard → Analytics
- Real-time traffic
- Error tracking

---

## 🔐 SECURITY CHECKLIST

- ✅ All data is public/verified
- ✅ No private information exposed
- ✅ No backend API keys (all client-side)
- ✅ HTTPS enforced (GitHub/Netlify/Vercel automatic)
- ✅ No cookies or tracking (framework requirement)
- ✅ No external API calls
- ✅ Content Security Policy compatible
- ✅ Safe for public/educational use

---

## 📈 PERFORMANCE OPTIMIZATION

### Enable Caching
```nginx
# Nginx
location ~* \.(json|js|css)$ {
    expires 7d;
    add_header Cache-Control "public, immutable";
}
```

### Enable Compression
```nginx
gzip on;
gzip_types application/json text/css application/javascript;
gzip_min_length 1000;
```

### CDN Configuration
- CloudFront / CloudFlare
- Set TTL: 3600 seconds
- Minify CSS/JS (optional)
- Compress images (if added)

---

## 📞 SUPPORT RESOURCES

### Documentation
- README.md - Feature overview
- CHANGELOG.md - Version history
- Code comments - Inline documentation

### Troubleshooting
- Browser console (F12) for errors
- GitHub Issues for bug reports
- Stack Overflow for web development help

### Community
- GitHub Discussions
- Reddit r/dataisbeautiful
- Twitter @YourHandle

---

## ✅ LAUNCH CHECKLIST

Before going live on YouTube:

- [ ] All 7 tabs load correctly
- [ ] Maps display with markers
- [ ] Charts render smoothly
- [ ] Recent attacks list populates
- [ ] Filters work (category, region)
- [ ] Export buttons functional
- [ ] URL is shareable
- [ ] Mobile view works
- [ ] Tested on actual device
- [ ] Performance <2.5s load time
- [ ] No console errors (F12)
- [ ] YouTube description updated
- [ ] Download links posted
- [ ] Sources cited properly

---

## 🎥 LIVE STREAM SCRIPT OUTLINE

**Duration:** 15-30 minutes

1. **Introduction** (1 min)
   - Welcome
   - Show URL on screen
   - Explain what app tracks

2. **Dashboard Tab** (3 min)
   - Highlight key stats
   - Explain chart symbols
   - Show trend analysis

3. **Map Tab** (5 min)
   - Point out geographic spread
   - Show distance penetration
   - Highlight hotspots (Krasnodar, etc.)
   - Use category filters

4. **Category Deep-Dive** (10 min)
   - Select one category (e.g., Substations)
   - Explain capacity lost
   - Show repeated targets (Balashovskaya)
   - Discuss strategic impact

5. **Impact Calculator** (3 min)
   - Show economic impact calculation
   - Enter Brent oil price
   - Calculate damages
   - Explain significance

6. **Sources** (2 min)
   - List Russian official sources
   - Explain cross-verification
   - Mention international sources
   - Download options

7. **Q&A / Conclusion** (1-2 min)
   - Answer questions
   - Thank viewers
   - Share app link
   - Promote next stream

---

## 📚 ADDITIONAL RESOURCES

### Data Files to Reference
- data_refineries.json - 50 attacks
- data_substations.json - 14 attacks (most recent)
- data_ports.json - Export impact analysis
- data_defense.json - Military production impact

### Statistics to Highlight
- 162+ attacks documented
- 50+ sources verified
- 1,900 km maximum penetration
- 26,327 MVA capacity lost
- 3.74M bbl/day export disrupted
- 2 NPPs targeted (no major damage)

### Key Talking Points
- Systematically degrading Russian energy infrastructure
- Repeated attacks on strategic targets (Balashovskaya 3x, Vladimirskaya 2x)
- Drone technology evolution (single to 221-drone swarms)
- Economic impact: ~$200M/month in oil losses
- Military supply chain pressure increasing

---

## 🚀 FINAL STEPS

1. **Deploy App** (use Option 1, 2, or 3 above)
2. **Test Everything** (run through checklist)
3. **Schedule Stream** (announce date/time)
4. **Prepare Talking Points** (practice flow)
5. **Go Live** (share app during stream)
6. **Post-Stream** (update archive description with app link)

---

**Status:** ✅ READY TO LAUNCH
**Last Updated:** November 16, 2025
**Framework:** v2.2.1 INTEGRATED
**Support:** All documentation included