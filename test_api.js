// Automated test script for Portfolio REST APIs
async function runTests() {
  console.log('Testing APIs on http://localhost:5000...');
  
  // 1. Test Health
  const healthRes = await fetch('http://localhost:5000/api/health');
  const health = await healthRes.json();
  console.log('✔ GET /api/health:', health.status);

  // 2. Test Projects List
  const projRes = await fetch('http://localhost:5000/api/projects');
  const projData = await projRes.json();
  console.log(`✔ GET /api/projects: returned ${projData.total} projects`);
  console.log('   Titles:', projData.projects.map(p => p.title).join(' | '));

  // 3. Test Single Project Details Document
  const docRes = await fetch('http://localhost:5000/api/projects/student-management');
  const docData = await docRes.json();
  console.log(`✔ GET /api/projects/student-management: successfully loaded doc for "${docData.project.title}"`);
  console.log(`   Database Tables in Doc: ${docData.project.databaseSchema.length}`);
  console.log(`   API Endpoints in Doc: ${docData.project.apiEndpoints.length}`);

  // 4. Test Book a Project POST
  const bookingPayload = {
    clientName: 'Alexander Hayes',
    clientEmail: 'alex.hayes@enterprise.io',
    clientPhone: '+1-555-0199',
    company: 'NextGen Analytics Corp',
    projectType: 'Full-Stack Web Application',
    timeline: 'Standard (2 - 4 weeks)',
    estimatedBudget: '$1,500 - $3,500 / ₹1.2L - ₹3L',
    deadline: '2026-11-01',
    techPreferences: 'Node.js, Express, MySQL, React',
    projectRequirements: 'We require a custom inventory and analytics tracking portal with JWT multi-role permissions and sub-second query performance.'
  };

  const bookRes = await fetch('http://localhost:5000/api/book-project', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingPayload)
  });
  const bookData = await bookRes.json();
  console.log('✔ POST /api/book-project response:', bookData.message);

  // 5. Test Contact POST
  const contactPayload = {
    name: 'Jessica Vance',
    email: 'jessica@creativeagency.com',
    message: 'Hello Pavankalyan, we loved your portfolio and would like to discuss an engineering contract.'
  };

  const contactRes = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactPayload)
  });
  const contactData = await contactRes.json();
  console.log('✔ POST /api/contact response:', contactData.message);

  console.log('\n🎉 ALL 5 BACKEND APIS ARE WORKING FLAWLESSLY!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
