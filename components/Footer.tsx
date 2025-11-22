import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="min-h-[80vh] bg-stone-950 text-stone-200 flex flex-col justify-between p-10 md:p-20">
      <div>
        <h2 className="text-[12vw] leading-[0.8] font-serif hover:text-amber-700 transition-colors duration-500 cursor-pointer">
          Let's Talk
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
        <div>
          <h4 className="text-sm uppercase tracking-widest text-stone-500 mb-4">Address</h4>
          <p className="text-xl font-light">
            24, Lake Palace Road,<br />
            Near City Palace,<br />
            Udaipur, Rajasthan 313001
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-stone-500 mb-4">Connect</h4>
          <ul className="space-y-2 text-xl font-light">
            <li><a href="#" className="hover:text-amber-600 transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-amber-600 transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-amber-600 transition-colors">Behance</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-stone-500 mb-4">Inquiries</h4>
          <p className="text-xl font-light border-b border-stone-700 inline-block pb-1 mb-4">
            hello@shilpkarman.com
          </p>
          <p className="text-xl font-light">
            +91 98765 43210
          </p>
        </div>
      </div>

      <div className="border-t border-stone-900 mt-20 pt-8 flex justify-between items-end text-stone-600 text-sm uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Shilpkarman Architects</span>
        <span>Made with Stone & Code</span>
      </div>
    </footer>
  );
};

export default Footer;