// Mock employee handbook data
// This simulates what would come from a real RAG system
export interface PolicyDocument {
  id: string
  title: string
  content: string
  category: string
  keywords: string[]
}

export const mockPolicies: PolicyDocument[] = [
  {
    id: 'vacation-policy',
    title: 'Vacation Policy',
    content: 'All full-time employees accrue 2 weeks (10 days) of vacation time per year during their first year of employment. After 2 years of service, employees accrue 3 weeks (15 days) per year. After 5 years, employees accrue 4 weeks (20 days) per year. Vacation time must be requested at least 2 weeks in advance and approved by your direct supervisor.',
    category: 'Time Off',
    keywords: ['vacation', 'time off', 'pto', 'holiday', 'leave', 'days off']
  },
  {
    id: 'sick-leave',
    title: 'Sick Leave Policy',
    content: 'Employees accrue 1 hour of sick leave for every 40 hours worked, up to a maximum of 40 hours per year. Sick leave can be used for personal illness, medical appointments, or to care for immediate family members. No advance notice required for sick leave, but employees should notify their supervisor as soon as possible.',
    category: 'Time Off',
    keywords: ['sick', 'illness', 'medical', 'doctor', 'appointment', 'family care']
  },
  {
    id: 'remote-work',
    title: 'Remote Work Policy',
    content: 'Employees may work remotely up to 2 days per week with supervisor approval. Remote work days must be scheduled in advance and communicated to the team. Employees are expected to maintain the same productivity standards and be available during core business hours (9 AM - 3 PM). Home office setup stipend of $500 is available for new remote workers.',
    category: 'Work Arrangements',
    keywords: ['remote', 'work from home', 'wfh', 'home office', 'flexible', 'stipend']
  },
  {
    id: 'benefits-overview',
    title: 'Employee Benefits',
    content: 'Our comprehensive benefits package includes: Health insurance (company pays 80% of premiums), Dental and vision coverage, 401(k) with 4% company match, Life insurance (2x annual salary), Disability insurance, Employee assistance program, Gym membership reimbursement up to $50/month, Professional development budget of $1,000 per year.',
    category: 'Benefits',
    keywords: ['health insurance', 'dental', 'vision', '401k', 'retirement', 'life insurance', 'gym', 'professional development']
  },
  {
    id: 'code-of-conduct',
    title: 'Code of Conduct',
    content: 'All employees are expected to maintain professional behavior, treat colleagues with respect, and uphold company values. Harassment, discrimination, or hostile behavior will not be tolerated. Report any concerns to HR immediately. Confidential reporting options are available through our ethics hotline.',
    category: 'Policies',
    keywords: ['conduct', 'behavior', 'harassment', 'discrimination', 'ethics', 'respect', 'professional']
  },
  {
    id: 'expense-policy',
    title: 'Expense Reimbursement',
    content: 'Business expenses must be pre-approved by your manager for amounts over $100. Submit expense reports within 30 days with original receipts. Reimbursable expenses include: business travel, client meals, professional development, office supplies. Personal expenses will not be reimbursed. Use company credit card for large purchases when possible.',
    category: 'Finance',
    keywords: ['expense', 'reimbursement', 'travel', 'receipts', 'business', 'credit card', 'approval']
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