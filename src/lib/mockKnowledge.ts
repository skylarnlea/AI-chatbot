// Comprehensive Cheil Employee Handbook (Demo Content)
// Realistic but fictional policies for showcase purposes
export interface PolicyDocument {
  id: string
  title: string
  content: string
  category: string
  keywords: string[]
  lastUpdated?: string
  section?: string
}

export const mockPolicies: PolicyDocument[] = [
  // COMPANY OVERVIEW & CULTURE
  {
    id: 'company-mission',
    title: 'Cheil Mission & Core Values',
    content: 'At Cheil, we are a global creative marketing company dedicated to delivering innovative brand experiences. Our mission is to create meaningful connections between brands and consumers through creative excellence, strategic thinking, and technological innovation. Our core values include: Creative Excellence - We strive for breakthrough ideas that move people and markets; Collaborative Spirit - We believe the best work comes from diverse perspectives working together; Client Partnership - We act as true partners, invested in our clients\' success; Continuous Learning - We embrace change and constantly evolve our capabilities; Global Perspective - We think globally while acting locally in every market we serve.',
    category: 'Company Culture',
    keywords: ['mission', 'values', 'culture', 'creative', 'innovation', 'excellence', 'collaboration'],
    lastUpdated: '2024-01-15',
    section: 'Introduction'
  },
  {
    id: 'diversity-inclusion',
    title: 'Diversity, Equity & Inclusion',
    content: 'Cheil is committed to fostering a diverse, equitable, and inclusive workplace where every employee can thrive. We believe diverse perspectives drive better creative solutions and business outcomes. Our DEI commitments include: Equal opportunity employment regardless of race, gender, age, religion, sexual orientation, or disability status; Inclusive hiring practices with diverse interview panels; Employee Resource Groups (ERGs) supporting underrepresented communities; Unconscious bias training for all managers; Regular pay equity audits; Mentorship programs connecting diverse talent with senior leaders. Report any concerns to HR at dei@cheil.com or through our anonymous hotline: 1-800-CHEIL-DEI.',
    category: 'Company Culture',
    keywords: ['diversity', 'inclusion', 'equity', 'dei', 'equal opportunity', 'bias', 'mentorship'],
    lastUpdated: '2024-02-01'
  },

  // TIME OFF & LEAVE POLICIES
  {
    id: 'vacation-policy',
    title: 'Vacation & Paid Time Off',
    content: 'Cheil offers generous PTO to support work-life balance. Full-time employees accrue vacation time as follows: Years 1-2: 15 days (3 weeks) annually; Years 3-5: 20 days (4 weeks) annually; Years 6+: 25 days (5 weeks) annually. PTO accrues monthly and can be carried over up to 5 days into the next year. Vacation requests should be submitted through Workday at least 2 weeks in advance for approval. During busy campaign periods (typically Q4), vacation may be restricted with 30-day advance notice. New employees can take PTO after 90 days of employment. We also observe 12 company holidays plus 2 floating holidays annually.',
    category: 'Time Off',
    keywords: ['vacation', 'pto', 'time off', 'holidays', 'work-life balance', 'accrual'],
    lastUpdated: '2024-01-10'
  },
  {
    id: 'sick-leave',
    title: 'Sick Leave & Medical Time Off',
    content: 'Employees accrue sick leave at 1 hour per 30 hours worked, up to 80 hours (10 days) annually. Sick leave can be used for: Personal illness or injury; Medical appointments; Caring for immediate family members (spouse, children, parents); Mental health days (up to 3 per year). No advance notice required for sick leave, but notify your manager as soon as possible. For extended medical leave (3+ consecutive days), a doctor\'s note may be required. Unused sick leave carries over year to year up to 120 hours maximum. For serious health conditions, see our FMLA policy or contact HR at benefits@cheil.com.',
    category: 'Time Off',
    keywords: ['sick leave', 'medical', 'illness', 'mental health', 'fmla', 'family care'],
    lastUpdated: '2024-01-10'
  },
  {
    id: 'parental-leave',
    title: 'Parental Leave Policy',
    content: 'Cheil supports growing families with comprehensive parental leave. Birth mothers receive 12 weeks fully paid leave plus 4 weeks at 60% pay. Non-birth parents (including adoptive parents) receive 6 weeks fully paid leave. Leave can be taken within 12 months of birth/adoption and doesn\'t need to be consecutive. During leave, we maintain health insurance benefits and guarantee job return. Employees can request flexible return-to-work arrangements including part-time schedules or remote work. We also provide lactation rooms in all offices and up to $500 reimbursement for breast pumps. Contact HR at least 30 days before expected leave date to begin planning.',
    category: 'Time Off',
    keywords: ['parental leave', 'maternity', 'paternity', 'adoption', 'family', 'lactation'],
    lastUpdated: '2024-01-15'
  },

  // WORK ARRANGEMENTS
  {
    id: 'hybrid-work',
    title: 'Hybrid Work Policy',
    content: 'Cheil embraces flexible work arrangements to attract top talent and support work-life balance. Our hybrid model allows: Creative and strategy teams: 3 days in office, 2 days remote; Account and client service teams: 4 days in office, 1 day remote; Leadership and new employees (first 6 months): 4-5 days in office for collaboration and mentoring. Remote work days must be pre-scheduled in Slack. Core collaboration hours are 10 AM - 3 PM local time when all team members should be available. Home office setup stipend of $750 for equipment and ergonomic furniture. Monthly $50 reimbursement for internet and phone. Quarterly team building events to maintain culture and connection.',
    category: 'Work Arrangements',
    keywords: ['hybrid', 'remote work', 'flexible', 'work from home', 'core hours', 'stipend'],
    lastUpdated: '2024-03-01'
  },
  {
    id: 'office-hours',
    title: 'Working Hours & Overtime',
    content: 'Standard working hours are 9:00 AM to 6:00 PM, Monday through Friday (40 hours/week). Flexible start times between 8:00-10:00 AM are permitted with manager approval. During campaign launches or client emergencies, overtime may be required. Non-exempt employees receive 1.5x pay for hours over 40/week. Exempt employees who work significant overtime (15+ extra hours/week) are eligible for comp time off or overtime meals/transportation. We respect work-life balance - consistent excessive overtime should be discussed with HR. All employees are expected to take a proper lunch break and avoid working late nights regularly.',
    category: 'Work Arrangements',
    keywords: ['working hours', 'overtime', 'flexible schedule', 'comp time', 'work-life balance'],
    lastUpdated: '2024-01-01'
  },

  // COMPENSATION & BENEFITS
  {
    id: 'compensation-philosophy',
    title: 'Compensation Philosophy',
    content: 'Cheil is committed to fair, competitive, and transparent compensation. We conduct annual market salary reviews using industry benchmarks from creative agencies and consulting firms. Pay bands are established for each role level with clear criteria for advancement. Performance reviews occur twice yearly with salary adjustments based on: Individual performance and goal achievement; Market rate changes; Internal equity; Budget considerations. We offer equity participation for senior roles and high performers. Salary information is confidential but we encourage open discussions about career growth and compensation goals with your manager.',
    category: 'Compensation',
    keywords: ['salary', 'compensation', 'pay bands', 'performance review', 'equity', 'market rate'],
    lastUpdated: '2024-02-15'
  },
  {
    id: 'health-benefits',
    title: 'Health & Wellness Benefits',
    content: 'Cheil provides comprehensive health coverage starting on your first day. Medical insurance: 90% company paid premiums with choice of PPO or HMO plans; Dental coverage: 100% company paid with orthodontics included; Vision coverage: 100% company paid including designer frame allowance; Mental health: Covered therapy sessions plus Employee Assistance Program; Health Savings Account: Company contributes $1,200 annually for individuals, $2,400 for families. Wellness perks include: On-site fitness classes and meditation rooms; Healthy snack programs; Annual health screenings; Wellness challenges with prizes; Gym membership reimbursement up to $75/month.',
    category: 'Benefits',
    keywords: ['health insurance', 'medical', 'dental', 'vision', 'wellness', 'hsa', 'mental health'],
    lastUpdated: '2024-01-01'
  },
  {
    id: 'retirement-401k',
    title: '401(k) Retirement Plan',
    content: 'Cheil offers a robust 401(k) plan to help you build long-term wealth. Company matching: 100% match on first 3% contributed, 50% match on next 2% (total 4% company contribution); Immediate vesting: All company contributions vest immediately; Investment options: 20+ low-cost index funds and target-date funds through Fidelity; Financial planning: Free consultation sessions with retirement advisors; Roth option: Available for after-tax contributions; Automatic enrollment: New employees enrolled at 6% contribution rate (can opt out). You can adjust contributions anytime through the Fidelity website. Take advantage of the full match - it\'s free money toward your retirement!',
    category: 'Benefits',
    keywords: ['401k', 'retirement', 'matching', 'vesting', 'fidelity', 'roth', 'financial planning'],
    lastUpdated: '2024-01-01'
  },

  // PROFESSIONAL DEVELOPMENT
  {
    id: 'learning-development',
    title: 'Learning & Development',
    content: 'Cheil invests in your professional growth with comprehensive L&D programs. Annual learning budget: $2,000 per employee for courses, conferences, certifications; Internal training: Monthly "Cheil University" sessions on creative trends, client management, and leadership skills; Mentorship program: Pairing junior employees with senior leaders across disciplines; Conference attendance: Encouraged attendance at Cannes Lions, CES, SXSW, and industry events; Skill-building: Subscriptions to LinkedIn Learning, MasterClass, and creative software training; Career pathing: Annual development planning sessions with clear advancement criteria; Cross-functional projects: Opportunities to work with different teams and build diverse skills.',
    category: 'Professional Development',
    keywords: ['learning', 'development', 'training', 'mentorship', 'conferences', 'career growth'],
    lastUpdated: '2024-02-01'
  },
  {
    id: 'tuition-reimbursement',
    title: 'Tuition Reimbursement Program',
    content: 'Cheil supports continued education through our tuition reimbursement program. Eligible expenses: Graduate degrees, professional certifications, and relevant undergraduate courses; Reimbursement rates: 100% for A grades, 80% for B grades, 50% for C grades (must maintain 3.0 GPA); Annual maximum: $5,000 per employee with manager and HR approval; Commitment requirement: 2-year employment commitment after course completion; Approved fields: Marketing, advertising, business, design, technology, and communications; Application process: Submit pre-approval form with course catalog and schedule at least 30 days before enrollment. Contact learning@cheil.com for applications and questions.',
    category: 'Professional Development',
    keywords: ['tuition reimbursement', 'education', 'graduate degree', 'certification', 'learning'],
    lastUpdated: '2024-01-15'
  },

  // TECHNOLOGY & EQUIPMENT
  {
    id: 'it-equipment',
    title: 'Technology & Equipment Policy',
    content: 'Cheil provides industry-standard technology to support your work. Standard equipment includes: MacBook Pro or Dell XPS laptop with 16GB RAM minimum; External monitor (27" 4K for creative roles); iPhone or Android device with unlimited plan; Creative software licenses (Adobe Creative Suite, Figma, Sketch); Ergonomic accessories (keyboard, mouse, monitor stand, chair); Equipment refresh cycle: Laptops every 3 years, phones every 2 years, monitors every 5 years. Personal use of company devices is permitted within reason. All equipment remains company property and must be returned upon termination. For technical support, contact IT helpdesk at help@cheil.com or extension 4357.',
    category: 'Technology',
    keywords: ['laptop', 'equipment', 'macbook', 'iphone', 'adobe', 'it support', 'refresh cycle'],
    lastUpdated: '2024-03-01'
  },
  {
    id: 'data-security',
    title: 'Data Security & Privacy',
    content: 'Protecting client and company data is everyone\'s responsibility. Security requirements include: Strong passwords (12+ characters, unique for each system) with MFA enabled on all accounts; VPN usage required for remote work and public WiFi; Confidential client information must never be shared externally or stored on personal devices; Regular security training completion (quarterly modules); Immediate reporting of suspected phishing, malware, or data breaches to security@cheil.com; Device encryption and automatic screen locks after 10 minutes; No personal cloud storage (Dropbox, Google Drive) for work files - use company-approved SharePoint. Violations may result in disciplinary action up to termination.',
    category: 'Technology',
    keywords: ['security', 'privacy', 'passwords', 'vpn', 'mfa', 'confidential', 'data breach'],
    lastUpdated: '2024-02-15'
  },

  // WORKPLACE POLICIES
  {
    id: 'code-of-conduct',
    title: 'Code of Conduct & Ethics',
    content: 'All Cheil employees must maintain the highest standards of professional conduct. Our code includes: Respect and inclusion - Treat all colleagues, clients, and partners with dignity regardless of background; Conflict of interest - Disclose any personal relationships or financial interests that could affect business decisions; Confidentiality - Protect proprietary information, client data, and competitive intelligence; Anti-harassment - Zero tolerance for harassment, discrimination, or retaliation; Substance abuse - No alcohol or drugs during work hours (except company-sponsored events); Gift policy - Gifts over $50 value must be reported to HR. Violations should be reported to HR immediately or through our anonymous ethics hotline at 1-800-ETHICS-1.',
    category: 'Workplace Policies',
    keywords: ['conduct', 'ethics', 'respect', 'harassment', 'discrimination', 'confidentiality'],
    lastUpdated: '2024-01-01'
  },
  {
    id: 'expense-reimbursement',
    title: 'Business Expense Policy',
    content: 'Cheil reimburses legitimate business expenses incurred while performing job duties. Reimbursable expenses include: Client entertainment and meals (with business purpose documented); Business travel including flights, hotels, ground transportation, and meals; Professional development courses, books, and conference fees; Office supplies and equipment not provided by company; Internet and phone bills for remote workers. Expense guidelines: Pre-approval required for expenses over $500; Submit receipts within 30 days through Concur; Alcohol limit of $50 per person for client entertainment; Economy travel for flights under 6 hours; Hotel rates should not exceed $300/night without approval. Contact finance@cheil.com with questions.',
    category: 'Finance',
    keywords: ['expenses', 'reimbursement', 'travel', 'receipts', 'concur', 'client entertainment'],
    lastUpdated: '2024-01-10'
  },

  // CREATIVE & CLIENT WORK
  {
    id: 'creative-process',
    title: 'Creative Development Process',
    content: 'Our creative process ensures consistent quality and client satisfaction. Standard workflow includes: Creative brief review and strategy alignment; Concept development with cross-functional team input; Internal creative reviews at 25%, 50%, and 90% completion; Client presentation preparation with account team; Revision cycles with clear feedback documentation; Final asset delivery and archival. Creative standards: All work must align with brand guidelines and creative brief; Concepts should be original and legally cleared; Presentation materials must follow Cheil templates; Client feedback should be incorporated thoughtfully with rationale for changes. For urgent projects, this process can be accelerated with CD approval.',
    category: 'Creative Process',
    keywords: ['creative process', 'workflow', 'brief', 'concept', 'review', 'client presentation'],
    lastUpdated: '2024-02-01'
  },
  {
    id: 'client-communication',
    title: 'Client Communication Guidelines',
    content: 'Professional client relationships are essential to our success. Communication best practices include: Response times - Acknowledge emails within 4 hours, provide substantive responses within 24 hours; Meeting etiquette - Join calls 2-3 minutes early, mute when not speaking, follow up with recap notes; Status updates - Provide proactive project updates weekly or when milestones are reached; Escalation path - Involve account leads for budget changes, timeline issues, or scope modifications; Documentation - Keep detailed records of all client conversations and decisions in project management tools; Professional tone - Maintain courteous, solution-oriented communication even during challenging situations.',
    category: 'Client Relations',
    keywords: ['client communication', 'response time', 'meetings', 'status updates', 'documentation'],
    lastUpdated: '2024-01-15'
  },

  // OFFICE LIFE & FACILITIES
  {
    id: 'office-amenities',
    title: 'Office Amenities & Facilities',
    content: 'Our offices are designed to inspire creativity and collaboration. Available amenities include: Open collaborative spaces with writable walls and mobile furniture; Quiet focus rooms for individual work and phone calls; Fully equipped kitchen with coffee, tea, snacks, and healthy options; Game room with ping pong, video games, and comfortable seating; Outdoor terraces and rooftop spaces (weather permitting); Bike storage and shower facilities for commuters; Nursing/lactation rooms with comfortable seating and refrigeration; Print center with high-quality color printing and binding services. Office hours are 6 AM - 10 PM with badge access. After-hours access requires security approval.',
    category: 'Office Life',
    keywords: ['office amenities', 'kitchen', 'game room', 'terraces', 'bike storage', 'print center'],
    lastUpdated: '2024-01-01'
  },
  {
    id: 'dress-code',
    title: 'Dress Code & Appearance',
    content: 'Cheil maintains a smart casual dress code that reflects our creative culture while remaining client-appropriate. General guidelines: Business casual is the standard - collared shirts, blouses, slacks, dresses, and closed-toe shoes; Creative expression encouraged through colors, patterns, and accessories; Client meeting days require business professional attire; Casual Fridays allow jeans, sneakers, and t-shirts (no offensive graphics); Remote work dress code matches video call requirements. Avoid: Revealing clothing, flip-flops, shorts (except summer Fridays), strong fragrances, or anything that could be considered offensive. When in doubt, dress slightly more formal than casual. Your appearance represents both you and Cheil to our clients.',
    category: 'Office Life',
    keywords: ['dress code', 'attire', 'business casual', 'client meetings', 'casual friday'],
    lastUpdated: '2024-01-01'
  },

  // EMERGENCY & SAFETY
  {
    id: 'emergency-procedures',
    title: 'Emergency Procedures & Safety',
    content: 'Employee safety is our top priority. Emergency procedures include: Fire evacuation - Exit via nearest stairwell (never elevators), meet at designated outdoor assembly point; Medical emergencies - Call 911 immediately, notify office manager and HR; Severe weather - Follow local authority guidance, shelter in interior rooms away from windows; Security threats - Report suspicious activity to security@cheil.com and building management; Power outages - Emergency lighting will activate, use stairs not elevators, await further instructions. First aid kits and AED devices are located on each floor near the kitchen areas. Emergency contact numbers are posted by all exits. We conduct quarterly emergency drills - participation is mandatory.',
    category: 'Safety',
    keywords: ['emergency', 'evacuation', 'fire', 'medical', 'security', 'first aid', 'safety drills'],
    lastUpdated: '2024-01-01'
  }
]

// Simple search function that simulates vector similarity search
export function searchPolicies(query: string, maxResults: number = 3): PolicyDocument[] {
  const queryLower = query.toLowerCase()
  
  // Score each policy based on keyword and content matches
  const scoredPolicies = mockPolicies.map(policy => {
    let score = 0
    
    // Check keywords (higher weight)
    policy.keywords.forEach(keyword => {
      if (queryLower.includes(keyword.toLowerCase())) {
        score += 10
      }
    })
    
    // Check title (medium weight)
    if (policy.title.toLowerCase().includes(queryLower)) {
      score += 5
    }
    
    // Check content (lower weight)
    const contentMatches = policy.content.toLowerCase().split(' ').filter(word => 
      queryLower.includes(word) && word.length > 3
    ).length
    score += contentMatches
    
    return { policy, score }
  })
  
  // Return top matches, sorted by score
  return scoredPolicies
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.policy)
};