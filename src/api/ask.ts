
// Placeholder function to simulate AI responses
async function getAIResponse(question: string): Promise<string> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const lowerQuestion = question.toLowerCase();
  
  // Simple keyword-based responses for demo
  if (lowerQuestion.includes('scholarship') || lowerQuestion.includes('financial aid')) {
    return "For scholarship opportunities, I recommend checking our financial aid portal. Most scholarships require academic transcripts, recommendation letters, and a personal statement. Merit-based scholarships typically have deadlines in March for fall semester. Need-based aid applications should be submitted by February 1st. Would you like specific information about any particular scholarship program?";
  }
  
  if (lowerQuestion.includes('erasmus') || lowerQuestion.includes('exchange') || lowerQuestion.includes('study abroad')) {
    return "The Erasmus+ program allows you to study abroad at partner European universities for 3-12 months. Applications typically open in February for the following academic year. You'll need a minimum GPA of 3.0, language proficiency proof, and academic approval from your department. The program covers tuition and provides monthly grants. Would you like information about specific partner universities or application requirements?";
  }
  
  if (lowerQuestion.includes('application') || lowerQuestion.includes('apply') || lowerQuestion.includes('deadline')) {
    return "Application deadlines vary by program: Fall semester applications are typically due March 15th, Spring semester by October 15th. Required documents usually include transcripts, recommendation letters, statement of purpose, and program-specific requirements. Early applications are encouraged as some programs have limited capacity. Which specific program are you interested in applying to?";
  }
  
  if (lowerQuestion.includes('grade') || lowerQuestion.includes('transcript') || lowerQuestion.includes('gpa')) {
    return "You can access your academic records through the student portal. Official transcripts can be requested online with a 3-5 business day processing time. For GPA calculations, we use a 4.0 scale where A=4.0, B=3.0, C=2.0, D=1.0. If you need academic advising to improve your grades, our counseling services are available Monday-Friday 9AM-5PM.";
  }
  
  if (lowerQuestion.includes('course') || lowerQuestion.includes('registration') || lowerQuestion.includes('enroll')) {
    return "Course registration opens based on your academic standing: Graduate students register first, then seniors, juniors, sophomores, and freshmen. You can view available courses and register through the student portal. Prerequisites must be completed before enrolling in advanced courses. For course conflicts or special permissions, contact your academic advisor.";
  }
  
  // Default response
  return "I'm here to help with university-related questions! I can assist with information about scholarships, Erasmus programs, application procedures, academic policies, course registration, and general university guidelines. Could you please provide more specific details about what you'd like to know?";
}

// This would be the Express.js endpoint (for demonstration)
export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    
    if (!question || typeof question !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid question format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const response = await getAIResponse(question);
    
    return new Response(
      JSON.stringify({ response }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing question:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
