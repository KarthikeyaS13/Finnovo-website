const fs = require('fs');
const path = require('path');

const srcDashboard = '/home/surendra/.gemini/antigravity/brain/2c8178b3-240f-4d95-9e39-8996b632a15e/dashboard_mockup_1781614837021.png';
const destDashboard = '/home/surendra/Karthikeya/finnovo-design-6/public/dashboard_mockup.png';

const srcGlobe = '/home/surendra/.gemini/antigravity/brain/2c8178b3-240f-4d95-9e39-8996b632a15e/globe_mockup_1781614854162.png';
const destGlobe = '/home/surendra/Karthikeya/finnovo-design-6/public/globe_mockup.png';

const srcEmpowering = '/home/surendra/.gemini/antigravity/brain/6812f983-e2a2-4c3b-b54b-81d77771dc11/media__1781680102793.png';
const destEmpowering = '/home/surendra/Karthikeya/finnovo-design-6/public/empowering_financial.png';

try {
  fs.copyFileSync(srcDashboard, destDashboard);
  console.log('Dashboard mockup copied successfully!');
  fs.copyFileSync(srcGlobe, destGlobe);
  console.log('Globe mockup copied successfully!');
  fs.copyFileSync(srcEmpowering, destEmpowering);
  console.log('Empowering Financial image copied successfully!');
  
  const srcDisruption = '/home/surendra/Karthikeya/finnovo-design-6/public/disruption.png';
  const destDisruption = '/home/surendra/Karthikeya/finnovo-design-6/public/zero_disruption.png';
  if (fs.existsSync(srcDisruption)) {
    fs.copyFileSync(srcDisruption, destDisruption);
    console.log('Disruption image duplicated to zero_disruption.png successfully!');
  }
} catch (err) {
  console.error('Error copying assets:', err.message);
}
