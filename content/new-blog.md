+++
title = "new blog"
date = 2020-01-09T02:34:47.328Z
+++
# new blog

After using and loving [rwtxt](https://rwtxt.com) for about a year, I decided I wanted more granular control of my blog, in both its content and styles. The only reasonable answer seemed to be to use a static site generator, but the typical utilization of one entails usage of a text editor to write content (Sublime Text, VSCode, Atom, etc.) While this is an *OK* experience, I got really spoiled by the web-based, built-in editor of rwtxt which made updating and creating new content trivial on desktop and mobile.

In addition, I had a few other requirements for my new blogging platform:
* Needed to be free. I rarely create content, and I can't justify paying money for a shitty anonymous blog like this.
* Needed the ability to add custom styles. rwtxt allowed global styles, but it would be applied to *every* page. I wanted control of my stylesheets and directory structure
* Needed a web-based editor/cms. This is the hardest part. Netlify CMS is the only one I've been able to find.

After exploring and learning how to use [zola](https://getzola.org), I put together the template, contents, styles, and modified the homepage to give room for the blog pagination. I wanted to keep zeit's pretty `now.sh` domain, so the Netlify deploy step includes using the now CLI to deploy the static site to `now.sh`, as well as deploying to Netlify at [keb.netlify.com](https://keb.netlify.com) which is a nice bonus to have a mirror site I won't have to update separately.

After setting everything up, I can confidently say things work well. But not well enough. And that lies almost entirely with Netlify CMS. The editor is buggy and slow. The Content Manager gives BARELY any customization for how to view my blog entries. As I write this entry, the editor fails to scroll with me as I write content that overflows on the y axis.

It seems my next step will be to find a CMS that interfaces with Github, which is where the code for this site lives (please see [github.com/keb/keb.now.sh](https://github.com/keb/keb.now.sh) if you're interested).

For now this will do.
