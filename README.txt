/********************************************************************************
*
*	HTML5 PLAYGROUND
*	Nagendra U M <umnagendra@gmail.com>
*
********************************************************************************/

INSTALLATION:
------------
1. Download the latest code from
	GITHUB (GIT Repo): https://github.com/umnagendra/html5-playground
	GOOGLE CODE (SVN Repo): https://code.google.com/p/html5-playground
   
2. Deploy the HTML, js and CSS stylesheets in your favorite web server.

3. Access web pages via a http:// URL and NOT with local file:// URL since many
   HTML5 APIs do not work as expected if accessed locally without a valid
   origin. (This is due to security policies specified in CORS etc.)

4. To be able to use the WebSockets demo (text-based chat), you will need to
   setup the WebSocket server as well. It is a node.js implementation.
   a) Install node.js on your server (prerequisites are python 2.7.x and C++)
   b) Install the 'websockets' module for node.js using this command:
   	  'npm install websocket'
   c) Copy the js/node_servers/node-chat.js (which is the websocket server
   	  implementation for my demo) and deploy it on the node.js instance.
   d) You should be seeing logs on the console indicating that the service is
      running on the specified port.	  

DISCLAIMER:
---------- 
This code-base is the result of my attempts at learning HTML5 and
exploring its features. This is not aimed to become a product, service, library
or API. Rather, it's just a repository of sample code experiments I do.

CODE LICENSE:
------------
All source code authored by me are licensed under Apache License 2.0.
Third-party code (libraries, frameworks etc.) are licensed under their
respective licenses and all trademarks belong to their owners.

FEEDBACK:
---------
Feel free to send in your suggestions, comments, questions, bugs, enhancements
etc. to umnagendra@gmail.com
Fork the GIT repository at https://github.com/umnagendra/html5-playground.git
or the SVN repository at https://code.google.com/p/html5-playground/ and become
a contributor.