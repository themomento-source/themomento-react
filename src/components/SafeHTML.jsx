// components/SafeHTML.jsx
// import React from 'react';
// import DOMPurify from 'dompurify';

// const SafeHTML = ({ html, className }) => {  
//   const cleanHTML = DOMPurify.sanitize(html, {
//     USE_PROFILES: { html: true },
//     ALLOWED_TAGS: [
//       'p', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
//       'ul', 'ol', 'li', 'a', 'img', 'video', 'iframe', 'blockquote',
//       'pre', 'code', 'span', 'div', 'br', 'hr'
//     ],
//     ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style', 'target', 'rel']
//   });

//   return <div className={className} dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
// };

// export default SafeHTML;








import React from 'react';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import LinkPreview from './LinkPreview';

const SafeHTML = ({ html, className }) => {
  const cleanHTML = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      'p', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'video', 'iframe', 'blockquote',
      'pre', 'code', 'span', 'div', 'br', 'hr'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style', 'target', 'rel']
  });

  const options = {
    replace: ({ name, attribs }) => {
      if (name === 'a' && attribs.href) {
        return <LinkPreview url={attribs.href} />;
      }
    }
  };

  return (
    <div className={`${className} font-pt-serif`}>
      {parse(cleanHTML, options)}
    </div>
  );
};

export default SafeHTML;