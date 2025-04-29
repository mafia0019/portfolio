import React, { useEffect, useRef, useState } from 'react';
import { fadeInUp } from '../../utils/animations';
import { Mail, Linkedin, Phone, Send, RefreshCw } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("ZDwZWBlfMVjDT69eW");

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRoadmap, setHasRoadmap] = useState(false);
  const [roadmapData, setRoadmapData] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Prepare the email content with basic parameters
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: form.message
      };

      console.log('Sending email with params:', templateParams);

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_sw8813o',
        'template_nntoii8',
        templateParams
      );

      console.log('Email sent successfully:', result);

      setSubmitSuccess(true);
      setForm({ name: '', email: '', message: '' });
      
      // Clear the roadmap data only after successful submission
      if (hasRoadmap) {
        localStorage.removeItem('generatedRoadmap');
        localStorage.removeItem('roadmapTimestamp');
        setRoadmapData(null);
        setHasRoadmap(false);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp('.contact-title', 0.2);
      fadeInUp('.contact-form', 0.4);
      fadeInUp('.contact-info', 0.6);
    }
  }, []);

  useEffect(() => {
    // Function to handle roadmap data
    const handleRoadmapData = () => {
      const roadmap = localStorage.getItem('generatedRoadmap');
      console.log('Retrieved roadmap from localStorage:', roadmap);
      
      if (roadmap) {
        setHasRoadmap(true);
        setRoadmapData(roadmap);
        
        // Format the roadmap data for the message box
        try {
          const roadmapObj = JSON.parse(roadmap);
          console.log('Parsed roadmap object:', roadmapObj);
          
          const formattedMessage = `I'm interested in developing the following project:

Title: ${roadmapObj.title}
Description: ${roadmapObj.description}

Business Value:
${roadmapObj.business_value.map((value: string) => `- ${value}`).join('\n')}

Target Audience:
${roadmapObj.target_audience.map((audience: string) => `- ${audience}`).join('\n')}

Implementation Phases:
${roadmapObj.implementation_phases.map((phase: any) => `
${phase.phase} (${phase.duration})
Deliverables:
${phase.deliverables.map((d: string) => `- ${d}`).join('\n')}
Success Metrics:
${phase.success_metrics.map((m: string) => `- ${m}`).join('\n')}
`).join('\n')}

Key Features:
${roadmapObj.key_features.map((feature: string) => `- ${feature}`).join('\n')}

Estimated Timeline: ${roadmapObj.estimated_timeline}

Investment Areas:
${roadmapObj.investment_areas.map((area: string) => `- ${area}`).join('\n')}

Success Metrics:
${roadmapObj.success_metrics.map((metric: string) => `- ${metric}`).join('\n')}

I would like to discuss this project further and get started with the implementation.`;
          
          console.log('Setting formatted message:', formattedMessage);
          setForm(prev => ({ ...prev, message: formattedMessage }));
        } catch (err) {
          console.error('Error formatting roadmap:', err);
        }
      }
    };

    // Listen for the roadmapConnect event
    const handleRoadmapConnect = () => {
      console.log('Roadmap connect event received');
      handleRoadmapData();
    };

    window.addEventListener('roadmapConnect', handleRoadmapConnect);

    // Cleanup
    return () => {
      window.removeEventListener('roadmapConnect', handleRoadmapConnect);
    };
  }, []);
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-gray-900 text-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="contact-title text-3xl md:text-4xl font-bold text-center mb-12">
          Get In Touch
        </h2>
        
        <div className="max-w-5xl mx-auto md:flex">
          <div className="contact-form md:w-3/5 md:pr-8 mb-12 md:mb-0">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              {hasRoadmap && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-300">
                    We see you've generated a roadmap! Let's discuss your project idea.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 interactive"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 interactive"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 interactive"
                    placeholder={hasRoadmap ? "Tell us more about your project idea..." : "How can we help you?"}
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors interactive disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <p className="mt-4 text-red-500 text-center">{error}</p>
              )}

              {submitSuccess && (
                <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
                  <p className="text-green-800">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="contact-info md:w-2/5">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full">
              <h3 className="text-xl font-bold mb-6 text-blue-400">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="mt-1 mr-4 text-blue-400" size={20} />
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <a 
                      href="mailto:abhinav8254@gmail.com"
                      className="text-gray-300 hover:text-blue-400 transition-colors interactive"
                    >
                      abhinav8254@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mt-1 mr-4 text-blue-400" size={20} />
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <a 
                      href="tel:+918802102728"
                      className="text-gray-300 hover:text-blue-400 transition-colors interactive"
                    >
                      +91-8802102728
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Linkedin className="mt-1 mr-4 text-blue-400" size={20} />
                  <div>
                    <h4 className="font-bold mb-1">LinkedIn</h4>
                    <a 
                      href="https://linkedin.com/in/abhinav-vishnoi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors interactive"
                    >
                      linkedin.com/in/abhinav-vishnoi
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <p className="text-gray-400">
                  Feel free to reach out for any questions, project inquiries, or just to say hello!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;