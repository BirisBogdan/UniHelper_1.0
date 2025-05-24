
// This simulates the backend AI service
export class AIService {
  private static instance: AIService;
  private messageHistory: Array<{ question: string; response: string; timestamp: Date }> = [];

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async getAIResponse(question: string): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
    
    const lowerQuestion = question.toLowerCase();
    let response = '';
    
    // Comprehensive university knowledge base
    if (lowerQuestion.includes('scholarship') || lowerQuestion.includes('financial aid') || lowerQuestion.includes('funding')) {
      response = this.getScholarshipResponse(lowerQuestion);
    } else if (lowerQuestion.includes('erasmus') || lowerQuestion.includes('exchange') || lowerQuestion.includes('study abroad')) {
      response = this.getErasmusResponse(lowerQuestion);
    } else if (lowerQuestion.includes('application') || lowerQuestion.includes('apply') || lowerQuestion.includes('admission')) {
      response = this.getApplicationResponse(lowerQuestion);
    } else if (lowerQuestion.includes('deadline') || lowerQuestion.includes('date') || lowerQuestion.includes('when')) {
      response = this.getDeadlineResponse(lowerQuestion);
    } else if (lowerQuestion.includes('grade') || lowerQuestion.includes('transcript') || lowerQuestion.includes('gpa')) {
      response = this.getAcademicResponse(lowerQuestion);
    } else if (lowerQuestion.includes('course') || lowerQuestion.includes('registration') || lowerQuestion.includes('enroll')) {
      response = this.getCourseResponse(lowerQuestion);
    } else if (lowerQuestion.includes('visa') || lowerQuestion.includes('international')) {
      response = this.getVisaResponse(lowerQuestion);
    } else if (lowerQuestion.includes('housing') || lowerQuestion.includes('dorm') || lowerQuestion.includes('accommodation')) {
      response = this.getHousingResponse(lowerQuestion);
    } else {
      response = this.getDefaultResponse();
    }
    
    // Store in session history
    this.messageHistory.push({
      question,
      response,
      timestamp: new Date()
    });
    
    return response;
  }

  private getScholarshipResponse(question: string): string {
    if (question.includes('merit') || question.includes('academic')) {
      return "🎓 **Merit-based scholarships** are awarded based on academic excellence, leadership, and extracurricular activities. Key requirements:\n\n• Minimum GPA: 3.5/4.0\n• Letters of recommendation: 2-3 academic references\n• Personal statement (500-1000 words)\n• Deadline: March 1st for fall semester\n\nPopular merit scholarships include the Dean's Excellence Award ($5,000), Presidential Scholarship ($10,000), and departmental scholarships ($2,000-$8,000). Would you like details about any specific scholarship?";
    } else if (question.includes('need') || question.includes('financial')) {
      return "💰 **Need-based financial aid** helps students based on family income and financial circumstances:\n\n• Submit FAFSA by February 1st\n• Provide tax returns and bank statements\n• CSS Profile may be required\n• Awards include grants, work-study, and loans\n\nAverage aid package is $12,000-$18,000. International students should check specific international aid programs. Need help with the FAFSA application?";
    }
    return "🏆 **Scholarship opportunities** are available for various student profiles:\n\n• **Academic Excellence**: Merit-based awards for high GPA\n• **Need-based Aid**: Financial assistance based on family income\n• **Special Programs**: Athletic, artistic, and community service scholarships\n• **International**: Specific programs for international students\n\nApplication deadlines typically fall between February-March. Would you like information about a specific type of scholarship?";
  }

  private getErasmusResponse(question: string): string {
    if (question.includes('eligibility') || question.includes('requirement')) {
      return "🌍 **Erasmus+ Eligibility Requirements**:\n\n• Enrolled as a full-time student\n• Completed at least 1 year of studies\n• Minimum GPA: 3.0/4.0\n• Language proficiency in host country's language\n• Academic approval from your department\n\nStudy period: 3-12 months. You'll receive monthly grants (€300-€500) plus tuition waiver. Credits earned abroad count toward your degree. Ready to explore our 150+ partner universities?";
    } else if (question.includes('partner') || question.includes('countries') || question.includes('universities')) {
      return "🏛️ **Erasmus+ Partner Universities** (Top destinations):\n\n**Germany**: University of Munich, Heidelberg University\n**France**: Sorbonne, Lyon University\n**Spain**: Universidad Complutense Madrid, Barcelona University\n**Italy**: University of Bologna, La Sapienza Rome\n**Netherlands**: University of Amsterdam, Leiden University\n\nWe have partnerships in 27 EU countries. Each university offers different specializations. Which field of study interests you most?";
    }
    return "✈️ **Erasmus+ Program** offers life-changing study abroad experiences:\n\n• Study at prestigious European universities\n• Receive €300-€500 monthly grant\n• No tuition fees at host university\n• Improve language skills and cultural awareness\n• Enhance career prospects globally\n\nApplication period: February-April for next academic year. The program is highly competitive with ~60% acceptance rate. Would you like help choosing a destination or preparing your application?";
  }

  private getApplicationResponse(question: string): string {
    return "📝 **University Application Process**:\n\n**Required Documents:**\n• Completed application form\n• Official transcripts\n• 2-3 letters of recommendation\n• Personal statement/essay\n• Standardized test scores (if required)\n• Application fee: $50-$75\n\n**Timeline:**\n• Fall Semester: Applications due March 15th\n• Spring Semester: Applications due October 15th\n• Early Decision: November 1st (binding)\n\n**Tips:**\n• Apply early for better consideration\n• Proofread all materials carefully\n• Follow specific program requirements\n\nWhich program are you interested in applying to?";
  }

  private getDeadlineResponse(question: string): string {
    return "📅 **Important University Deadlines**:\n\n**Applications:**\n• Early Decision: November 1st\n• Regular Decision: March 15th (Fall), October 15th (Spring)\n• Graduate Programs: January 15th\n\n**Financial Aid:**\n• FAFSA: February 1st\n• Scholarship Applications: March 1st\n• Erasmus+: April 30th\n\n**Academic:**\n• Course Registration: Begins in April (Fall), November (Spring)\n• Add/Drop Period: First 2 weeks of semester\n• Withdrawal Deadline: Mid-semester\n\n**Housing:**\n• Residence Hall Applications: May 1st\n\nMark these dates in your calendar! Which deadline do you need specific information about?";
  }

  private getAcademicResponse(question: string): string {
    return "📊 **Academic Records & Performance**:\n\n**GPA Calculation:**\n• A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0\n• Cumulative GPA includes all completed courses\n• Term GPA calculated each semester\n\n**Accessing Records:**\n• Student Portal: Real-time grades and GPA\n• Official Transcripts: $10 fee, 3-5 business days\n• Unofficial Transcripts: Free, instant download\n\n**Academic Standing:**\n• Good Standing: 2.0+ GPA\n• Academic Probation: Below 2.0 GPA\n• Dean's List: 3.5+ GPA with 12+ credits\n\n**Support Services:**\n• Academic Advising: Schedule through student portal\n• Tutoring Services: Free for all students\n• Study Groups: Available for most courses\n\nNeed help improving your academic performance?";
  }

  private getCourseResponse(question: string): string {
    return "📚 **Course Registration & Enrollment**:\n\n**Registration Timeline:**\n• Graduate Students: Priority registration\n• Seniors: 1 week later\n• Juniors: 2 weeks later\n• Sophomores: 3 weeks later\n• Freshmen: 4 weeks later\n\n**How to Register:**\n1. Meet with academic advisor\n2. Check prerequisites and availability\n3. Register through student portal\n4. Pay tuition and fees\n\n**Important Notes:**\n• Maximum credits per semester: 18\n• Minimum for full-time status: 12 credits\n• Add/drop period: First 2 weeks\n• Course conflicts require advisor approval\n\n**Popular Course Categories:**\n• General Education Requirements\n• Major-specific courses\n• Electives and minors\n• Research opportunities\n\nWhich courses are you planning to take?";
  }

  private getVisaResponse(question: string): string {
    return "🛂 **International Student Visa Information**:\n\n**F-1 Student Visa Requirements:**\n• I-20 form from university\n• SEVIS fee payment ($350)\n• Valid passport\n• Financial documentation\n• DS-160 application\n• Embassy interview\n\n**Timeline:**\n• Apply 3-4 months before program start\n• Processing time: 2-8 weeks\n• Can enter US 30 days before program begins\n\n**Work Authorization:**\n• On-campus work: Up to 20 hours/week\n• CPT: Curriculum Practical Training\n• OPT: Optional Practical Training (post-graduation)\n\n**Maintaining Status:**\n• Full-time enrollment required\n• Report address changes to SEVIS\n• Travel requires valid visa and I-20\n\nNeed help with specific visa procedures?";
  }

  private getHousingResponse(question: string): string {
    return "🏠 **Campus Housing & Accommodation**:\n\n**Residence Hall Options:**\n• **Freshman Halls**: Traditional dorms, shared bathrooms\n• **Upperclass Suites**: Private bathrooms, kitchen access\n• **Apartments**: Full kitchen, living room, 2-4 bedrooms\n• **Special Interest Housing**: Academic themes, languages\n\n**Costs (per semester):**\n• Traditional Double: $3,500\n• Suite Style: $4,200\n• Apartment: $4,800\n• Single Room: +$500 premium\n\n**Application Process:**\n• Housing application: Due May 1st\n• $200 deposit required\n• Roommate preferences accepted\n• Special needs accommodations available\n\n**Off-Campus Options:**\n• University-approved apartments\n• Homestay programs\n• Shared housing near campus\n\nWould you like information about meal plans or specific residence halls?";
  }

  private getDefaultResponse(): string {
    const responses = [
      "🤖 I'm your university AI assistant, specialized in helping students navigate academic life! I can provide detailed information about:\n\n• **Scholarships & Financial Aid**\n• **Erasmus+ & Study Abroad Programs**\n• **Application Procedures**\n• **Academic Policies & Requirements**\n• **Course Registration**\n• **Visa & International Student Services**\n• **Campus Housing**\n• **Academic Support Services**\n\nWhat specific topic would you like to explore?",
      
      "📚 I'm here to help you succeed at university! Whether you're looking for information about academic programs, financial support, or international opportunities, I have comprehensive knowledge about university policies and procedures.\n\nSome popular topics students ask about:\n• Merit and need-based scholarships\n• Erasmus exchange programs\n• Application deadlines and requirements\n• Academic advising and support\n\nWhat can I help you with today?",
      
      "🎓 Welcome! I'm trained on extensive university knowledge to assist students 24/7. I can provide accurate, up-to-date information about all aspects of university life.\n\n**My expertise includes:**\n• Financial aid and scholarship opportunities\n• International programs and exchanges\n• Academic policies and procedures\n• Student services and support\n\nPlease feel free to ask me anything about your university experience!"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getMessageHistory(): Array<{ question: string; response: string; timestamp: Date }> {
    return [...this.messageHistory];
  }

  clearHistory(): void {
    this.messageHistory = [];
  }
}

export const aiService = AIService.getInstance();
