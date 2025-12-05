
export default function Footer() {
    return (
      <>
       <footer className="w-full bg-gray-100 text-center py-6" role="contentinfo" aria-label="Footer">
        <div className="flex justify-center space-x-6" role="list" aria-label="Social media links">
          {/*link to X social media*/}
          {/*We dont need this 
          <a
            href="https://x.com"
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="Visit ARA Lab on X (formerly Twitter)"
            role="listitem"
          >
            <img src="/icons/XIcon.png" alt="" className="icon" aria-hidden="true" />
          </a>*/}

          {/*link to instagram for lab*/}
          <a
            href="https://www.instagram.com/minerschool_cs_uml/?hl=en" /*placeholder link for now*/
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="Visit ARA Lab on Instagram"
            role="listitem"
          >
            <img src="/icons/instaIcon.png" alt="" className="icon" aria-hidden="true" />
          </a>
          
          {/*link to youtube for lab*/}
          {/*Dont need this for now
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="Visit ARA Lab on YouTube"
            role="listitem"
          >
            <img src="/icons/youtubeIcon.png" alt="" className="icon" aria-hidden="true" />
          </a>
          */}

          {/*link to the ARA lab linkedin*/}
          <a
            href="https://www.linkedin.com/company/kennedy-college-of-sciences-at-umass-lowell/"/*placeholder link for now*/
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="Visit ARA Lab on LinkedIn"
            role="listitem"
          >
            <img src="/icons/linkedinIcon.png" alt="" className="icon" aria-hidden="true" />
          </a> 

          
        </div>

        <p className="text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} ARA Lab. 
        </p>
    </footer>
      </>
    );
 }