Clearcode popover directive
=========

Creates bootstrap popover with template with controller

Installation
--------------
TODO


Usage
------

Add ``` cc.popoverTemplate.directive ``` module to your app module list :


```
angular
    .module('yourAwesomeApp', [
        'cc.popoverTemplate.directive'
    ]);
```
and you are ready to go!

How to use :

add container to html

```
<div class="popover-header-wrapper2"></div>
```

add something that needs a popover

```
                 <a class="button button-image"
                    popover-template="views/about.html"
                    popover-ctrl="AboutCtrl"
                    popover-container=".popover-header-wrapper2">
                        <i class="icons-settings"></i>
                        Simple text
                 </a>
```


Author
------

TODO


License
----

LGPL

