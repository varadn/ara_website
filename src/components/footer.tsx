
export default function Footer() {
    return (
      <>
       <footer className="w-full bg-gray-100 text-center py-6">
        <div className="flex justify-center space-x-6">
          {/*link to X social media*/}
          <a
            href="https://x.com"/*placeholder link for now*/
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <img src="/icons/XIcon.png" alt="X" className="icon" />
          </a>

          {/*link to instagram for lab*/}
          <a
            href="https://www.instagram.com" /*placeholder link for now*/
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon" 
          >
            <img src="/icons/instaIcon.png" alt="Instagram Icon" className="icon" />
          </a>
          
          {/*link to youtube for lab*/}
          <a
            href="https://www.youtube.com"/*placeholder link for now*/
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <img src="/icons/youtubeIcon.png" alt="YouTube" className="icon" />
          </a>

          {/*link to the ARA lab linkedin*/}
          <a
            href="https://www.linkedin.com"/*placeholder link for now*/
            target="_blank"
            rel="noopener noreferrer" 
            className="footer-icon"
          >
            <img src="/icons/linkedinIcon.png" alt="LinkedIn" className="icon" />
          </a> 

          
        </div>

        <p className="text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} ARA Lab. 
        </p>
    </footer>
      </>
    );
 }