// أي مكون تريد إضافة Smartsupp فيه

import Script from 'next/script';

const SomeComponent = () => {
  return (
    <>
      <Script
        id="smartsupp-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = 'aa38208e453a793c1fab7fe043768da4aba176e5';
            window.smartsupp || (function(d) {
              var s, c, o = smartsupp = function() { o._.push(arguments); };
              o._ = [];
              s = d.getElementsByTagName('script')[0];
              c = d.createElement('script');
              c.type = 'text/javascript';
              c.charset = 'utf-8';
              c.async = true;
              c.src = 'https://www.smartsuppchat.com/loader.js?';
              s.parentNode.insertBefore(c, s);
            })(document);
          `,
        }}
      />
      <noscript>
        Powered by <a href="https://mraeh.com" target="_blank" rel="noopener noreferrer">Mraeh</a>
      </noscript>
    </>
  );
};

export default SomeComponent;
