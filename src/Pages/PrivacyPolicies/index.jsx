export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 font-marcellus">
                    Privacy and Security Policy
                </h1>
                
                <div className="bg-white shadow-md p-8 space-y-8 font-pt-serif text-gray-900">
                    <p className="text-lg">
                       At The Momento, we deeply value the trust our photographers and community place in us. 
                       Protecting your personal information, creative work, and ensuring ethical use of photography are fundamental to our mission. This Privacy and Security Policy outlines how we collect, use, store, and protect
                        your data and creative content in alignment with legal standards and photography ethics.
                    </p>

                    {/* Section 1 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold font-marcellus">1. Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><span className="font-semibold">Personal Information: </span> 
                            When you sign up, we collect your name, email address, profile details, and optional data like 
                            location and biography to create your professional profile.</li>
                            <li><span className="font-semibold">Photographs and Creative Content: </span> Any photos you submit, along with titles, 
                            descriptions, and metadata,
                             become part of your portfolio hosted on our platform.</li>
                            <li><span className="font-semibold">Usage Data: </span> We collect analytics about how you interact with our platform, 
                            such as pages visited and submissions made, to improve your experience.</li>
                        </ul>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold font-marcellus">2. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Create and maintain professional portfolios</li>
                            <li>To feature your work in collections, exhibitions, and 
                              promotional materials with your permission.</li>
                            <li>To communicate important updates, opportunities, and support.</li>
                            <li>To improve our platform based on user interaction and feedback.</li>
                            <li>To comply with legal requirements and protect against unauthorized use or abuse.</li>
                        </ul>
                    </div>

                      {/* Section 3 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold font-marcellus">3. Data Security</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>We implement industry-standard security measures including encryption, 
                              secure servers, and restricted access protocols to safeguard your data.</li>
                            <li>Your photographs are stored securely.</li>
                            <li>Regular audits and updates ensure ongoing protection against emerging threats.</li>
                           
                        </ul>
                    </div>


                     {/* Section 4 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold font-marcellus">4. Photography Ethics and Rights</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>All photographs submitted must be your original work. By uploading, you 
                              confirm you hold the rights or necessary permissions to share the image.</li>
                            <li>We respect your intellectual property rights and will never use your images 
                              without attribution or explicit consent.</li>
                            <li>The Momento strictly prohibits content that infringes copyrights, promotes hate 
                              speech, violence, or invades privacy.</li>
                            <li>Photographers retain full copyright over their images; however, submitting photos grants The 
                              Momento a non-exclusive license to display and promote your work within the platform and 
                              related channels.</li>
                           
                        </ul>
                    </div>


                        {/* Section 5 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold font-marcellus">5. Sharing and Third Parties</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>We do not sell or rent your personal data to third parties.</li>
                            <li>Data may be shared with trusted service providers for hosting, payment 
                              processing, or analytics, always under strict confidentiality agreements.</li>
                            <li>Your photos may be featured on partner sites or exhibitions only with your consent.</li>
                         
                           
                        </ul>
                    </div>


                     {/* Section 6 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold font-marcellus">6. Your Rights</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You have the right to access, update, or delete your personal data and photographs at any time.</li>
                            <li>You can control visibility settings for your portfolio and opt-out of marketing communications.</li>
                            <li>
  If you believe your work has been used improperly,{" "}
  <a href="/contact" className="text-blue-400 hover:underline">contact us</a>{" "}
  immediately for resolution.
</li>
                         
                           
                        </ul>
                    </div>


                        {/* Section 7 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold font-marcellus">7. Sharing and Third Parties</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Our website uses cookies to enhance user experience, analyze traffic, 
                              and personalize content. You can manage your cookie preferences through your browser settings.</li>
                            
                         
                           
                        </ul>
                    </div>

                      {/* Section 8 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold font-marcellus">8. Children’s Privacy</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>The Momento is not intended for users under 13. We do not knowingly 
                              collect data from children below this age.</li>
                            
                         
                           
                        </ul>
                    </div>



                  

                    {/* Final Section */}
                    <div className="space-y-4">
                        <p className="text-lg">
                            By joining The Momento, you agree to this Privacy and Security Policy. 
                            We are committed to transparency and ongoing improvement in safeguarding your work and information.
                        </p>
                        <p>
                            For any questions or concerns, please contact us at{' '}
                            <a 
                              
                                className="text-blue-500 hover:text-blue-700 underline transition duration-300"
                            >
                                info@themomento.co.uk
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}